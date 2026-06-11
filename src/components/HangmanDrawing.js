import React from 'react';
import './HangmanDrawing.css';

const HangmanDrawing = ({ wrongGuesses, maxWrong }) => {
  // Define all possible body parts in order
  const bodyParts = [
    <circle key="head" cx="130" cy="80" r="30" stroke="#333" strokeWidth="2" fill="none" />,
    <line key="body" x1="130" y1="110" x2="130" y2="160" stroke="#333" strokeWidth="2" />,
    <line key="leftArm" x1="130" y1="125" x2="90" y2="110" stroke="#333" strokeWidth="2" />,
    <line key="rightArm" x1="130" y1="125" x2="170" y2="110" stroke="#333" strokeWidth="2" />,
    <line key="leftLeg" x1="130" y1="160" x2="100" y2="190" stroke="#333" strokeWidth="2" />,
    <line key="rightLeg" x1="130" y1="160" x2="160" y2="190" stroke="#333" strokeWidth="2" />
  ];

  const getVisiblePartsCount = () => {
    if (wrongGuesses === 0) return 0;
    if (wrongGuesses >= maxWrong) return bodyParts.length;
    
    // Scale the parts linearly based on progress
    return Math.floor((wrongGuesses / maxWrong) * bodyParts.length);
  };

  const visiblePartsCount = getVisiblePartsCount();

  return (
    <div className="hangman-container">
      <svg width="250" height="250" viewBox="0 0 250 250">
        {/* Gallows */}
        <line x1="20" y1="230" x2="130" y2="230" stroke="#333" strokeWidth="3" />
        <line x1="50" y1="230" x2="50" y2="20" stroke="#333" strokeWidth="3" />
        <line x1="50" y1="20" x2="130" y2="20" stroke="#333" strokeWidth="3" />
        <line x1="130" y1="20" x2="130" y2="50" stroke="#333" strokeWidth="2" />

        {/* Draw body parts */}
        {bodyParts.slice(0, visiblePartsCount)}
      </svg>

      {/* Progress indicator */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${(wrongGuesses / maxWrong) * 100}%`,
            backgroundColor: wrongGuesses / maxWrong < 0.5 ? '#51cf66' : wrongGuesses / maxWrong < 0.8 ? '#fcc419' : '#ff6b6b'
          }}
        />
      </div>
    </div>
  );
};

export default HangmanDrawing;
