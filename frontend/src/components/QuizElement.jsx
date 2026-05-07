import React from 'react'

import AudioButton from './AudioButton'
import AudioPlayer from '../services/AudioPlayer'
import QuizInput from './QuizInput'

import './QuizElement.css'

const QuizElement = ({ id, audioUrl, playAudio, options }) => (
    <div className='Quiz-element'>
        <AudioButton url={audioUrl} playAudio={playAudio} />
        <QuizInput
            options={options}
            onCorrect={() => console.log(`Game ${id} solved!`)}
        />
        <span className='Quiz-element-id'>{id}</span>
    </div>
)

export default QuizElement
