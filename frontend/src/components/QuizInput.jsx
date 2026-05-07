import { useState } from 'react';

const QuizInput = ({ options, onCorrect }) => {
  const [text, setText] = useState("");
  const [locked, setLocked] = useState(false);

  const checkGuess = (e) => {
    const val = e.target.value;
    setText(val);

    // Check against the options array from your JSON
    const isMatch = options.some(opt => 
      opt.toLowerCase().trim() === val.toLowerCase().trim()
    );

    if (isMatch) {
      setLocked(true);
      if (onCorrect) onCorrect(); // Notify parent if you want to track total score
    }
  };

  return (
    <input
      type="text"
      value={locked ? options[0] : text}
      disabled={locked}
      onChange={checkGuess}
      placeholder="Guess the game..."
      className={locked ? 'correct-input' : ''}
    />
  );
};

export default QuizInput