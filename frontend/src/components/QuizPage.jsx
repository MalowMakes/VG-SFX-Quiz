import { useState, useEffect } from 'react'
import { useRef } from 'react';
import AudioPlayer from '../Services/AudioPlayer'
import QuizHeader from './QuizHeader'
import QuizContainer from './QuizContainer'
import QuizFooter from './QuizFooter'
import './QuizPage.css'


const QuizPage = ({ category, title }) => {
    const [data, setData] = useState([]); // Store the entire games array
    const [loading, setLoading] = useState(true); // Track loading state
    const [solvedList, setSolvedList] = useState([]); // Track solved games by ID
    const [isGivenUp, setIsGivenUp] = useState(false); // Track if user has given up on current quiz

    useEffect(() => {
        // Reset states for the new category
        setLoading(true);
        setIsGivenUp(false);
        setSolvedList([]);

        fetch(`http://localhost:3001/api/game/${category}`)
            .then(res => res.json())
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(err => console.error("Fetch error:", err));
    }, [category]); // Re-run when category changes

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

    if (loading) return <div className="loader">Loading Sounds...</div>;

    return (
        <div className="quiz-page">
            <QuizHeader
                title={title}
                solvedCount={solvedList.length}
                totalCount={data.length}
            />

            <QuizContainer
                games={data}
                onSolved={handleScore}
                playAudio={AudioPlayer.playAudio}
                revealAll={isGivenUp} />

            <QuizFooter
                onGiveUp={() => setIsGivenUp(true)}
                isGivenUp={isGivenUp}
            />
        </div>
    );
}

export default QuizPage
