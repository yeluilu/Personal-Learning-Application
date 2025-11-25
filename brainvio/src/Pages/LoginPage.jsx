import { useState } from "react";
import { useNavigate } from "react-router-dom";



function LoginPage() {

  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { username, password };
    const params = new URLSearchParams(data);
    const response = await fetch("http://127.0.0.1:8000/login",{
      method: "POST", 
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: params.toString()
    });

    const result = await response.json();
    const token = result.access_token;
    localStorage.setItem("authToken", token);

    if(response.ok){
      console.log("Success:", result);
      navigate("/UsersPage");
    }

  };




  return (
    <div className="container">
      <h1 className="login-header">Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit" className="login">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
