import { useState, useEffect } from "react";
import "./MemoryGame.css";

const animalEmojis = ["🐶", "🐱", "🐰", "🦊", "🐼", "🐯", "🐵", "🐸"];

const generateCards = () => {
  const pairs = [...animalEmojis, ...animalEmojis];
  return pairs
    .map((emoji) => ({ id: Math.random(), emoji, matched: false }))
    .sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [cards, setCards] = useState(generateCards());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const correctSound = new Audio("/sounds/correct.mp3");
  const wrongSound = new Audio("/sounds/wrong.mp3");
  const completeSound = new Audio("/sounds/complete.mp3");

  const handleFlip = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        correctSound.play();
        setMatched([...matched, first, second]);
        setScore((prev) => prev + 1);
        setTimeout(() => setFlipped([]), 600);
      } else {
        wrongSound.play();
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      completeSound.play();
      setGameComplete(true);
    }
  }, [matched]);

  return (
    <div className="memory-game">
      <h1>Memory Match: Animal Friends 🐾</h1>
      <div className="cards-grid">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <div
              key={card.id}
              className={`card ${isFlipped ? "flipped" : ""}`}
              onClick={() => handleFlip(index)}
              tabIndex={0}
            >
              <div className="card-inner">
                <div className="card-front">{card.emoji}</div>
                <div className="card-back">❓</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="score">Score: {score}</div>

      {gameComplete && (
        <div className="game-complete">
          🎉 Well done! You matched all the animals!
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
