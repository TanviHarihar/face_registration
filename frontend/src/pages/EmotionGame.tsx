import React, { useState } from "react";
import "./EmotionGame.css";

const emotions = [
  { emoji: "😊", word: "Happy" },
  { emoji: "😢", word: "Sad" },
  { emoji: "😠", word: "Angry" },
  { emoji: "😨", word: "Scared" },
  { emoji: "😲", word: "Surprised" },
  { emoji: "😎", word: "Confident" },
];

const shuffledWords = emotions
  .map(e => e.word)
  .sort(() => Math.random() - 0.5);

export default function EmotionAssociationGame() {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);

  const handleSelect = (emoji: string, selectedWord: string) => {
    const correct = emotions.find(e => e.emoji === emoji)?.word === selectedWord;
    if (!matches[emoji]) {
      setMatches(prev => ({ ...prev, [emoji]: selectedWord }));
      if (correct) setScore(score + 1);
    }
  };

  return (
    <div className="emotion-game-container">
      <h2 className="title">Emotion Association 🧠💬</h2>
      <p className="subtitle">Match each emotion face with the correct word</p>
      <div className="match-columns">
        <div className="emoji-column">
          {emotions.map(({ emoji }) => (
            <div key={emoji} className="emoji-box">{emoji}</div>
          ))}
        </div>
        <div className="word-column">
          {shuffledWords.map(word => (
            <div
              key={word}
              className="word-box"
              onClick={() => {
                const currentEmoji = emotions.find(e => !matches[e.emoji]);
                if (currentEmoji) {
                  handleSelect(currentEmoji.emoji, word);
                }
              }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>
      <div className="score-section">
        Score: {score} / {emotions.length}
      </div>
    </div>
  );
}
