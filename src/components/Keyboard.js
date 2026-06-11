import React from 'react';
import './Keyboard.css';

const Keyboard = ({ onGuess, guessedLetters }) => {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <div className="keyboard-container">
      <h3><i className="fas fa-keyboard"></i> Guess a Letter:</h3>
      <div className="keyboard">
        {letters.map(letter => (
          <button
            key={letter}
            className={`letter-button ${guessedLetters.has(letter) ? 'guessed' : ''}`}
            onClick={() => onGuess(letter)}
            disabled={guessedLetters.has(letter)}
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
