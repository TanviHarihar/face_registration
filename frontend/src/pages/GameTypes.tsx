import React from "react";

const gameTypes = [
  {
    title: "Memory Games",
    items: [
      "Matching Games",
      "Sequence Memory",
      "What's Missing?"
    ],
    color: "from-purple-400 to-pink-400"
  },
  {
    title: "Emotion Recognition Games",
    items: [
      "Facial Expression Matching",
      "Emotion Word Association"
    ],
    color: "from-yellow-300 to-red-400"
  },
  {
    title: "Color and Shape Recognition Games",
    items: ["Color Sorting", "Shape Matching"],
    color: "from-green-300 to-blue-400"
  },
  {
    title: "Puzzle Games",
    items: ["Jigsaw Puzzles", "Shape Sorting"],
    color: "from-blue-400 to-indigo-400"
  },
  {
    title: "Problem-Solving Games",
    items: ["Logic Puzzles", "Maze Navigation", "Sequencing Tasks"],
    color: "from-orange-300 to-pink-400"
  },
  {
    title: "Storytelling and Role-Playing Games",
    items: ["Interactive Stories", "Role Play Games"],
    color: "from-teal-300 to-cyan-400"
  },
  {
    title: "Social Skills Training Games",
    items: ["Conversation Practice", "Social Scenarios"],
    color: "from-pink-300 to-red-400"
  },
  {
    title: "Attention and Focus Games",
    items: ["Spot the Difference", "Find the Object"],
    color: "from-lime-300 to-green-400"
  },
  {
    title: "Motor Skills Games",
    items: ["Fine Motor Games", "Movement-Based Games"],
    color: "from-rose-300 to-purple-400"
  },
  {
    title: "Sorting and Categorization Games",
    items: [
      "Sorting by Category",
      "Sorting by Size/Color/Shape"
    ],
    color: "from-sky-300 to-blue-500"
  },
  {
    title: "Sound Recognition and Listening Games",
    items: ["Sound Matching", "Follow the Sound"],
    color: "from-amber-300 to-orange-400"
  },
  {
    title: "Rhythm and Music Games",
    items: ["Beat Matching", "Instrument Recognition"],
    color: "from-violet-300 to-fuchsia-400"
  }
];

export default function GameTypeCards() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Choose a Game Type
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {gameTypes.map((game, index) => (
          <div
            key={index}
            className={`rounded-2xl p-5 shadow-lg text-white bg-gradient-to-br ${game.color} transition hover:scale-105 hover:shadow-xl`}
          >
            <h2 className="text-xl font-semibold mb-2">{game.title}</h2>
            <ul className="list-disc pl-5 space-y-1">
              {game.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
