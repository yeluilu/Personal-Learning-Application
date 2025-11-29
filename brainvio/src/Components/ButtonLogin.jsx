import { Link } from 'react-router-dom';

// Login Button
function ButtonLogin(){


    return(
        <Link to = "/login">
            <button className = "login">Login</button>
        </Link>
    );
}

export default ButtonLogin