const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = 3001;
app.use('/sounds', express.static(path.join(__dirname, 'uploads')));
const DATA_PATH = path.join(__dirname, 'games.json');

const getGames = () => {
  const data = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(data);
};

app.get('/api/game/random', (req, res) => {
  try {
    const games = getGames();
    
    // Pick a random index
    const randomIndex = Math.floor(Math.random() * games.length);
    const randomGame = games[randomIndex];

    res.json(randomGame);
  } catch (err) {
    res.status(500).json({ error: "Could not read game data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});