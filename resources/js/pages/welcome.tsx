import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="📝 Professional Blog Platform - Share Your Knowledge">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">📝</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">BlogCraft</span>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Admin Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href={route('login')}
                                            className="text-gray-600 hover:text-gray-900 font-medium"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={route('register')}
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
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center">
                            <h1 className="text-5xl md:text-7xl font-bold mb-6">
                                📝 BlogCraft
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                                A powerful, modern blog platform for content creators. 
                                Share your stories, engage your audience, and build your community.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                                <Link
                                    href="/blog"
                                    className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
                                >
                                    <span>📖</span>
                                    <span>Read Articles</span>
                                </Link>
                                
                                {!auth.user && (
                                    <Link
                                        href="/register"
                                        className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-colors flex items-center space-x-2"
                                    >
                                        <span>✍️</span>
                                        <span>Start Writing</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                ✨ Everything You Need for Professional Blogging
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                From powerful content management to audience engagement, 
                                BlogCraft provides all the tools you need to succeed.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Rich Content Creation */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">🎨</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Rich Content Creation</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Create beautiful posts with text, images, and videos. 
                                    Our intuitive editor makes content creation a breeze.
                                </p>
                            </div>

                            {/* Category Management */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">🏷️</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Organization</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Organize your content with categories and tags. 
                                    Help readers discover exactly what they're looking for.
                                </p>
                            </div>

                            {/* Engagement Tools */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">💬</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Reader Engagement</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Built-in commenting system with moderation tools. 
                                    Foster meaningful discussions with your audience.
                                </p>
                            </div>

                            {/* Analytics & Insights */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">📊</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Insights</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Track views, engagement, and popular content. 
                                    Data-driven insights to grow your audience.
                                </p>
                            </div>

                            {/* SEO Optimized */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">🚀</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">SEO Optimized</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Built-in SEO tools and meta tag management. 
                                    Get discovered by search engines and grow organically.
                                </p>
                            </div>

                            {/* Admin Dashboard */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">⚡</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Powerful Dashboard</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Intuitive admin interface for content management. 
                                    Everything you need is just a click away.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-20">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            🌟 Ready to Start Your Blogging Journey?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of content creators who trust BlogCraft 
                            to share their stories with the world.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <Link
                                href="/blog"
                                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
                            >
                                <span>📖</span>
                                <span>Browse Articles</span>
                            </Link>
                            
                            {!auth.user ? (
                                <Link
                                    href="/register"
                                    className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 border-2 border-blue-600"
                                >
                                    <span>✍️</span>
                                    <span>Start Writing Today</span>
                                </Link>
                            ) : (
                                <Link
                                    href="/admin"
                                    className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 border-2 border-blue-600"
                                >
                                    <span>📊</span>
                                    <span>Go to Dashboard</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">📝</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">BlogCraft</span>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Professional blogging platform for the modern content creator
                            </p>
                            <p className="text-sm text-gray-500">
                                Built with ❤️ by{" "}
                                <a 
                                    href="https://app.build" 
                                    target="_blank" 
                                    className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    app.build
                                </a>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
