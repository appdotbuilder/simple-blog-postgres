<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use App\Models\Post;
use Inertia\Inertia;

class CommentController extends Controller
{
    /**
     * Store a newly created comment.
     */
    public function store(StoreCommentRequest $request, Post $post)
    {
        // Ensure post is published
        if (!$post->is_published) {
            abort(404);
        }

        $data = $request->validated();
        $data['post_id'] = $post->id;

        Comment::create($data);

        return back()->with('success', 'Your comment has been submitted and is pending approval.');
    }
}