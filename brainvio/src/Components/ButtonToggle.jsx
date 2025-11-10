import React from 'react';


function ButtonToggle({ isDarkMode, toggleMode }) {
  return (
    <button className="toggle" onClick={toggleMode}>
      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
}

export default ButtonToggle