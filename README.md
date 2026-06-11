# 🎮 Hangman Game

A fun and interactive Hangman game built with React!

## Features

✨ **Interactive Gameplay**
- Guess letters to figure out the word
- Visual hangman drawing that updates as you make wrong guesses
- Real-time feedback on correct and incorrect guesses

🎨 **Beautiful UI**
- Modern, gradient-based design
- Responsive layout that works on desktop and mobile
- Smooth animations and transitions
- Visual indicators for game status

🏆 **Game Mechanics**
- 25 different programming-themed words
- Maximum 6 wrong guesses before game over
- Win condition when all letters are guessed
- Lose condition when wrong guesses reach the limit
- Play again button to start a new game

## Installation

1. Make sure you have Node.js installed (v14 or higher)

2. Install dependencies:
```bash
npm install
```

## Running the Game

Start the development server:
```bash
npm start
```

The game will open in your browser at `http://localhost:3000`

## How to Play

1. Click on the letter buttons to make your guesses
2. Each correct guess reveals the letter in the word
3. Each wrong guess adds a part to the hangman drawing
4. Try to guess the word before the hangman drawing is complete
5. Click "Play Again" to start a new game

## Game States

- **Playing**: Click letters to guess
- **Won**: Successfully guessed all letters before running out of attempts
- **Lost**: Reached the maximum number of wrong guesses

## Building for Production

To create an optimized production build:
```bash
npm run build
```

This will generate a `build` folder with optimized files ready for deployment.

## Technologies Used

- React 18
- CSS3 (Gradients, animations, grid layout)
- JavaScript ES6+

## Word Categories

All words are related to programming and technology:
- Languages: JavaScript, React, Python
- Concepts: Algorithm, Database, Variable, Function
- Professions: Developer, Programmer
- And more!

Enjoy the game! 🎉
