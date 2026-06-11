export const WORD_LISTS = {
  easy: [
    'react',
    'html',
    'css',
    'code',
    'bug',
    'loop',
    'array',
    'class',
    'data',
    'java',
    'node',
    'git',
    'api',
    'web',
    'app',
    'file',
    'link',
    'image',
    'style',
    'script',
    'function',
    'variable',
    'number',
    'string',
    'boolean'
  ],
  normal: [
    'javascript',
    'typescript',
    'python',
    'database',
    'algorithm',
    'framework',
    'library',
    'developer',
    'programming',
    'computer',
    'internet',
    'network',
    'security',
    'password',
    'variable',
    'constant',
    'operator',
    'interface',
    'protocol',
    'server',
    'client',
    'request',
    'response',
    'routing',
    'component'
  ],
  hard: [
    'asynchronous',
    'authentication',
    'authorization',
    'architecture',
    'microservices',
    'middleware',
    'deployment',
    'distributed',
    'optimization',
    'refactoring',
    'instantiation',
    'encapsulation',
    'polymorphism',
    'inheritance',
    'abstraction',
    'virtualization',
    'containerization',
    'orchestration',
    'implementation',
    'specification',
    'configuration',
    'infrastructure',
    'performance',
    'scalability',
    'compatibility'
  ]
};

export const getRandomWord = (words) => {
  return words[Math.floor(Math.random() * words.length)];
};

export const getRandomWords = (words, count = 1) => {
  const selected = [];
  const wordsCopy = [...words];
  
  for (let i = 0; i < Math.min(count, words.length); i++) {
    const randomIndex = Math.floor(Math.random() * wordsCopy.length);
    selected.push(wordsCopy[randomIndex]);
    wordsCopy.splice(randomIndex, 1);
  }
  
  return selected;
};

export const validateWord = (word) => {
  return word && word.trim().length > 0 && /^[a-z\s]+$/i.test(word);
};

export const normalizeWord = (word) => {
  return word.trim().toLowerCase();
};

export const calculateGameStats = (word, guessedLetters, wrongGuesses) => {
  const totalLetters = new Set(word.split(''));
  const correctGuesses = Array.from(guessedLetters).filter(letter =>
    word.toLowerCase().includes(letter)
  ).length;
  const incorrectGuesses = guessedLetters.size - correctGuesses;
  const revealedLetters = correctGuesses;
  const totalUniqueLetters = totalLetters.size;
  const progressPercentage = (revealedLetters / totalUniqueLetters) * 100;

  return {
    correctGuesses,
    incorrectGuesses,
    revealedLetters,
    totalUniqueLetters,
    progressPercentage: Math.round(progressPercentage),
    guessedLettersCount: guessedLetters.size
  };
};

export const getDifficultyInfo = (difficulty) => {
  const info = {
    easy: {
      maxWrongGuesses: 8,
      description: 'Perfect for beginners',
      icon: 'leaf',
      color: '#4CAF50'
    },
    normal: {
      maxWrongGuesses: 6,
      description: 'Standard difficulty',
      icon: 'star',
      color: '#FFC107'
    },
    hard: {
      maxWrongGuesses: 4,
      description: 'Challenge yourself',
      icon: 'fire',
      color: '#F44336'
    }
  };

  return info[difficulty] || info.normal;
};

export const calculateScore = (word, guessedLetters, wrongGuesses, maxWrongGuesses, difficulty) => {
  const wordLength = word.length;
  const baseScore = 100;
  const wordLengthBonus = wordLength * 10;
  const efficiencyBonus = (maxWrongGuesses - wrongGuesses) * 20;
  const difficultyMultiplier = difficulty === 'easy' ? 1 : difficulty === 'normal' ? 1.5 : difficulty === 'hard' ? 2 : 1;

  const totalScore = Math.round(
    (baseScore + wordLengthBonus + efficiencyBonus) * difficultyMultiplier
  );

  return Math.max(0, totalScore);
};

export const getHint = (word, difficulty) => {
  const hints = {
    easy: {
      javascript: 'A programming language used for web development',
      react: 'A popular JavaScript library by Facebook',
      html: 'Markup language for creating web pages',
      css: 'Used for styling web pages',
      python: 'Known for clean, readable syntax',
      database: 'Stores large amounts of data',
      algorithm: 'Step-by-step procedure for solving a problem'
    },
    normal: {
      typescript: 'JavaScript with type safety',
      asynchronous: 'Operations that don\'t block execution',
      authentication: 'Verifying user identity',
      framework: 'A structured foundation for building apps',
      microservices: 'Small, independent services'
    },
    hard: {
      asynchronous: 'Async operations allow parallel execution',
      authentication: 'Proving who you are',
      containerization: 'Packaging apps with dependencies',
      orchestration: 'Managing multiple containers',
      virtualization: 'Simulating computer hardware'
    }
  };

  return hints[difficulty]?.[word.toLowerCase()] || 'Think harder...';
};

export const formatWord = (word, guessedLetters) => {
  return word
    .split('')
    .map(letter => (guessedLetters.has(letter) ? letter : '_'))
    .join(' ');
};

export const checkGameWon = (word, guessedLetters) => {
  const wordLetters = new Set(word.toLowerCase().split(''));
  return Array.from(wordLetters).every(letter => guessedLetters.has(letter));
};

export const getEncouragingMessage = (wrongGuesses, maxWrongGuesses) => {
  const ratio = wrongGuesses / maxWrongGuesses;

  if (ratio === 0) return 'Perfect start!';
  if (ratio < 0.3) return "You're doing great!";
  if (ratio < 0.5) return 'Be careful!';
  if (ratio < 0.8) return 'Almost game over!';
  return 'Last chance!';
};
