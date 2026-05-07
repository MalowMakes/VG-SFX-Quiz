import React from 'react'
import { FaPlay } from 'react-icons/fa'

const AudioButton = ({ url, playAudio }) => {
  const buttonRef = React.createRef()

  const handleClick = () => {
    buttonRef.current.blur()
    playAudio(url)
  }

  return (
    <button ref={buttonRef} onClick={handleClick}>
      <FaPlay size={20} />
    </button>
  )
}

export default AudioButton
