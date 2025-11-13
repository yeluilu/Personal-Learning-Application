

function SignupPage(){
    return(
        <div className="container">
            <h1 className="signup-header">Sign Up</h1>
            <form className="signup-form">
                <input type="text" placeholder="Enter First Name" />
                <input type="text" placeholder="Enter Last Name" />
                <input type="email" placeholder="Enter Email" />
                <input type="text" placeholder="Enter Username" />
                <input type="password" placeholder="Enter Password" />
                <button type="submit" className="Sign Up">Sign Up</button>
            </form>
        </div>
    )
}

export default SignupPage;