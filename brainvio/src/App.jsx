import Header from './Header.jsx'
import Button from './Button.jsx'
import './index.css'
import React, { useState,useEffect } from 'react';



function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Change body background to cover whole page
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#0f0f1a' : '#f5f5f5';
  }, [isDarkMode]);

  const toggleMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={isDarkMode ? "dark-mode container" : "light-mode container"}>
      <h1 className="logo">Brainvio</h1>
      <div className="buttons">
        <button className="login">Login</button>
        <button className="signup">Sign Up</button>
      </div>
      <button className="toggle" onClick={toggleMode}>
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );
}

export default App;
