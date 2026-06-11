import React from 'react';
import './HintButton.css';

const HintButton = ({ onClick }) => {
  return (
    <button className="hint-button" onClick={onClick}>
      <i className="fas fa-gift"></i> Use Free Letter
    </button>
  );
};

export default HintButton;
