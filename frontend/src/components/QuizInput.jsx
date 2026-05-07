import { useState, useEffect } from 'react';

import './QuizInput.css'

const QuizInput = ({ options, onCorrect, revealAll }) => {
  const [text, setText] = useState("");
  const [locked, setLocked] = useState(false);
  const [isUserCorrect, setIsUserCorrect] = useState(false);

  useEffect(() => {
    // Only lock via reveal if the user hasn't already solved it
    if (revealAll && !isUserCorrect) {
      setLocked(true);
    }
  }, [revealAll, isUserCorrect]);

  const checkGuess = (e) => {
    const val = e.target.value;
    setText(val);

    // Check against the options array from JSON
    const isMatch = options.some(opt =>
      opt.toLowerCase().trim() === val.toLowerCase().trim()
    );

    if (isMatch) {
      setLocked(true);
      setIsUserCorrect(true);
      if (onCorrect) onCorrect(); // Notify parent to track total score
    }
  };

  let statusClass = "input-default";
  if (isUserCorrect) {
    statusClass = "input-correct";
  } else if (locked && revealAll) {
    statusClass = "input-revealed";
  }

  return (
    <input
      type="text"
      value={locked ? options[0] : text}
      disabled={locked}
      onChange={checkGuess}
      placeholder="Guess the game..."
      className={`quiz-input ${statusClass}`}
    />
  );
};

export default QuizInput