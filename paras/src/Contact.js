import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Contact = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`contact ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>Contact Us</h1>
      <p>If you have any questions or feedback about the game, please contact us at:</p>
      <p>Email: pearsparas@gmail.com</p>
    </div>
  );
};

export default Contact;
