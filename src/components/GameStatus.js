import React from 'react';
import './GameStatus.css';

const GameStatus = ({ gameWon, word, onRestart }) => {
  return (
    <div className={`game-status ${gameWon ? 'won' : 'lost'}`}>
      <div className="status-content">
        {gameWon ? (
          <>
            <div className="status-emoji">
              <i className="fas fa-trophy"></i>
            </div>
            <h2>You Won!</h2>
            <p>The word was: <strong className="word-answer">{word}</strong></p>
          </>
        ) : (
          <>
            <div className="status-emoji">
              <i className="fas fa-skull-crossbones"></i>
            </div>
            <h2>Game Over!</h2>
            <p>The word was: <strong className="word-answer">{word}</strong></p>
          </>
        )}
      </div>
    </div>
  );
};

export default GameStatus;
