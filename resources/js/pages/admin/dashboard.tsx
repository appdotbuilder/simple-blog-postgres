import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { formatDistance } from '@/lib/utils';

interface Stats {
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    totalCategories: number;
    totalComments: number;
    pendingComments: number;
}

interface Author {
    id: number;
    name: string;
    email: string;
}

interface Category {
    id: number;
    name: string;
    color: string;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    status: string;
    published_at: string | null;
    views_count: number;
    created_at: string;
    author: Author;
    category: Category | null;
}

interface Comment {
    id: number;
    content: string;
    author_name: string;
    status: string;
    created_at: string;
    post: {
        id: number;
        title: string;
        slug: string;
    };
}

interface Props {
    stats: Stats;
    recentPosts: Post[];
    recentComments: Comment[];
    popularPosts: Post[];
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, recentPosts, recentComments, popularPosts }: Props) {
    const StatCard = ({ title, value, icon, description, color = "blue" }: { 
        title: string; 
        value: number; 
        icon: string; 
        description: string;
        color?: string;
    }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
                <div className={`flex-shrink-0 p-3 rounded-lg bg-${color}-100`}>
                    <span className="text-2xl">{icon}</span>
                </div>
                <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
            </div>
        </div>
    );

    const QuickActionCard = ({ title, description, href, icon, color = "blue" }: {
        title: string;
        description: string;
        href: string;
        icon: string;
        color?: string;
    }) => (
        <Link
            href={href}
            className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:-translate-y-0.5"
        >
            <div className="flex items-center">
                <div className={`flex-shrink-0 p-3 rounded-lg bg-${color}-100`}>
                    <span className="text-2xl">{icon}</span>
                </div>
                <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>
                <div className="flex-shrink-0">
                    <span className="text-gray-400">→</span>
                </div>
            </div>
        </Link>
    );

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            published: 'bg-green-100 text-green-800',
            draft: 'bg-yellow-100 text-yellow-800',
            archived: 'bg-gray-100 text-gray-800',
            pending: 'bg-orange-100 text-orange-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };
        
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <AppShell>
            <Head title="📊 Admin Dashboard - Blog Management" />

            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                            <span className="mr-3">📊</span>
                            Blog Dashboard
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Manage your blog content and monitor performance
                        </p>
                    </div>
                    <Link
                        href="/admin/posts/create"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                        <span>✍️</span>
                        <span>Write New Post</span>
                    </Link>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard
                        title="Total Posts"
                        value={stats.totalPosts}
                        icon="📝"
                        description={`${stats.publishedPosts} published, ${stats.draftPosts} drafts`}
                        color="blue"
                    />
                    <StatCard
                        title="Categories"
                        value={stats.totalCategories}
                        icon="🏷️"
                        description="Content organization"
                        color="purple"
                    />
                    <StatCard
                        title="Comments"
                        value={stats.totalComments}
                        icon="💬"
                        description={`${stats.pendingComments} pending approval`}
                        color="green"
                    />
                </div>

                {/* Quick Actions */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">⚡</span>
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <QuickActionCard
                            title="Create Post"
                            description="Write a new blog post"
                            href="/admin/posts/create"
                            icon="✍️"
                            color="blue"
                        />
                        <QuickActionCard
                            title="Manage Posts"
                            description="Edit existing content"
                            href="/admin/posts"
                            icon="📄"
                            color="green"
                        />
                        <QuickActionCard
                            title="Categories"
                            description="Organize your content"
                            href="/admin/categories"
                            icon="🏷️"
                            color="purple"
                        />
                        <QuickActionCard
                            title="Comments"
                            description={`${stats.pendingComments} pending`}
                            href="/admin/comments"
                            icon="💬"
                            color="orange"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Posts */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center">
                                <span className="mr-2">📄</span>
                                Recent Posts
                            </h2>
                            <Link
                                href="/admin/posts"
                                className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
                            >
                                View all →
                            </Link>
                        </div>
                        
                        <div className="space-y-4">
                            {recentPosts.length > 0 ? (
                                recentPosts.map((post) => (
                                    <div key={post.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <Link
                                                    href={`/admin/posts/${post.id}`}
                                                    className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                                                >
                                                    {truncateText(post.title, 50)}
                                                </Link>
                                                {getStatusBadge(post.status)}
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <span>By {post.author.name}</span>
                                                <span>•</span>
                                                <span>{formatDistance(new Date(post.created_at), new Date(), { addSuffix: true })}</span>
                                                {post.status === 'published' && (
                                                    <>
                                                        <span>•</span>
                                                        <span>👁️ {post.views_count} views</span>
                                                    </>
                                                )}
                                            </div>
                                            {post.category && (
                                                <span 
                                                    className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium text-white"
                                                    style={{ backgroundColor: post.category.color }}
                                                >
                                                    {post.category.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <div className="text-3xl mb-2">📝</div>
                                    <p>No posts yet. Create your first post!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Comments */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center">
                                <span className="mr-2">💬</span>
                                Recent Comments
                            </h2>
                            <Link
                                href="/admin/comments"
                                className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
                            >
                                View all →
                            </Link>
                        </div>
                        
                        <div className="space-y-4">
                            {recentComments.length > 0 ? (
                                recentComments.map((comment) => (
                                    <div key={comment.id} className="p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                                                    <span className="text-white text-xs font-medium">
                                                        {comment.author_name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <span className="font-medium text-gray-900 text-sm">
                                                    {comment.author_name}
                                                </span>
                                            </div>
                                            {getStatusBadge(comment.status)}
                                        </div>
                                        
                                        <p className="text-sm text-gray-700 mb-2 leading-relaxed">
                                            {truncateText(comment.content, 100)}
                                        </p>
                                        
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <Link
                                                href={`/blog/${comment.post.slug}`}
                                                className="text-blue-600 hover:text-blue-800 transition-colors"
                                            >
                                                On: {truncateText(comment.post.title, 30)}
                                            </Link>
                                            <span>
                                                {formatDistance(new Date(comment.created_at), new Date(), { addSuffix: true })}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <div className="text-3xl mb-2">💬</div>
                                    <p>No comments yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Popular Posts */}
                {popularPosts.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                            <span className="mr-2">🔥</span>
                            Most Popular Posts
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {popularPosts.map((post, index) => (
                                <div key={post.id} className="relative">
                                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900 z-10">
                                        #{index + 1}
                                    </div>
                                    <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                                        <div className="flex items-center justify-between mb-2">
                                            <Link
                                                href={`/admin/posts/${post.id}`}
                                                className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                                            >
                                                {truncateText(post.title, 40)}
                                            </Link>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                                            <span>👁️ {post.views_count} views</span>
                                            <span>•</span>
                                            <span>By {post.author.name}</span>
                                        </div>
                                        
                                        {post.category && (
                                            <span 
                                                className="inline-block px-2 py-0.5 rounded text-xs font-medium text-white"
                                                style={{ backgroundColor: post.category.color }}
                                            >
                                                {post.category.name}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}