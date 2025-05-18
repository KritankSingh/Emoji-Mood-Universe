
import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: 'sm' | 'md' | 'lg';
  animationDelay: string;
}

const StarBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Generate random stars
    const numStars = Math.floor((window.innerWidth * window.innerHeight) / 1000);
    const stars: Star[] = [];
    
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * 100, // percentage
        y: Math.random() * 100, // percentage
        size: Math.random() < 0.7 ? 'sm' : Math.random() < 0.9 ? 'md' : 'lg',
        animationDelay: `${Math.random() * 3}s`
      });
    }
    
    starsRef.current = stars;
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      {starsRef.current.map((star, index) => (
        <div
          key={index}
          className={`star star-${star.size} animate-twinkle`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: star.animationDelay
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
