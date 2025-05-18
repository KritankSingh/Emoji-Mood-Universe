
export interface MoodEmoji {
  id: string;
  emoji: string;
  name: string;
  category: MoodCategory;
  position?: { x: number; y: number };
}

export type MoodCategory = 
  | "happy" 
  | "sad" 
  | "angry" 
  | "love" 
  | "confused" 
  | "anxious";

export const moodEmojis: MoodEmoji[] = [
  // Happy moods
  { id: "joy", emoji: "😄", name: "Joy", category: "happy" },
  { id: "laugh", emoji: "😂", name: "Laughing", category: "happy" },
  { id: "relaxed", emoji: "😌", name: "Relaxed", category: "happy" },
  { id: "party", emoji: "🥳", name: "Party", category: "happy" },
  
  // Sad moods
  { id: "sad", emoji: "😢", name: "Sad", category: "sad" },
  { id: "crying", emoji: "😭", name: "Crying", category: "sad" },
  { id: "disappointed", emoji: "😞", name: "Disappointed", category: "sad" },
  
  // Angry moods
  { id: "angry", emoji: "😠", name: "Angry", category: "angry" },
  { id: "rage", emoji: "😡", name: "Rage", category: "angry" },
  { id: "annoyed", emoji: "😒", name: "Annoyed", category: "angry" },
  
  // Love moods
  { id: "love", emoji: "❤️", name: "Love", category: "love" },
  { id: "heart_eyes", emoji: "😍", name: "Heart Eyes", category: "love" },
  { id: "kiss", emoji: "😘", name: "Kiss", category: "love" },
  
  // Confused moods
  { id: "confused", emoji: "😕", name: "Confused", category: "confused" },
  { id: "thinking", emoji: "🤔", name: "Thinking", category: "confused" },
  { id: "surprised", emoji: "😲", name: "Surprised", category: "confused" },
  
  // Anxious moods
  { id: "anxious", emoji: "😰", name: "Anxious", category: "anxious" },
  { id: "nervous", emoji: "😬", name: "Nervous", category: "anxious" },
  { id: "worried", emoji: "😟", name: "Worried", category: "anxious" },
];

export const categoryColors = {
  happy: "#FFD700", // Gold
  sad: "#1E90FF", // Dodger blue
  angry: "#FF4500", // Red-orange
  love: "#FF69B4", // Hot pink
  confused: "#9370DB", // Medium purple
  anxious: "#32CD32", // Lime green
};

export const categoryOrbits = {
  happy: { distance: 150, speed: "orbit-fast", delay: "0s" },
  sad: { distance: 200, speed: "orbit-medium", delay: "1s" },
  angry: { distance: 250, speed: "orbit-fast", delay: "0.5s" },
  love: { distance: 300, speed: "orbit-medium", delay: "0.2s" },
  confused: { distance: 350, speed: "orbit-slow", delay: "1.5s" },
  anxious: { distance: 400, speed: "orbit-slow", delay: "0.7s" },
};
