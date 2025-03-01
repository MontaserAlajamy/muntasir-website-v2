import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and resolves Tailwind CSS class conflicts.
 * Uses clsx for conditional classes and tailwind-merge to resolve conflicts.
 * 
 * @example
 * // No conflicts resolved
 * cn('px-2 py-1', 'bg-red-500');
 * // → 'px-2 py-1 bg-red-500'
 * 
 * @example
 * // Resolves the conflict between px-2 and px-4
 * cn('px-2 py-1', 'px-4 bg-red-500');
 * // → 'px-4 py-1 bg-red-500'
 * 
 * @example
 * // Conditionally includes classes
 * cn('px-2', isActive && 'bg-blue-500', isBig ? 'py-4' : 'py-2');
 * // → isActive=true, isBig=false: 'px-2 bg-blue-500 py-2'
 * // → isActive=false, isBig=true: 'px-2 py-4'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}