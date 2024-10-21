import React, { useState, useEffect } from 'react';
import './App.css'; 
import { Link } from 'react-router-dom';

const initialBoard = Array(9).fill(null);

const Game = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [theme, setTheme] = useState('system');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scorePlayerX, setScorePlayerX] = useState(0);
  const [scorePlayerO, setScorePlayerO] = useState(0);
  const [highestScorePlayerX, setHighestScorePlayerX] = useState(0);
  const [highestScorePlayerO, setHighestScorePlayerO] = useState(0);
  const [gameMode, setGameMode] = useState(null);
  
  // Handle click on a cell
  const handleCellClick = (index) => {
    if (board[index] || winner || draw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    checkWinner(newBoard, currentPlayer);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  // Check if there's a winner
  const checkWinner = (board, player) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinner(player);
        updateScoreAndHighestScore(player);
        return;
      }
    }
    if (board.every(cell => cell !== null) && !winner) {
      setDraw(true);
    }
  };

  // Update score and highest score
  const updateScoreAndHighestScore = (player) => {
    if (player === 'X') {
      const newScoreX = scorePlayerX + 1;
      setScorePlayerX(newScoreX);
      if (newScoreX > highestScorePlayerX) {
        setHighestScorePlayerX(newScoreX);
      }
    } else if (player === 'O') {
      const newScoreO = scorePlayerO + 1;
      setScorePlayerO(newScoreO);
      if (newScoreO > highestScorePlayerO) {
        setHighestScorePlayerO(newScoreO);
      }
    }
  };

  // Reset the game but keep the scores intact
  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
    setDraw(false);
  };

  // Handle theme changes
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    applyTheme(selectedTheme);
  };
 
  const applyTheme = (selectedTheme) => {
    if (selectedTheme === 'dark') {
      setIsDarkMode(true);
    } else if (selectedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemDarkMode);
    }
  };

  // Setup initial theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  // Render each cell
  const renderCell = (index) => {
    const value = board[index];
    return (
      <div className={`cell ${value ? value.toLowerCase() : ''}`} onClick={() => handleCellClick(index)}>
        {value}
      </div>
    );
  };

  // Game Mode selection
  const handleBackButton = () => {
    setGameMode(null);
    resetGame();
  };

  if (gameMode === null) {
    return (
      <div className={`app ${isDarkMode ? 'dark' : ''}`}>
        <header className="header">
          <div className="navbar-logo">
            <img src="https://www.svgrepo.com/show/143264/tic-tac-toe-game.svg" alt="Tic Tac Toe Logo" className="logo" />
            <h1 className="navbar-title">Tic Tac Toe</h1>
          </div>
          <nav className="navbar">
            <div className="navbar-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/rules" className="nav-link">Rules</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
              <Link to="/signup" className='nav-link'>Sign Up</Link>
              <Link to="/login" className='nav-link'>Log In</Link>
            </div>
          </nav>
          <div className="theme-toggle">
            <button 
              className={`theme-button ${theme === 'system' ? 'active' : ''}`} 
              onClick={() => handleThemeChange('system')}
              aria-label="System Theme"
            >
              <span role="img" aria-label="System">💻</span>
            </button>
            <button 
              className={`theme-button ${theme === 'light' ? 'active' : ''}`} 
              onClick={() => handleThemeChange('light')}
              aria-label="Light Theme"
            >
              <span role="img" aria-label="Light">☀️</span>
            </button>
            <button 
              className={`theme-button ${theme === 'dark' ? 'active' : ''}`} 
              onClick={() => handleThemeChange('dark')}
              aria-label="Dark Theme"
            >
              <span role="img" aria-label="Dark">🌙</span>
            </button>
          </div>
        </header>
        <div className="mode-selection">
          <h2>Choose Game Mode</h2>
          <button onClick={() => setGameMode('multiplayer')}>Multiplayer</button>
          <button onClick={() => setGameMode('ai')}>Play against AI</button>
        </div>
        {/* Footer Component */}
        <footer className="footer">
          <div className="footer-container">
            <p>&copy; 2024 Tic Tac Toe. All rights reserved.</p>
            <ul className="social-links">
              <li>
                <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <header className="header">
        <h1 className="title">Tic Tac Toe</h1>
      </header>

      <div className="winner-counter">
        <div className={winner === 'X' ? 'winner-highlight' : ''}>
          X Wins: {scorePlayerX}
        </div>
        <div className={winner === 'O' ? 'winner-highlight' : ''}>
          O Wins: {scorePlayerO}
        </div>
      </div>

      <button className="back-button" onClick={handleBackButton}>
        ← Back to Mode Selection
      </button>

      <div className="board">
        {board.map((cell, index) => renderCell(index))}
      </div>

      {winner && (
        <div className="winner-message">
          <p>Player {winner} wins!</p>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}

      {draw && (
        <div className="winner-message">
          <p>It's a draw!</p>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}

      {/* Footer Component */}
      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2024 Tic Tac Toe. All rights reserved.</p>
          <ul className="social-links">
            <li>
              <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Game;
