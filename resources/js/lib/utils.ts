import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDistance(date: Date, baseDate: Date, options?: { addSuffix?: boolean }): string {
    const seconds = Math.floor((baseDate.getTime() - date.getTime()) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return interval + ' years' + (options?.addSuffix ? ' ago' : '');
    if (interval === 1) return '1 year' + (options?.addSuffix ? ' ago' : '');
    
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + ' months' + (options?.addSuffix ? ' ago' : '');
    if (interval === 1) return '1 month' + (options?.addSuffix ? ' ago' : '');
    
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + ' days' + (options?.addSuffix ? ' ago' : '');
    if (interval === 1) return '1 day' + (options?.addSuffix ? ' ago' : '');
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + ' hours' + (options?.addSuffix ? ' ago' : '');
    if (interval === 1) return '1 hour' + (options?.addSuffix ? ' ago' : '');
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + ' minutes' + (options?.addSuffix ? ' ago' : '');
    if (interval === 1) return '1 minute' + (options?.addSuffix ? ' ago' : '');
    
    if (seconds < 10) return 'just now';
    return Math.floor(seconds) + ' seconds' + (options?.addSuffix ? ' ago' : '');
}
