const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = 3001;
app.use('/sounds', express.static(path.join(__dirname, 'uploads')));
const DATA_PATH = path.join(__dirname, 'games.json');

const getGames = (category) => {
  const allGames = JSON.parse(fs.readFileSync('./games.json', 'utf-8'));
  return allGames.filter(game => game.category === category);
};

app.get('/api/game/:category', (req, res) => {
  const { category } = req.params;
  console.log("Searching for category:", category); // DEBUG LOG
  const filePath = path.join(__dirname, 'data', `${category}.json`);

  // Is the file there?
  if (!fs.existsSync(filePath)) {
    console.log("File not found at:", filePath); // DEBUG LOG
    return res.status(404).json({ error: `Quiz category '${category}' not found.` });
  }

  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const games = JSON.parse(rawData);
    res.json(games);
  } catch (err) {
    console.error("Error reading file:", err);
    res.status(500).send("Server error reading quiz data");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});