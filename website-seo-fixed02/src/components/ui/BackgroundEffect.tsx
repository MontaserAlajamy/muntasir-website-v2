import { useEffect, useState, useRef } from 'react';
import { useTheme } from '../providers/ThemeProvider';

interface CanvasProps {
  className?: string;
}

export default function BackgroundEffect({ className = '' }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  useEffect(() => {
    if (!mounted || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const devicePixelRatio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    
    setCanvasDimensions();
    
    // Create particles
    const particleCount = Math.min(window.innerWidth / 25, 100); // Adaptive count based on screen width
    const particles: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      lastUpdate: number;
    }[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        vx: Math.random() * 0.2 - 0.1,
        vy: Math.random() * 0.2 - 0.1,
        lastUpdate: 0
      });
    }
    
    // Draw function
    let animationFrameId: number;
    let lastTime = 0;
    
    const draw = (currentTime: number) => {
      const rect = canvas.getBoundingClientRect();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // Only redraw if canvas is visible
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        ctx.clearRect(0, 0, rect.width, rect.height);
        
        const darkMode = theme === 'dark';
        const particleColor = darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
        const lineColor = darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
        
        // Update and draw particles
        for (const particle of particles) {
          // Only update position every few frames to improve performance
          if (currentTime - particle.lastUpdate > 20) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check with bounce
            if (particle.x < 0 || particle.x > rect.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > rect.height) particle.vy *= -1;
            
            particle.lastUpdate = currentTime;
          }
          
          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particleColor;
          ctx.fill();
        }
        
        // Draw connections
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
            }
          }
        }
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    // Handle resize
    const handleResize = () => {
      setCanvasDimensions();
    };
    
    window.addEventListener('resize', handleResize);
    animationFrameId = requestAnimationFrame(draw);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, theme]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full -z-10 ${className}`}
      aria-hidden="true"
    />
  );
}