<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display the blog homepage.
     */
    public function index(Request $request)
    {
        $query = Post::with(['author', 'category'])
                    ->published()
                    ->latest('published_at');

        // Filter by category if provided
        if ($request->has('category') && $request->category) {
            $category = Category::where('slug', $request->category)->first();
            if ($category) {
                $query->where('category_id', $category->id);
            }
        }

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $posts = $query->paginate(12);
        $categories = Category::withCount('posts')->orderBy('name')->get();
        $featuredPost = Post::with(['author', 'category'])
                           ->published()
                           ->orderBy('views_count', 'desc')
                           ->first();

        return Inertia::render('blog/index', [
            'posts' => $posts,
            'categories' => $categories,
            'featuredPost' => $featuredPost,
            'currentCategory' => $request->category,
            'searchQuery' => $request->search,
        ]);
    }

    /**
     * Display a single post.
     */
    public function show(Post $post)
    {
        // Only show published posts to public
        if (!$post->is_published) {
            abort(404);
        }

        // Increment view count
        $post->incrementViews();

        // Load relationships
        $post->load([
            'author',
            'category',
            'approvedComments' => function ($query) {
                $query->whereNull('parent_id')
                     ->with('replies')
                     ->latest();
            }
        ]);

        // Get related posts
        $relatedPosts = Post::with(['author', 'category'])
                          ->published()
                          ->where('id', '!=', $post->id)
                          ->when($post->category_id, function ($query) use ($post) {
                              return $query->where('category_id', $post->category_id);
                          })
                          ->latest('published_at')
                          ->limit(3)
                          ->get();

        return Inertia::render('blog/show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }


}