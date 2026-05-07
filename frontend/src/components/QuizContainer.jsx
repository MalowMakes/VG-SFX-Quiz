import React from 'react'

import QuizElement from './QuizElement'

const QuizContainer = ({ games, playAudio, }) => (
  <section className='Quiz-main'>
    {games.length === 0 && <p>Loading...</p>}
    {games.map((s, i) => (
      <QuizElement
        key={s.id}
        id={s.id}
        audioUrl={s.audioUrl}
        playAudio={playAudio}
        options={s.options}
      />
    ))}
  </section>
)

export default QuizContainer
