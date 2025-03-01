import { useEffect, useRef, useState, memo } from 'react';
import { cn } from '../../lib/utils';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VimeoPlayerProps {
  videoId: string;
  className?: string;
  autoplay?: boolean;
  background?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  title?: string;
  quality?: 'auto' | '1080p' | '720p' | '540p' | '360p';
  aspectRatio?: 'wide' | 'square' | 'vertical' | 'custom';
  customAspectRatio?: string;
  startTime?: number;
  lazyLoad?: boolean;
  thumbnail?: string;
  showTitle?: boolean;
  showByline?: boolean;
  showPortrait?: boolean;
  color?: string;
}

function VimeoPlayer({ 
  videoId,
  className = '',
  autoplay = false,
  background = false,
  loop = false,
  muted = false,
  controls = true,
  title = '',
  quality = 'auto',
  aspectRatio = 'wide',
  customAspectRatio,
  startTime,
  lazyLoad = true,
  thumbnail,
  showTitle = false,
  showByline = false,
  showPortrait = false,
  color = '14b8a6',
}: VimeoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(!lazyLoad);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  // Convert aspect ratio to padding bottom percentage for responsive iframe
  const getAspectRatioPadding = () => {
    if (customAspectRatio) return customAspectRatio;
    
    switch (aspectRatio) {
      case 'wide': return '56.25%'; // 16:9
      case 'square': return '100%'; // 1:1
      case 'vertical': return '177.78%'; // 9:16
      default: return '56.25%'; // Default to 16:9
    }
  };
  
  // Build the Vimeo URL with parameters
  const buildVimeoUrl = () => {
    const baseUrl = `https://player.vimeo.com/video/${videoId}`;
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      loop: loop || background ? '1' : '0',
      muted: muted || background ? '1' : '0',
      background: background ? '1' : '0',
      title: showTitle ? '1' : '0',
      byline: showByline ? '1' : '0',
      portrait: showPortrait ? '1' : '0',
      dnt: '1', // Do Not Track
      quality: quality,
      transparent: '1',
      color: color,
    });
    
    if (startTime) {
      params.append('#t', `${startTime}s`);
    }
    
    return `${baseUrl}?${params.toString()}`;
  };
  
  // Lazy load the iframe when it's in view
  useEffect(() => {
    if (!lazyLoad) {
      setIsLoaded(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px 0px', // Start loading when the element is 100px from entering the viewport
        threshold: 0,
      }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [lazyLoad]);
  
  // Initialize the Vimeo Player API
  useEffect(() => {
    if (!isLoaded || !iframeRef.current) return;
    
    let player: any;
    
    const loadVimeoApi = async () => {
      if (window.Vimeo) {
        initializePlayer();
      } else {
        const script = document.createElement('script');
        script.src = 'https://player.vimeo.com/api/player.js';
        script.async = true;
        script.onload = initializePlayer;
        document.body.appendChild(script);
      }
    };
    
    const initializePlayer = () => {
      if (!iframeRef.current) return;
      
      // @ts-ignore - Vimeo Player is loaded dynamically
      player = new window.Vimeo.Player(iframeRef.current);
      
      player.on('play', () => setIsPlaying(true));
      player.on('pause', () => setIsPlaying(false));
      player.on('volumechange', ({ volume }: { volume: number }) => {
        setIsMuted(volume === 0);
      });
      
      // Set initial state
      player.getMuted().then((muted: boolean) => {
        setIsMuted(muted);
      });
      
      player.getPaused().then((paused: boolean) => {
        setIsPlaying(!paused);
      });
    };
    
    loadVimeoApi();
    
    return () => {
      if (player) {
        player.unload();
      }
    };
  }, [isLoaded]);
  
  // Custom controls for the player
  const togglePlay = () => {
    if (!iframeRef.current) return;
    
    // @ts-ignore - Vimeo Player is loaded dynamically
    const player = new window.Vimeo.Player(iframeRef.current);
    
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };
  
  const toggleMute = () => {
    if (!iframeRef.current) return;
    
    // @ts-ignore - Vimeo Player is loaded dynamically
    const player = new window.Vimeo.Player(iframeRef.current);
    
    if (isMuted) {
      player.setVolume(1);
    } else {
      player.setVolume(0);
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative overflow-hidden rounded-lg bg-gray-100 dark:bg-dark-800',
        className
      )}
      style={{ paddingBottom: getAspectRatioPadding() }}
    >
      {isLoaded ? (
        <>
          <iframe
            ref={iframeRef}
            src={buildVimeoUrl()}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={title || `Vimeo video ${videoId}`}
          />
          
          {/* Custom controls when not background video */}
          {!background && !controls && (
            <div className="absolute bottom-4 right-4 flex items-center space-x-2">
              <button
                onClick={togglePlay}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              
              <button
                onClick={toggleMute}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          )}
        </>
      ) : (
        /* Thumbnail/placeholder */
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-dark-700">
          {thumbnail ? (
            <img 
              src={thumbnail} 
              alt={title || `Vimeo video ${videoId} thumbnail`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <svg
                className="h-12 w-12 text-gray-400 dark:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Click to load video
              </span>
            </div>
          )}
          
          <button
            onClick={() => setIsLoaded(true)}
            className="absolute inset-0 flex h-full w-full items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100"
            aria-label="Load video"
          >
            <div className="rounded-full bg-black/60 p-4 backdrop-blur-sm">
              <Play className="h-10 w-10 text-white" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(VimeoPlayer);