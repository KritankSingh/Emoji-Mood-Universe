
import React from 'react';
import { categoryColors, MoodCategory } from '../data/moodData';

interface OrbitPathProps {
  distance: number;
  category: MoodCategory;
}

const OrbitPath: React.FC<OrbitPathProps> = ({ distance, category }) => {
  const size = distance * 2;
  const categoryColor = categoryColors[category];
  
  return (
    <div 
      className="orbit-path"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `calc(50% - ${distance}px)`,
        top: `calc(50% - ${distance}px)`,
        borderColor: categoryColor,
      }}
    />
  );
};

export default OrbitPath;
