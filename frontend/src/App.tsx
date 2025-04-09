import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Signup from './pages/Signup';
import MemoryGame from './pages/MemoryGame';
import GameTypes from "./pages/GameTypes";
import EmotionGame from "./pages/EmotionGame";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/memory-game" element={<MemoryGame />} />
      <Route path="/game-types" element={<GameTypes />} />
      <Route path="/emotion-game" element={<EmotionGame />} />
    </Routes>
  );
}

export default App;
