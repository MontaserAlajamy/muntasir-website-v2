export * from './classNames';

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed
 * since the last time the debounced function was invoked.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
  };
}

/**
 * Format file size in a human-readable format.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Creates a throttled function that only invokes func at most once per every wait milliseconds.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let lastTime = 0;
  
  return function(...args: Parameters<T>) {
    const now = Date.now();
    
    if (now - lastTime >= wait) {
      func(...args);
      lastTime = now;
    }
  };
}

/**
 * Extracts the video ID from a Vimeo URL.
 */
export function getVimeoId(url: string): string | null {
  // Handle different Vimeo URL formats
  const patterns = [
    /vimeo\.com\/(\d+)/,               // vimeo.com/123456789
    /vimeo\.com\/video\/(\d+)/,        // vimeo.com/video/123456789
    /vimeo\.com\/channels\/.*\/(\d+)/, // vimeo.com/channels/channel/123456789
    /vimeo\.com\/groups\/.*\/videos\/(\d+)/, // vimeo.com/groups/group/videos/123456789
    /player\.vimeo\.com\/video\/(\d+)/ // player.vimeo.com/video/123456789
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Creates a truncated version of text with ellipsis if it exceeds the specified length.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Generates a URL-friendly slug from a string.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/&/g, '-and-')   // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}

/**
 * Returns true if the code is running in a browser environment.
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}