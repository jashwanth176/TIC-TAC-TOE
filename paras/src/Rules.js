import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Rules = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`rules ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>Tic Tac Toe Rules</h1>
      <ul>
        <li>The game is played on a grid that's 3 squares by 3 squares.</li>
        <li>Players take turns putting their marks (X or O) in empty squares.</li>
        <li>The first player to get 3 of their marks in a row (up, down, across, or diagonally) is the winner.</li>
        <li>When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.</li>
      </ul>
    </div>
  );
};

export default Rules;
