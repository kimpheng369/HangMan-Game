import React from 'react';
import './WordDisplay.css';

const WordDisplay = ({ word, guessedLetters }) => {
  const displayWord = word
    .split('')
    .map(letter => (guessedLetters.has(letter) ? letter : '_'))
    .join(' ');

  const wordLetters = new Set(word.split(''));
  const allGuessed = Array.from(wordLetters).every(letter =>
    guessedLetters.has(letter)
  );

  return (
    <div className="word-display-container">
      <div className={`word-display ${allGuessed ? 'won' : ''}`}>
        {displayWord}
      </div>
      <div className="word-hint">
        Category: <strong>Programming & Technology</strong>
      </div>
    </div>
  );
};

export default WordDisplay;
