import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [gameData, setGameData] = useState(null);

  // Fetch the random game sound when the component mounts
  useEffect(() => {
    fetch('http://localhost:3001/api/game/random')
      .then(response => response.json())
      .then(data => {
        setGameData(data);
      })
      .catch(error => console.error("Error fetching game:", error));
  }, []); 

  if (!gameData) return <div>Loading sound...</div>;

  return (
    <div>
      <h1>Guess the Video Game!</h1>
      <audio controls src={`http://localhost:3001${gameData.audioUrl}`} />
    </div>
  );
}

export default App
