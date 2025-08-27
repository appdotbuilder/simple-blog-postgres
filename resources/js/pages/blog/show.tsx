import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { formatDistance } from '@/lib/utils';

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
}

interface Author {
    id: number;
    name: string;
    email: string;
}

interface Comment {
    id: number;
    content: string;
    author_name: string;
    author_email: string;
    author_website: string | null;
    created_at: string;
    replies: Comment[];
}

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    featured_image: string | null;
    media: string[] | null;
    published_at: string;
    views_count: number;
    meta_tags: {
        title?: string;
        description?: string;
        keywords?: string;
    } | null;
    author: Author;
    category: Category | null;
    approved_comments: Comment[];
}

interface Props {
    post: Post;
    relatedPosts: Post[];
    [key: string]: unknown;
}

interface CommentFormData {
    content: string;
    author_name: string;
    author_email: string;
    author_website: string;
    parent_id?: number;
    [key: string]: string | number | undefined;
}

export default function BlogShow({ post, relatedPosts }: Props) {
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    
    const { data, setData, post: submitComment, processing, errors, reset } = useForm<CommentFormData>({
        content: '',
        author_name: '',
        author_email: '',
        author_website: '',
    });

    const handleCommentSubmit = (e: React.FormEvent, parentId?: number) => {
        e.preventDefault();
        
        if (parentId) {
            setData('parent_id', parentId);
        }
        
        submitComment(`/blog/${post.slug}/comments`, {
            onSuccess: () => {
                reset();
                setReplyingTo(null);
            },
        });
    };

    const CommentForm = ({ parentId }: { parentId?: number }) => (
        <form onSubmit={(e) => handleCommentSubmit(e, parentId)} className="space-y-4">
            <div>
                <label htmlFor="author_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                </label>
                <input
                    type="text"
                    id="author_name"
                    value={data.author_name}
                    onChange={(e) => setData('author_name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
                {errors.author_name && <p className="text-red-600 text-sm mt-1">{errors.author_name}</p>}
            </div>
            
            <div>
                <label htmlFor="author_email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                </label>
                <input
                    type="email"
                    id="author_email"
                    value={data.author_email}
                    onChange={(e) => setData('author_email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
                {errors.author_email && <p className="text-red-600 text-sm mt-1">{errors.author_email}</p>}
            </div>
            
            <div>
                <label htmlFor="author_website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website (optional)
                </label>
                <input
                    type="url"
                    id="author_website"
                    value={data.author_website}
                    onChange={(e) => setData('author_website', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                />
                {errors.author_website && <p className="text-red-600 text-sm mt-1">{errors.author_website}</p>}
            </div>
            
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Comment *
                </label>
                <textarea
                    id="content"
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Share your thoughts..."
                    required
                />
                {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content}</p>}
            </div>
            
            <div className="flex space-x-3">
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                    {processing ? 'Posting...' : (parentId ? 'Reply' : 'Post Comment')}
                </button>
                
                {parentId && (
                    <button
                        type="button"
                        onClick={() => setReplyingTo(null)}
                        className="text-gray-600 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );

    const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => (
        <div className={`${depth > 0 ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''}`}>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                                {comment.author_name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">
                                {comment.author_website ? (
                                    <a 
                                        href={comment.author_website} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        {comment.author_name}
                                    </a>
                                ) : comment.author_name}
                            </p>
                            <p className="text-sm text-gray-600">
                                {formatDistance(new Date(comment.created_at), new Date(), { addSuffix: true })}
                            </p>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Reply
                    </button>
                </div>
                
                <div className="prose prose-sm max-w-none">
                    <p className="text-gray-800 leading-relaxed">{comment.content}</p>
                </div>
                
                {replyingTo === comment.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <CommentForm parentId={comment.id} />
                    </div>
                )}
            </div>
            
            {comment.replies && comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
            ))}
        </div>
    );

    return (
        <>
            <Head title={post.meta_tags?.title || post.title} />
            
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <Link href="/" className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">📝</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">BlogCraft</span>
                            </Link>
                            
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 font-medium"
                            >
                                ← Back to Blog
                            </Link>
                        </div>
                    </div>
                </header>

                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Post Header */}
                    <header className="mb-8">
                        <div className="flex items-center space-x-4 mb-4">
                            {post.category && (
                                <Link
                                    href={`/category/${post.category.slug}`}
                                    className="px-3 py-1 rounded-full text-sm font-medium text-white hover:opacity-80 transition-opacity"
                                    style={{ backgroundColor: post.category.color }}
                                >
                                    {post.category.name}
                                </Link>
                            )}
                            <span className="text-sm text-gray-600">
                                👁️ {post.views_count} views
                            </span>
                        </div>
                        
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                            {post.title}
                        </h1>
                        
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-medium text-lg">
                                        {post.author.name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {post.author.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Published {formatDistance(new Date(post.published_at), new Date(), { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {post.featured_image && (
                        <div className="mb-8">
                            <img 
                                src={post.featured_image} 
                                alt={post.title}
                                className="w-full h-96 object-cover rounded-xl shadow-lg"
                            />
                        </div>
                    )}

                    {/* Post Content */}
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
                        <div 
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                        
                        {/* Additional Media */}
                        {post.media && post.media.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">📸 Additional Media</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {post.media.map((mediaUrl, index) => (
                                        <img
                                            key={index}
                                            src={mediaUrl}
                                            alt={`Media ${index + 1}`}
                                            className="w-full h-64 object-cover rounded-lg shadow-md"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Comments Section */}
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="mr-2">💬</span>
                            Comments ({post.approved_comments.length})
                        </h2>
                        
                        {/* Comment Form */}
                        <div className="mb-8 pb-8 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave a Comment</h3>
                            <CommentForm />
                        </div>
                        
                        {/* Comments List */}
                        <div className="space-y-6">
                            {post.approved_comments.length > 0 ? (
                                post.approved_comments.map((comment) => (
                                    <CommentItem key={comment.id} comment={comment} />
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-600">
                                    <div className="text-4xl mb-2">💬</div>
                                    <p>Be the first to comment on this post!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <span className="mr-2">🔗</span>
                                Related Articles
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map((relatedPost) => (
                                    <article key={relatedPost.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                        {relatedPost.featured_image && (
                                            <img 
                                                src={relatedPost.featured_image} 
                                                alt={relatedPost.title}
                                                className="w-full h-32 object-cover"
                                            />
                                        )}
                                        <div className="p-4">
                                            <div className="flex items-center space-x-2 mb-2">
                                                {relatedPost.category && (
                                                    <span 
                                                        className="px-2 py-1 rounded text-xs font-medium text-white"
                                                        style={{ backgroundColor: relatedPost.category.color }}
                                                    >
                                                        {relatedPost.category.name}
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                                <Link 
                                                    href={`/blog/${relatedPost.slug}`}
                                                    className="hover:text-blue-600 transition-colors"
                                                >
                                                    {relatedPost.title}
                                                </Link>
                                            </h3>
                                            
                                            <p className="text-sm text-gray-600 mb-2">
                                                By {relatedPost.author.name}
                                            </p>
                                            
                                            <Link
                                                href={`/blog/${relatedPost.slug}`}
                                                className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
                                            >
                                                Read more →
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </div>
        </>
    );
}