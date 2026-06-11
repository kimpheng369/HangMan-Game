import React, { useState, useEffect } from 'react';
import './App.css';
import StartScreen from './components/StartScreen';
import HangmanDrawing from './components/HangmanDrawing';
import WordDisplay from './components/WordDisplay';
import Keyboard from './components/Keyboard';
import GameStatus from './components/GameStatus';
import HintButton from './components/HintButton';
import {
  WORD_LISTS,
  getRandomWord,
  getDifficultyInfo,
  calculateGameStats,
  calculateScore,
  getEncouragingMessage
} from './utils/wordUtils';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [words, setWords] = useState([]);
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);
  const [maxWrongGuesses, setMaxWrongGuesses] = useState(6);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHintNotification, setShowHintNotification] = useState(false);

  // Initialize game based on selected mode
  const initializeGame = (gameConfig) => {
    let gameWords = [];
    let difficultyLevel = gameConfig.difficulty;
    let maxWrong = 6;

    if (gameConfig.mode === 'custom') {
      gameWords = gameConfig.words;
      difficultyLevel = 'custom';
    } else if (gameConfig.mode === 'system') {
      gameWords = WORD_LISTS[gameConfig.difficulty];
      const diffInfo = getDifficultyInfo(gameConfig.difficulty);
      maxWrong = diffInfo.maxWrongGuesses;
    }

    setDifficulty(difficultyLevel);
    setWords(gameWords);
    setMaxWrongGuesses(maxWrong);
    startNewGame(gameWords);
    setGameStarted(true);
  };

  const startNewGame = (gameWords = words) => {
    const randomWord = getRandomWord(gameWords);
    setWord(randomWord);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameOver(false);
    setGameWon(false);
    setScore(0);
    setHintUsed(false);
  };

  // Check win/lose conditions
  useEffect(() => {
    if (word.length === 0 || !gameStarted || gameOver) return;

    const wordLetters = new Set(word.toLowerCase().split(''));
    const allGuessed = Array.from(wordLetters).every(letter =>
      guessedLetters.has(letter)
    );

    if (allGuessed) {
      const finalScore = calculateScore(word, guessedLetters, wrongGuesses, maxWrongGuesses, difficulty);
      setScore(finalScore);
      setGameWon(true);
      setGameOver(true);
      setGamesPlayed(prev => prev + 1);
      setGamesWon(prev => prev + 1);
      
      // Update streak
      const newStreak = streak + 1;
      setStreak(newStreak);
      
      // Show hint notification when streak reaches 3
      if (newStreak === 3) {
        setShowHintNotification(true);
      }
    } else if (wrongGuesses >= maxWrongGuesses) {
      setGameOver(true);
      setGamesPlayed(prev => prev + 1);
      setStreak(0); // Reset streak on loss
    }
  }, [guessedLetters, wrongGuesses, word, gameStarted, maxWrongGuesses, difficulty, streak, gameOver]);

  const handleGuess = (letter) => {
    if (gameOver || guessedLetters.has(letter)) return;

    const newGuessed = new Set(guessedLetters);
    newGuessed.add(letter);
    setGuessedLetters(newGuessed);

    if (!word.toLowerCase().includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const handleUseFreeHint = () => {
    if (!word || hintUsed) return;

    // Get all unguessed letters
    const unguessedLetters = word
      .toLowerCase()
      .split('')
      .filter((letter, index, arr) => arr.indexOf(letter) === index && !guessedLetters.has(letter));

    if (unguessedLetters.length > 0) {
      // Randomly select one letter to reveal
      const randomLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];
      
      // Add it to guessed letters
      const newGuessed = new Set(guessedLetters);
      newGuessed.add(randomLetter);
      setGuessedLetters(newGuessed);
      
      setHintUsed(true);
      setShowHintNotification(false);
    }
  };

  const handlePlayAgain = () => {
    startNewGame(words);
  };

  const handleBackToMenu = () => {
    setGameStarted(false);
    setDifficulty(null);
    setWords([]);
    setWord('');
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameOver(false);
    setGameWon(false);
    setScore(0);
    setGamesPlayed(0);
    setGamesWon(0);
    setStreak(0);
    setHintUsed(false);
    setShowHintNotification(false);
  };

  if (!gameStarted) {
    return <StartScreen onGameStart={initializeGame} />;
  }

  const stats = calculateGameStats(word, guessedLetters, wrongGuesses);
  const encouragingMessage = getEncouragingMessage(wrongGuesses, maxWrongGuesses);
  const hintAvailable = streak === 3 && !hintUsed && !gameOver;

  return (
    <div className="app-container">
      <div className="game-wrapper">
        <div className="header-top">
          <h1 className="title">
            <i className="fas fa-gamepad"></i> Hangman Game
          </h1>
          <button className="menu-button" onClick={handleBackToMenu}>
            <i className="fas fa-arrow-left"></i> Menu
          </button>
        </div>

        <div className="difficulty-badge">
          {difficulty === 'custom' ? (
            <>
              <i className="fas fa-edit"></i> Custom Mode
            </>
          ) : (
            <>
              <i className={`fas fa-${getDifficultyInfo(difficulty).icon}`}></i>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </>
          )}
        </div>

        {hintAvailable && (
          <div className="hint-available-banner">
            <i className="fas fa-star"></i>
            <span>🎉 Awesome! 3 Wins in a Row! Get 1 Free Letter!</span>
            <HintButton onClick={handleUseFreeHint} />
          </div>
        )}

        <div className="encouraging-message">
          <i className="fas fa-info-circle"></i> <span>{encouragingMessage}</span>
        </div>

        <div className="game-content">
          <div className="left-section">
            <HangmanDrawing wrongGuesses={wrongGuesses} maxWrong={maxWrongGuesses} />
            <div className="stats">
              <div className="stat">
                <span className="stat-icon"><i className="fas fa-times-circle"></i></span>
                <span className="stat-label">Wrong</span>
                <span className="stat-value">{wrongGuesses}/{maxWrongGuesses}</span>
              </div>
              <div className="stat">
                <span className="stat-icon"><i className="fas fa-check-circle"></i></span>
                <span className="stat-label">Correct</span>
                <span className="stat-value">{guessedLetters.size}</span>
              </div>
              <div className="stat">
                <span className="stat-icon"><i className="fas fa-chart-pie"></i></span>
                <span className="stat-label">Progress</span>
                <span className="stat-value">{stats.progressPercentage}%</span>
              </div>
            </div>

            <div className="streak-display">
              <i className="fas fa-fire"></i>
              <span className="streak-text">Win Streak: <strong>{streak}</strong></span>
            </div>

            {gameOver && gameWon && (
              <div className="score-display">
                <i className="fas fa-star"></i> Score: <strong>{score}</strong>
              </div>
            )}
          </div>

          <div className="right-section">
            <WordDisplay word={word} guessedLetters={guessedLetters} />

            {gameOver && (
              <GameStatus gameWon={gameWon} word={word} onRestart={handlePlayAgain} />
            )}

            {!gameOver && (
              <Keyboard
                onGuess={handleGuess}
                guessedLetters={guessedLetters}
              />
            )}

            {gameOver && (
              <div className="end-game-buttons">
                <button className="restart-button" onClick={handlePlayAgain}>
                  <i className="fas fa-redo"></i> Play Again
                </button>
                <button className="menu-button-secondary" onClick={handleBackToMenu}>
                  <i className="fas fa-arrow-left"></i> Back to Menu
                </button>
              </div>
            )}
          </div>
        </div>

        {gameStarted && (
          <div className="game-stats-footer">
            <div className="footer-stat">
              <i className="fas fa-gamepad"></i> Games Played: <strong>{gamesPlayed}</strong>
            </div>
            <div className="footer-stat">
              <i className="fas fa-trophy"></i> Wins: <strong>{gamesWon}</strong>
            </div>
            <div className="footer-stat">
              <i className="fas fa-percent"></i> Win Rate: <strong>{gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0}%</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
