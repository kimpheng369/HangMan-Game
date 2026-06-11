import React, { useState } from 'react';
import './StartScreen.css';

const StartScreen = ({ onGameStart }) => {
  const [gameMode, setGameMode] = useState(null);
  const [customWords, setCustomWords] = useState('');
  const [difficulty, setDifficulty] = useState(null);
  const [error, setError] = useState('');

  const handleCustomWords = () => {
    if (!customWords.trim()) {
      setError('Please enter at least one word!');
      return;
    }

    const words = customWords
      .split(',')
      .map(word => word.trim().toLowerCase())
      .filter(word => word.length > 0 && word.match(/^[a-z\s]+$/i));

    if (words.length === 0) {
      setError('Please enter valid words (letters and spaces only)');
      return;
    }

    onGameStart({
      mode: 'custom',
      words: words,
      difficulty: null
    });
  };

  const handleSystemWords = (diff) => {
    onGameStart({
      mode: 'system',
      difficulty: diff
    });
  };

  return (
    <div className="start-screen-container">
      <div className="start-screen-wrapper">
        <div className="start-header">
          <h1 className="start-title">
            <i className="fas fa-gamepad"></i> Hangman Game
          </h1>
          <p className="start-subtitle">
            Choose how you want to play
          </p>
        </div>

        {gameMode === null ? (
          <div className="mode-selection">
            <button
              className="mode-button system-mode"
              onClick={() => {
                setGameMode('system');
                setError('');
                setCustomWords('');
              }}
            >
              <div className="mode-icon">
                <i className="fas fa-database"></i>
              </div>
              <div className="mode-content">
                <h3>Use System Words</h3>
                <p>Play with pre-made word lists</p>
              </div>
              <i className="fas fa-arrow-right"></i>
            </button>

            <button
              className="mode-button custom-mode"
              onClick={() => {
                setGameMode('custom');
                setError('');
                setDifficulty(null);
              }}
            >
              <div className="mode-icon">
                <i className="fas fa-edit"></i>
              </div>
              <div className="mode-content">
                <h3>Custom Words</h3>
                <p>Add your own words to play</p>
              </div>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        ) : gameMode === 'system' && difficulty === null ? (
          <div className="difficulty-selection">
            <h2>
              <i className="fas fa-level-up-alt"></i> Select Difficulty
            </h2>

            <div className="difficulty-grid">
              <button
                className="difficulty-button easy"
                onClick={() => handleSystemWords('easy')}
              >
                <div className="difficulty-icon">
                  <i className="fas fa-leaf"></i>
                </div>
                <h3>Easy</h3>
                <p>Short & simple words</p>
                <span className="word-count">25 words</span>
              </button>

              <button
                className="difficulty-button normal"
                onClick={() => handleSystemWords('normal')}
              >
                <div className="difficulty-icon">
                  <i className="fas fa-star"></i>
                </div>
                <h3>Normal</h3>
                <p>Medium difficulty</p>
                <span className="word-count">25 words</span>
              </button>

              <button
                className="difficulty-button hard"
                onClick={() => handleSystemWords('hard')}
              >
                <div className="difficulty-icon">
                  <i className="fas fa-fire"></i>
                </div>
                <h3>Hard</h3>
                <p>Long & complex words</p>
                <span className="word-count">25 words</span>
              </button>
            </div>

            <button
              className="back-button"
              onClick={() => {
                setGameMode(null);
                setError('');
              }}
            >
              <i className="fas fa-chevron-left"></i> Back
            </button>
          </div>
        ) : gameMode === 'custom' ? (
          <div className="custom-words-section">
            <h2>
              <i className="fas fa-pencil-alt"></i> Enter Your Words
            </h2>

            <p className="custom-instructions">
              Enter words separated by commas (e.g., apple, banana, cherry, dragon, elephant)
            </p>

            <textarea
              className="custom-input"
              value={customWords}
              onChange={(e) => {
                setCustomWords(e.target.value);
                setError('');
              }}
              placeholder="Enter your words here..."
              rows="6"
            />

            {error && <div className="error-message">{error}</div>}

            <div className="custom-stats">
              <span className="word-counter">
                Words: <strong>{customWords.split(',').filter(w => w.trim().length > 0).length}</strong>
              </span>
              <span className="char-counter">
                Characters: <strong>{customWords.length}</strong>
              </span>
            </div>

            <div className="button-group">
              <button
                className="submit-button"
                onClick={handleCustomWords}
                disabled={!customWords.trim()}
              >
                <i className="fas fa-play"></i> Start Game
              </button>
              <button
                className="back-button"
                onClick={() => {
                  setGameMode(null);
                  setCustomWords('');
                  setError('');
                }}
              >
                <i className="fas fa-chevron-left"></i> Back
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StartScreen;
