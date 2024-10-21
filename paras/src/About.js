import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const About = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`about ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>About Tic Tac Toe</h1>
      <p>This is a simple Tic Tac Toe game built with React. It features multiple game modes and a theme switcher.</p>
    </div>
  );
};

export default About;
