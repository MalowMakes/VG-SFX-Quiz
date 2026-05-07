import React from 'react'

import QuizElement from './QuizElement'

const QuizContainer = ({ games, onSolved, playAudio, revealAll }) => (
  <section className='Quiz-main'>
    {games.length === 0 && <p>Loading...</p>}
    {games.map((s, i) => (
      <QuizElement
        key={s.id}
        id={s.id}
        audioUrl={s.audioUrl}
        playAudio={playAudio}
        options={s.options}
        onSolved={onSolved}
        revealAll={revealAll}
      />
    ))}
  </section>
)

export default QuizContainer
