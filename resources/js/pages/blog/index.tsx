import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { formatDistance } from '@/lib/utils';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    color: string;
    posts_count: number;
}

interface Author {
    id: number;
    name: string;
    email: string;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    featured_image: string | null;
    status: string;
    published_at: string | null;
    views_count: number;
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
    featuredPost: Post | null;
    currentCategory: string | null;
    searchQuery: string | null;
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
    [key: string]: unknown;
}

export default function BlogIndex({ posts, categories, featuredPost, currentCategory, searchQuery, auth }: Props) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        
        router.get('/', { search, category: currentCategory }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleCategoryFilter = (categorySlug: string | null) => {
        router.get('/', { category: categorySlug, search: searchQuery }, {
            preserveState: true,
            replace: true,
        });
    };

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <>
            <Head title="📝 Professional Blog Platform - Share Your Knowledge" />
            
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <Link href="/" className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">📝</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">BlogCraft</span>
                            </Link>
                            
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href="/admin"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Admin Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href="/login"
                                            className="text-gray-600 hover:text-gray-900 font-medium"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                📝 Professional Blog Platform
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                                Discover insightful articles, expert opinions, and the latest trends. 
                                Join our community of knowledge seekers and thought leaders.
                            </p>
                            
                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                                <div className="flex">
                                    <input
                                        type="text"
                                        name="search"
                                        placeholder="Search articles..."
                                        defaultValue={searchQuery || ''}
                                        className="flex-1 px-6 py-4 text-gray-900 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                    <button
                                        type="submit"
                                        className="px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-r-lg hover:bg-yellow-400 transition-colors"
                                    >
                                        🔍 Search
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {/* Featured Post */}
                            {featuredPost && (
                                <div className="mb-12">
                                    <div className="flex items-center mb-6">
                                        <span className="text-2xl mr-3">⭐</span>
                                        <h2 className="text-2xl font-bold text-gray-900">Featured Article</h2>
                                    </div>
                                    
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                        {featuredPost.featured_image && (
                                            <img 
                                                src={featuredPost.featured_image} 
                                                alt={featuredPost.title}
                                                className="w-full h-64 object-cover"
                                            />
                                        )}
                                        <div className="p-6">
                                            <div className="flex items-center space-x-4 mb-4">
                                                {featuredPost.category && (
                                                    <span 
                                                        className="px-3 py-1 rounded-full text-sm font-medium text-white"
                                                        style={{ backgroundColor: featuredPost.category.color }}
                                                    >
                                                        {featuredPost.category.name}
                                                    </span>
                                                )}
                                                <span className="text-sm text-gray-600">
                                                    👁️ {featuredPost.views_count} views
                                                </span>
                                            </div>
                                            
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                                <Link 
                                                    href={`/blog/${featuredPost.slug}`}
                                                    className="hover:text-blue-600 transition-colors"
                                                >
                                                    {featuredPost.title}
                                                </Link>
                                            </h3>
                                            
                                            <p className="text-gray-600 mb-4 leading-relaxed">
                                                {featuredPost.excerpt || truncateText(featuredPost.content.replace(/<[^>]*>/g, ''), 200)}
                                            </p>
                                            
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                                        <span className="text-white text-sm font-medium">
                                                            {featuredPost.author.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {featuredPost.author.name}
                                                        </p>
                                                        <p className="text-xs text-gray-600">
                                                            {featuredPost.published_at && formatDistance(new Date(featuredPost.published_at), new Date(), { addSuffix: true })}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <Link
                                                    href={`/blog/${featuredPost.slug}`}
                                                    className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                                                >
                                                    Read more →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Regular Posts Grid */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                    <span className="mr-3">📚</span>
                                    Latest Articles
                                    {currentCategory && (
                                        <span className="ml-2 text-lg text-gray-600">
                                            in {categories.find(c => c.slug === currentCategory)?.name}
                                        </span>
                                    )}
                                </h2>
                                
                                <div className="grid gap-6 md:grid-cols-2">
                                    {posts.data.map((post) => (
                                        <article key={post.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                                            {post.featured_image && (
                                                <img 
                                                    src={post.featured_image} 
                                                    alt={post.title}
                                                    className="w-full h-48 object-cover"
                                                />
                                            )}
                                            <div className="p-6">
                                                <div className="flex items-center space-x-4 mb-3">
                                                    {post.category && (
                                                        <span 
                                                            className="px-2 py-1 rounded-full text-xs font-medium text-white"
                                                            style={{ backgroundColor: post.category.color }}
                                                        >
                                                            {post.category.name}
                                                        </span>
                                                    )}
                                                    <span className="text-xs text-gray-500">
                                                        👁️ {post.views_count} views
                                                    </span>
                                                </div>
                                                
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                    <Link 
                                                        href={`/blog/${post.slug}`}
                                                        className="hover:text-blue-600 transition-colors"
                                                    >
                                                        {post.title}
                                                    </Link>
                                                </h3>
                                                
                                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                                    {post.excerpt || truncateText(post.content.replace(/<[^>]*>/g, ''), 120)}
                                                </p>
                                                
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                                                            <span className="text-white text-xs font-medium">
                                                                {post.author.name.charAt(0)}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-medium text-gray-900">
                                                                {post.author.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {post.published_at && formatDistance(new Date(post.published_at), new Date(), { addSuffix: true })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    
                                                    <Link
                                                        href={`/blog/${post.slug}`}
                                                        className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
                                                    >
                                                        Read →
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                                
                                {posts.data.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">📝</div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                                        <p className="text-gray-600">Try adjusting your search or browse categories.</p>
                                    </div>
                                )}

                                {/* Pagination */}
                                {posts.links && posts.links.length > 3 && (
                                    <div className="flex justify-center mt-8">
                                        <div className="flex space-x-2">
                                            {posts.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                        link.active
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            {/* Categories */}
                            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <span className="mr-2">🏷️</span>
                                    Categories
                                </h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => handleCategoryFilter(null)}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                            !currentCategory ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        All Categories ({categories.reduce((sum, cat) => sum + cat.posts_count, 0)})
                                    </button>
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleCategoryFilter(category.slug)}
                                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                                                currentCategory === category.slug 
                                                    ? 'bg-blue-100 text-blue-800' 
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            <span className="flex items-center">
                                                <span 
                                                    className="w-3 h-3 rounded-full mr-2" 
                                                    style={{ backgroundColor: category.color }}
                                                ></span>
                                                {category.name}
                                            </span>
                                            <span className="text-sm">({category.posts_count})</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Admin CTA */}
                            {!auth.user && (
                                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
                                    <h3 className="text-lg font-bold mb-2">✍️ Start Writing</h3>
                                    <p className="text-sm text-purple-100 mb-4">
                                        Share your knowledge with the world. Create and manage your own blog content.
                                    </p>
                                    <Link
                                        href="/register"
                                        className="inline-block w-full text-center bg-white text-purple-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}