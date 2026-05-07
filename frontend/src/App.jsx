import { useState, useEffect } from 'react'
import './App.css'
import AudioPlayer from './Services/AudioPlayer'
import QuizContainer from './components/QuizContainer'


function App() {
  const [games, setGames] = useState([]); // List of games from JSON
  const [solvedList, setSolvedList] = useState([]); // Track solved games by ID
  const [isGivenUp, setIsGivenUp] = useState(false); // Track if user has given up on current quiz
  const API_BASE = 'http://localhost:3001';

  useEffect(() => {
    // Fetch the entire array from the JSON
    fetch(`${API_BASE}/api/game/all`)
      .then(res => res.json())
      .then(data => {
        setGames(data);
      });
  }, []);

  const handleScore = (id) => {
    setSolvedList((prev) => {
      // If the ID is already in the list, don't add it again
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const handleGiveUp = () => {
    setIsGivenUp(true);
  };

  if (!games.length) return <div>Loading sound...</div>;

  return (
    <div>
      <header className="score-header">
        <h1>Video Game Sound Quiz</h1>

        <div className="score-bubble">
          {solvedList.length} / {games.length}
        </div>
      </header>

      <QuizContainer
        games={games}
        onSolved={handleScore}
        playAudio={AudioPlayer.playAudio}
        revealAll={isGivenUp} />

      <footer className='give-up-footer'>
        {!isGivenUp ? (
          <button className="give-up-btn" onClick={handleGiveUp}>I Give Up!</button>
        ) : (
          <h2 className="game-over">Quiz Ended</h2>
        )}
      </footer>
    </div>
  );
}

export default App
