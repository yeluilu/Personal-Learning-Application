import { useState } from "react";
import { useNavigate } from "react-router-dom";



function LoginPage() {

  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };
    const response = await fetch("http://127.0.0.1:8000/users/login",{
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if(response.ok){
      console.log("Success:", result);
      navigate("/UsersPage", { state: { user: result.user } });
    }

  };




  return (
    <div className="container">
      <h1 className="login-header">Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit" className="login">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
