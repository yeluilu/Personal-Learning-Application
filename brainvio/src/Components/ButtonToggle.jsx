import React from 'react';


function ButtonToggle({ isDarkMode, toggleMode }) {
  return (
    <button 
      className="theme-toggle" 
      onClick={toggleMode}
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        width: '3rem',
        height: '3rem',
        borderRadius: '50%',
        border: '2px solid var(--text)',
        background: 'var(--surface)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        transition: 'all 0.3s ease',
        zIndex: '1000'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
}

export default ButtonToggle