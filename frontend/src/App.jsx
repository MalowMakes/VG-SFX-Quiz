import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './components/QuizPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizPage category="og" title="The Video Game Sound Effects Quiz" />} />
        <Route path="/malow" element={<QuizPage category="malow" title="VGSFX Quiz - Malow Edition" />} />
      </Routes>
    </Router>
  );
}

export default App;