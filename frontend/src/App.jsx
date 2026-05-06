import { useState, useEffect } from 'react'
import './App.css'

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
    <div className="quiz-container">
      <h1>Video Game Sound Challenge</h1>
      <div className="grid">
        {games.map((game) => {
          const isCorrect = game.options.some(opt =>
            opt.toLowerCase().trim() === (userAnswers[game.id] || "").toLowerCase().trim()
          );

          return (
            <div key={game.id} className={`card ${isCorrect ? 'locked' : ''}`}>
              <audio controls src={`${API_BASE}${game.audioUrl}`} />
              <input
                type="text"
                placeholder="Guess the video game..."
                value={userAnswers[game.id]}
                disabled={isCorrect}
                onChange={(e) => handleInputChange(game.id, e.target.value, game.options)}
                className={isCorrect ? 'correct-input' : ''}
              />
              {isCorrect && <span className="badge">✅ Correct!</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App
