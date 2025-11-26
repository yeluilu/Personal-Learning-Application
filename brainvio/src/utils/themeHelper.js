import React from 'react';

// Helper to apply theme to document root
export const applyTheme = (isDarkMode) => {
    const root = document.documentElement;
    if (isDarkMode) {
        root.classList.add('dark-mode');
        root.classList.remove('light-mode');
    } else {
        root.classList.add('light-mode');
        root.classList.remove('dark-mode');
    }
};

// Get saved theme from localStorage or default to dark
export const getSavedTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved === null) {
        return true; // default to dark mode
    }
    return saved === 'dark';
};

// Save theme to localStorage
export const saveTheme = (isDarkMode) => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
};

// Hook to initialize and manage theme
export const useTheme = () => {
    const [isDarkMode, setIsDarkMode] = React.useState(() => getSavedTheme());

    React.useEffect(() => {
        applyTheme(isDarkMode);
    }, [isDarkMode]);

    React.useEffect(() => {
        saveTheme(isDarkMode);
    }, [isDarkMode]);

    const toggleMode = () => setIsDarkMode(!isDarkMode);
    return { isDarkMode, toggleMode };
};
