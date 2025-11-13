import { useState } from "react";

function SignupPage(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // stop page reload

        const data = { firstName, lastName, email, username, password };

        try {
            const response = await fetch("http://127.0.0.1:8000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data) // convert JS object to JSON
            });

            const result = await response.json();
            console.log("Server response:", result);
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    return(
        <div className="container">
            <h1 className="signup-header">Sign Up</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                <input type="text" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="Sign Up">Sign Up</button>
            </form>
        </div>
    )
}

export default SignupPage;