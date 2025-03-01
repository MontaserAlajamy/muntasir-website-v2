/**
 * Vimeo Player API type definitions
 */
interface Window {
  Vimeo?: {
    Player: any;
  };
}

interface VimeoPlayerOptions {
  id?: number | string;
  url?: string;
  autopause?: boolean;
  autoplay?: boolean;
  background?: boolean;
  byline?: boolean;
  color?: string;
  controls?: boolean;
  dnt?: boolean;
  height?: number;
  loop?: boolean;
  maxheight?: number;
  maxwidth?: number;
  muted?: boolean;
  playsinline?: boolean;
  portrait?: boolean;
  responsive?: boolean;
  speed?: boolean;
  quality?: 'auto' | '1080p' | '720p' | '540p' | '360p';
  texttrack?: string;
  title?: boolean;
  transparent?: boolean;
  width?: number;
}

declare class VimeoPlayer {
  constructor(element: HTMLElement | string, options?: VimeoPlayerOptions);
  
  on(event: string, callback: Function): void;
  off(event: string, callback?: Function): void;
  
  play(): Promise<void>;
  pause(): Promise<void>;
  unload(): Promise<void>;
  
  getVolume(): Promise<number>;
  setVolume(volume: number): Promise<void>;
  
  getMuted(): Promise<boolean>;
  setMuted(muted: boolean): Promise<void>;
  
  getCurrentTime(): Promise<number>;
  setCurrentTime(seconds: number): Promise<void>;
  
  getDuration(): Promise<number>;
  
  getPaused(): Promise<boolean>;
  
  getVideoTitle(): Promise<string>;
  getVideoId(): Promise<number>;
  getVideoWidth(): Promise<number>;
  getVideoHeight(): Promise<number>;
  
  destroy(): void;
}