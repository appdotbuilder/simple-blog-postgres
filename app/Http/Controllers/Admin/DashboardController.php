<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        // Get stats
        $totalPosts = Post::count();
        $publishedPosts = Post::published()->count();
        $draftPosts = Post::draft()->count();
        $totalCategories = Category::count();
        $totalComments = Comment::count();
        $pendingComments = Comment::pending()->count();

        // Get recent posts
        $recentPosts = Post::with(['author', 'category'])
                          ->latest()
                          ->limit(5)
                          ->get();

        // Get recent comments
        $recentComments = Comment::with('post')
                                ->latest()
                                ->limit(5)
                                ->get();

        // Get popular posts (by views)
        $popularPosts = Post::with(['author', 'category'])
                           ->published()
                           ->orderBy('views_count', 'desc')
                           ->limit(5)
                           ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalPosts' => $totalPosts,
                'publishedPosts' => $publishedPosts,
                'draftPosts' => $draftPosts,
                'totalCategories' => $totalCategories,
                'totalComments' => $totalComments,
                'pendingComments' => $pendingComments,
            ],
            'recentPosts' => $recentPosts,
            'recentComments' => $recentComments,
            'popularPosts' => $popularPosts,
        ]);
    }
}