import Navbar from './Navbar';
import './QuizHeader.css';

const QuizHeader = ({ title, solvedCount, totalCount }) => {
  return (
    <header className="score-header">
      {/* Left Pillar */}
      <div className="header-section align-left">
        <Navbar />
      </div>

      {/* Center Pillar */}
      <div className="header-section align-center">
        <h1 className="quiz-title">{title}</h1>
      </div>

      {/* Right Pillar */}
      <div className="header-section align-right">
        <div className="score-bubble">
          {solvedCount} / {totalCount}
        </div>
      </div>
    </header>
  );
};

export default QuizHeader;