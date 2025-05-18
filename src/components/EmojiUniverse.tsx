
import { useState } from 'react';
import { MoodEmoji, moodEmojis, categoryOrbits, MoodCategory } from '../data/moodData';
import CentralSun from './CentralSun';
import EmojiPlanet from './EmojiPlanet';
import OrbitPath from './OrbitPath';
import StarBackground from './StarBackground';
import DropZone from './DropZone';

const EmojiUniverse = () => {
  const [currentMood, setCurrentMood] = useState<MoodCategory>("happy");
  const [customEmojis, setCustomEmojis] = useState<MoodEmoji[]>([]);
  const [orbitingEmojis, setOrbitingEmojis] = useState<MoodEmoji[]>(moodEmojis);
  
  const handleMoodChange = (newMood: string) => {
    setCurrentMood(newMood as MoodCategory);
  };
  
  const handleDrop = (id: string, x: number, y: number) => {
    const emoji = orbitingEmojis.find(e => e.id === id);
    
    if (!emoji) return;
    
    // Remove from orbiting emojis
    setOrbitingEmojis(prev => prev.filter(e => e.id !== id));
    
    // Add to custom emojis with position
    setCustomEmojis(prev => [
      ...prev, 
      { ...emoji, position: { x, y } }
    ]);
  };
  
  const handleEmojiReturn = (id: string) => {
    const emoji = customEmojis.find(e => e.id === id);
    
    if (!emoji) return;
    
    // Remove from custom emojis
    setCustomEmojis(prev => prev.filter(e => e.id !== id));
    
    // Add back to orbiting emojis without position
    const { position, ...restEmoji } = emoji;
    setOrbitingEmojis(prev => [...prev, restEmoji]);
  };
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <StarBackground />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-3xl">
          {/* Orbit paths */}
          {Object.entries(categoryOrbits).map(([category, orbit]) => (
            <OrbitPath 
              key={category} 
              distance={orbit.distance} 
              category={category as MoodCategory} 
            />
          ))}
          
          {/* Central sun */}
          <CentralSun onMoodChange={handleMoodChange} />
          
          {/* Orbiting emoji planets */}
          {orbitingEmojis.map(emoji => {
            const orbit = categoryOrbits[emoji.category];
            return (
              <EmojiPlanet 
                key={emoji.id}
                mood={emoji}
                orbitDistance={orbit.distance}
                orbitSpeed={orbit.speed}
                orbitDelay={orbit.delay}
                isDraggable={true}
                onDragStart={() => {}}
                onDragEnd={() => {}}
              />
            );
          })}
        </div>
      </div>
      
      {/* Drop zone for custom galaxy */}
      <DropZone 
        onDrop={handleDrop} 
        customEmojis={customEmojis}
        onEmojiReturn={handleEmojiReturn}
      />
      
      {/* Instructions */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
        Drag emojis to create your galaxy • Double-click to return them to orbit
      </div>
    </div>
  );
};

export default EmojiUniverse;
