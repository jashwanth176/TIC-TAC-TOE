import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './ThemeContext';
import Game from "./Game"
import Signup from "./Signup"
import Login from "./Login"
import About from "./About"
import Rules from "./Rules"
import Contact from "./Contact"

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Game/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/rules" element={<Rules/>} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
