import { useState, useRef } from 'react';

import './QuizFooter.css'

const QuizFooter = ({ onGiveUp, isGivenUp }) => {
    const [holdProgress, setHoldProgress] = useState(0);
    const holdInterval = useRef(null);

    const startHold = () => {
        holdInterval.current = setInterval(() => {
            setHoldProgress((prev) => {
                const next = prev + 2;
                if (next >= 100) {
                    clearInterval(holdInterval.current);
                    setTimeout(() => {
                        onGiveUp();
                    }, 0);

                    return 100;
                }

                return next;
            });
        }, 20);
    };

    const stopHold = () => {
        clearInterval(holdInterval.current);
        setHoldProgress(0);
    };

    return (
        <footer className="quiz-footer">
            <footer className="quiz-footer">
                {isGivenUp ? (
                    <h2 className="game-over">GAME OVER</h2>
                ) : (
                    <button
                        className={`give-up-btn ${holdProgress > 0 ? 'shaking' : ''}`}
                        onMouseDown={startHold}
                        onMouseUp={stopHold}
                        onMouseLeave={stopHold}
                    >
                        <div className="fill-bar" style={{ width: `${holdProgress}%` }} />
                        <span className="btn-text">
                            {holdProgress > 0 ? 'HOLDING...' : 'I GIVE UP'}
                        </span>
                    </button>
                )}
            </footer>
        </footer>
    );
};

export default QuizFooter;