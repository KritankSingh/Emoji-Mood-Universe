
import { useRef, useState } from 'react';
import { MoodEmoji } from '../data/moodData';
import EmojiPlanet from './EmojiPlanet';

interface DropZoneProps {
  onDrop: (id: string, x: number, y: number) => void;
  customEmojis: MoodEmoji[];
  onEmojiReturn: (id: string) => void;
}

const DropZone = ({ onDrop, customEmojis, onEmojiReturn }: DropZoneProps) => {
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    
    if (!dropZoneRef.current) return;
    
    const rect = dropZoneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    onDrop(id, x, y);
  };
  
  const handleDragStart = (id: string) => {
    setActiveDragId(id);
  };
  
  const handleDragEnd = () => {
    setActiveDragId(null);
  };
  
  const handleDoubleClick = (id: string) => {
    onEmojiReturn(id);
  };
  
  return (
    <div 
      ref={dropZoneRef}
      className="absolute bottom-4 left-4 right-4 h-48 border-2 border-dashed border-white/30 rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="absolute inset-0 flex items-center justify-center text-white/50 pointer-events-none">
        {customEmojis.length === 0 ? "Drag emojis here to create your galaxy" : ""}
      </div>
      
      {customEmojis.map(emoji => (
        <div 
          key={emoji.id} 
          className="absolute" 
          style={{ left: emoji.position?.x, top: emoji.position?.y }}
          onDoubleClick={() => handleDoubleClick(emoji.id)}
        >
          <EmojiPlanet 
            mood={emoji} 
            orbitDistance={0}
            orbitSpeed=""
            orbitDelay=""
            isDraggable={true}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        </div>
      ))}
    </div>
  );
};

export default DropZone;
