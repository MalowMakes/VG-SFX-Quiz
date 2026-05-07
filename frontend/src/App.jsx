import { useState, useEffect } from 'react'
import './App.css'
import AudioPlayer from './Services/AudioPlayer'
import QuizContainer from './components/QuizContainer'


function App() {
  const [games, setGames] = useState([]);
  const [userAnswers, setUserAnswers] = useState({}); // Stores what the user types
  const API_BASE = 'http://localhost:3001';

  useEffect(() => {
    // Fetch the entire array from your JSON
    fetch(`${API_BASE}/api/game/all`)
      .then(res => res.json())
      .then(data => {
        setGames(data);
        // Initialize the answers object: { 1: "", 2: "", ... }
        const initialAnswers = {};
        data.forEach(g => initialAnswers[g.id] = "");
        setUserAnswers(initialAnswers);
      });
  }, []);

  const handleInputChange = (id, value, options) => {
    const isCorrect = options.some(opt =>
      opt.toLowerCase().trim() === value.toLowerCase().trim()
    );
    if (isCorrect) {
      setUserAnswers(prev => ({ ...prev, [id]: value }));
      return;
    }
    setUserAnswers(prev => ({ ...prev, [id]: value }));
  };


  if (!games.length) return <div>Loading sound...</div>;

  return (
    <div>
      <h1>Video Game Sound Challenge</h1>
      <QuizContainer games={games} playAudio={AudioPlayer.playAudio} />
    </div>
  );
}

export default App
