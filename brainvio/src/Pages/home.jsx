import Logo from "../Components/LoginLogo.jsx";
import '../index.css'
import React, { useState,useEffect } from 'react';
import ButtonLogin from "../Components/ButtonLogin.jsx";
import ButtonSign from '../Components/ButtonSignUp.jsx'
import ButtonToggle from '../Components/ButtonToggle.jsx'

function Home(){
    const [isDarkMode, setIsDarkMode] = useState(true);

  // Change body background to cover whole page
    useEffect(() => {
        document.body.style.backgroundColor = isDarkMode ? '#0f0f1a' : '#ffffffff';
    }, [isDarkMode]);

    const toggleMode = () => setIsDarkMode(!isDarkMode);

    return (
        <div className={isDarkMode ? "dark-mode container" : "light-mode container"}>
        <Logo></Logo>
        <div className="buttons">
            <ButtonLogin></ButtonLogin>
            <ButtonSign></ButtonSign>
        </div>
        <ButtonToggle isDarkMode={isDarkMode} toggleMode={toggleMode} />
        </div>
    );
}

export default Home