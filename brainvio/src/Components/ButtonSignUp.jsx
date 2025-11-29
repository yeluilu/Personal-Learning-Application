import { Link } from 'react-router-dom';


// Sign up button
function ButtonSign(){
    return(
        <Link to = "/signup">
            <button className = "signup">Sign Up</button>
        </Link>
    );
}

export default ButtonSign