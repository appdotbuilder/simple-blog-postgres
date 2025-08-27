import React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Category {
    id: number;
    name: string;
    color: string;
}

interface Props {
    categories: Category[];
    [key: string]: unknown;
}

export default function AdminPostsCreate({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image: '',
        status: 'draft',
        published_at: '',
        category_id: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post('/admin/posts', {
            onSuccess: () => {
                // The controller will redirect
            },
        });
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const handleTitleChange = (title: string) => {
        setData(prev => ({
            ...prev,
            title,
            slug: generateSlug(title),
            meta_title: title.substring(0, 60),
        }));
    };

    return (
        <AppShell>
            <Head title="✍️ Create New Post - Admin Dashboard" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                            <span className="mr-2">✍️</span>
                            Create New Post
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Share your thoughts with the world
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Title */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                            Post Title *
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => handleTitleChange(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                                            placeholder="Enter your post title..."
                                            required
                                        />
                                        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                                            URL Slug
                                        </label>
                                        <input
                                            type="text"
                                            id="slug"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="post-url-slug"
                                        />
                                        {errors.slug && <p className="text-red-600 text-sm mt-1">{errors.slug}</p>}
                                        <p className="text-gray-500 text-sm mt-1">
                                            URL: /blog/{data.slug || 'post-url-slug'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                                            Excerpt (Optional)
                                        </label>
                                        <textarea
                                            id="excerpt"
                                            value={data.excerpt}
                                            onChange={(e) => setData('excerpt', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Brief description of your post..."
                                        />
                                        {errors.excerpt && <p className="text-red-600 text-sm mt-1">{errors.excerpt}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                            Content *
                                        </label>
                                        <textarea
                                            id="content"
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            rows={20}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                                            placeholder="Write your post content here... (HTML supported)"
                                            required
                                        />
                                        {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content}</p>}
                                        <p className="text-gray-500 text-sm mt-1">
                                            You can use HTML tags for formatting.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Publish Settings */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <span className="mr-2">📤</span>
                                    Publish Settings
                                </h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                        {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status}</p>}
                                    </div>

                                    {data.status === 'published' && (
                                        <div>
                                            <label htmlFor="published_at" className="block text-sm font-medium text-gray-700 mb-1">
                                                Publish Date
                                            </label>
                                            <input
                                                type="datetime-local"
                                                id="published_at"
                                                value={data.published_at}
                                                onChange={(e) => setData('published_at', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
                                            Category
                                        </label>
                                        <select
                                            id="category_id"
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Uncategorized</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category_id && <p className="text-red-600 text-sm mt-1">{errors.category_id}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Featured Image */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <span className="mr-2">🖼️</span>
                                    Featured Image
                                </h3>
                                
                                <div>
                                    <input
                                        type="url"
                                        value={data.featured_image}
                                        onChange={(e) => setData('featured_image', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    {errors.featured_image && <p className="text-red-600 text-sm mt-1">{errors.featured_image}</p>}
                                    <p className="text-gray-500 text-sm mt-1">
                                        Enter the URL of your featured image
                                    </p>
                                    
                                    {data.featured_image && (
                                        <div className="mt-3">
                                            <img 
                                                src={data.featured_image} 
                                                alt="Preview" 
                                                className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* SEO Settings */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <span className="mr-2">🚀</span>
                                    SEO Settings
                                </h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700 mb-1">
                                            Meta Title
                                        </label>
                                        <input
                                            type="text"
                                            id="meta_title"
                                            value={data.meta_title}
                                            onChange={(e) => setData('meta_title', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="SEO title for search engines"
                                            maxLength={60}
                                        />
                                        <p className="text-gray-500 text-xs mt-1">
                                            {data.meta_title.length}/60 characters
                                        </p>
                                    </div>

                                    <div>
                                        <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700 mb-1">
                                            Meta Description
                                        </label>
                                        <textarea
                                            id="meta_description"
                                            value={data.meta_description}
                                            onChange={(e) => setData('meta_description', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Brief description for search engines"
                                            maxLength={160}
                                        />
                                        <p className="text-gray-500 text-xs mt-1">
                                            {data.meta_description.length}/160 characters
                                        </p>
                                    </div>

                                    <div>
                                        <label htmlFor="meta_keywords" className="block text-sm font-medium text-gray-700 mb-1">
                                            Keywords
                                        </label>
                                        <input
                                            type="text"
                                            id="meta_keywords"
                                            value={data.meta_keywords}
                                            onChange={(e) => setData('meta_keywords', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="keyword1, keyword2, keyword3"
                                        />
                                        <p className="text-gray-500 text-xs mt-1">
                                            Separate keywords with commas
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="space-y-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <span>📝</span>
                                        <span>{processing ? 'Creating...' : (data.status === 'published' ? 'Publish Post' : 'Save Post')}</span>
                                    </button>
                                    
                                    <button
                                        type="button"
                                        onClick={() => router.visit('/admin/posts')}
                                        className="w-full text-gray-600 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}