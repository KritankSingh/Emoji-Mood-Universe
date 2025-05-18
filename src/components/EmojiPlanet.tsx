
import { useRef, useState } from 'react';
import { MoodEmoji, categoryColors } from '../data/moodData';

interface EmojiPlanetProps {
  mood: MoodEmoji;
  orbitDistance: number;
  orbitSpeed: string;
  orbitDelay: string;
  isDraggable: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
}

const EmojiPlanet = ({ 
  mood, 
  orbitDistance, 
  orbitSpeed, 
  orbitDelay,
  isDraggable,
  onDragStart,
  onDragEnd
}: EmojiPlanetProps) => {
  const emojiRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const categoryColor = categoryColors[mood.category];
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isDraggable) return;
    
    e.dataTransfer.setData('text/plain', mood.id);
    setIsDragging(true);
    onDragStart(mood.id);
    
    // Create a ghost drag image that's transparent
    const dragImage = new Image();
    dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd();
  };
  
  const style = mood.position 
    ? { 
        left: `${mood.position.x}px`, 
        top: `${mood.position.y}px`,
        position: 'absolute' as const
      } 
    : {
        animationName: orbitSpeed,
        animationDelay: orbitDelay,
        // Position at distance from center on a circle
        transform: `rotate(${Math.random() * 360}deg) translateX(${orbitDistance}px) rotate(0deg)`
      };
  
  return (
    <div
      ref={emojiRef}
      className={`emoji-container absolute ${!mood.position && orbitSpeed} ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={style}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div 
        className={`emoji animate-pulse-glow rounded-full p-2`} 
        style={{ 
          backgroundColor: `${categoryColor}33`, // Add alpha transparency
          boxShadow: `0 0 10px 2px ${categoryColor}66`,
          border: `1px solid ${categoryColor}`
        }}
      >
        {mood.emoji}
      </div>
      <div className="tooltip">
        {mood.name}
      </div>
    </div>
  );
};

export default EmojiPlanet;
