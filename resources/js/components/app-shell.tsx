import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
    const { auth } = usePage<SharedData>().props;

    if (variant === 'header') {
        return <div className="flex min-h-screen w-full flex-col">{children}</div>;
    }

    // Admin layout with sidebar
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <Link href="/admin" className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">📝</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">BlogCraft Admin</span>
                            </Link>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 font-medium flex items-center space-x-1"
                            >
                                <span>🌐</span>
                                <span>View Blog</span>
                            </Link>
                            
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-medium text-sm">
                                        {auth.user?.name.charAt(0)}
                                    </span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{auth.user?.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <nav className="w-64 bg-white shadow-sm min-h-screen">
                    <div className="p-4 space-y-2">
                        <Link
                            href="/admin"
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <span>📊</span>
                            <span className="font-medium">Dashboard</span>
                        </Link>
                        
                        <Link
                            href="/admin/posts"
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <span>📄</span>
                            <span className="font-medium">Posts</span>
                        </Link>
                        
                        <Link
                            href="/admin/posts/create"
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors ml-4"
                        >
                            <span>✍️</span>
                            <span className="font-medium">New Post</span>
                        </Link>
                        
                        <Link
                            href="/admin/categories"
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <span>🏷️</span>
                            <span className="font-medium">Categories</span>
                        </Link>
                        
                        <Link
                            href="/admin/comments"
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <span>💬</span>
                            <span className="font-medium">Comments</span>
                        </Link>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
