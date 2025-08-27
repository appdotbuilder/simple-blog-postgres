import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { formatDistance } from '@/lib/utils';

interface Category {
    id: number;
    name: string;
    color: string;
}

interface Author {
    id: number;
    name: string;
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

interface Props {
    posts: {
        data: Post[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            current_page: number;
            per_page: number;
            total: number;
        };
    };
    categories: Category[];
    filters: {
        status: string | null;
        category: string | null;
        search: string | null;
    };
    [key: string]: unknown;
}

export default function AdminPostsIndex({ posts, categories, filters }: Props) {
    const handleFilter = (key: string, value: string | null) => {
        const params = { ...filters, [key]: value };
        
        // Remove null/empty values
        Object.keys(params).forEach(k => {
            if (!params[k as keyof typeof params]) {
                delete params[k as keyof typeof params];
            }
        });
        
        router.get('/admin/posts', params, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        handleFilter('search', search || null);
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            published: 'bg-green-100 text-green-800',
            draft: 'bg-yellow-100 text-yellow-800',
            archived: 'bg-gray-100 text-gray-800',
        };
        
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <AppShell>
            <Head title="📄 Manage Posts - Admin Dashboard" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                            <span className="mr-2">📄</span>
                            Manage Posts
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Create, edit, and manage your blog posts
                        </p>
                    </div>
                    <Link
                        href="/admin/posts/create"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                        <span>✍️</span>
                        <span>New Post</span>
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="md:col-span-2">
                            <div className="flex">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search posts..."
                                    defaultValue={filters.search || ''}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                                >
                                    🔍
                                </button>
                            </div>
                        </form>

                        {/* Status Filter */}
                        <select
                            value={filters.status || ''}
                            onChange={(e) => handleFilter('status', e.target.value || null)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                        </select>

                        {/* Category Filter */}
                        <select
                            value={filters.category || ''}
                            onChange={(e) => handleFilter('category', e.target.value || null)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Posts List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {posts.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Post
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Views
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {posts.data.map((post) => (
                                        <tr key={post.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <Link
                                                        href={`/admin/posts/${post.id}`}
                                                        className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                                                    >
                                                        {truncateText(post.title, 60)}
                                                    </Link>
                                                    <p className="text-sm text-gray-500">
                                                        By {post.author.name}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(post.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {post.category ? (
                                                    <span 
                                                        className="px-2 py-1 rounded text-xs font-medium text-white"
                                                        style={{ backgroundColor: post.category.color }}
                                                    >
                                                        {post.category.name}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">Uncategorized</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                👁️ {post.views_count}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {post.published_at 
                                                    ? formatDistance(new Date(post.published_at), new Date(), { addSuffix: true })
                                                    : formatDistance(new Date(post.created_at), new Date(), { addSuffix: true })
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                <Link
                                                    href={`/admin/posts/${post.id}`}
                                                    className="text-blue-600 hover:text-blue-900 transition-colors"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={`/admin/posts/${post.id}/edit`}
                                                    className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                {post.status === 'published' && (
                                                    <Link
                                                        href={`/blog/${post.slug}`}
                                                        target="_blank"
                                                        className="text-green-600 hover:text-green-900 transition-colors"
                                                    >
                                                        Preview
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
                            <p className="text-gray-600 mb-4">
                                {filters.search || filters.status || filters.category 
                                    ? 'Try adjusting your filters or search terms.'
                                    : 'Get started by creating your first blog post.'
                                }
                            </p>
                            <Link
                                href="/admin/posts/create"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                <span className="mr-2">✍️</span>
                                Create First Post
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {posts.links && posts.links.length > 3 && (
                    <div className="flex justify-center">
                        <div className="flex space-x-2">
                            {posts.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}