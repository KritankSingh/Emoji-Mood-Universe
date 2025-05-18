
import { useState } from 'react';

interface CentralSunProps {
  onMoodChange: (newMood: string) => void;
}

const moods = [
  { emoji: "😊", name: "Happy" },
  { emoji: "😢", name: "Sad" },
  { emoji: "😡", name: "Angry" },
  { emoji: "❤️", name: "Love" },
  { emoji: "🤔", name: "Confused" },
  { emoji: "😰", name: "Anxious" }
];

const CentralSun = ({ onMoodChange }: CentralSunProps) => {
  const [currentMoodIndex, setCurrentMoodIndex] = useState(0);
  const currentMood = moods[currentMoodIndex];
  
  const handleClick = () => {
    const nextIndex = (currentMoodIndex + 1) % moods.length;
    setCurrentMoodIndex(nextIndex);
    onMoodChange(moods[nextIndex].name.toLowerCase());
  };
  
  return (
    <div 
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 bg-yellow-500 rounded-full animate-pulse-glow opacity-20"></div>
        <div className="absolute w-20 h-20 bg-yellow-400 rounded-full animate-pulse-glow opacity-30"></div>
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-300 to-orange-500 animate-float shadow-lg shadow-yellow-500/50"
        >
          <span className="text-4xl">{currentMood.emoji}</span>
        </div>
      </div>
      <div className="mt-3 text-center text-white font-semibold text-lg">
        {currentMood.name}
      </div>
      <div className="text-center text-xs text-white/70 mt-1">
        Click to change mood
      </div>
    </div>
  );
};

export default CentralSun;
