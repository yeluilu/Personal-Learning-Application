import Logo from "../Components/LoginLogo.jsx";
import '../index.css'
import React from 'react';
import ButtonLogin from "../Components/ButtonLogin.jsx";
import ButtonSign from '../Components/ButtonSignUp.jsx'
import ButtonToggle from '../Components/ButtonToggle.jsx'
import { useTheme } from '../utils/themeHelper';

function Home(){
    const { isDarkMode, toggleMode } = useTheme();

    return (
        <div className="container">
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