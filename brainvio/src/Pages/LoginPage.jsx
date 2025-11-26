import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { applyTheme, getSavedTheme } from "../utils/themeHelper";

function LoginPage() {
  useEffect(() => {
    applyTheme(getSavedTheme());
  }, []);

  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const data = { username, password };
      const params = new URLSearchParams(data);
      const response = await fetch("http://127.0.0.1:8000/login",{
        method: "POST", 
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: params.toString()
      });

      const result = await response.json();

      if(response.ok){
        const token = result.access_token;
        localStorage.setItem("authToken", token);
        console.log("Success:", result);
        navigate("/UsersPage");
      } else {
        setError(result.detail || "Incorrect username or password");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'100vh', padding:'2rem'}}>
      <div style={{width:'100%', maxWidth:'420px', animation: 'fadeIn 0.6s ease'}}>
        {/* Header */}
        <div style={{textAlign:'center', marginBottom:'2.5rem'}}>
          <div style={{fontSize:'2.5rem', marginBottom:'1rem'}}>🔐</div>
          <h1 className="login-header" style={{marginBottom:'0.5rem'}}>Welcome Back</h1>
          <p style={{color:'var(--muted)', marginBottom:'1.5rem'}}>Sign in to continue your wellness journey</p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleLogin}>
          {error && (
            <div style={{
              padding:'0.75rem',
              borderRadius:'8px',
              background:'rgba(239,68,68,0.1)',
              color:'#dc2626',
              fontSize:'0.9rem',
              marginBottom:'1rem',
              border:'1px solid rgba(239,68,68,0.2)'
            }}>
              {error}
            </div>
          )}
          
          <div style={{marginBottom:'1rem'}}>
            <label style={{display:'block', fontSize:'0.9rem', fontWeight:500, marginBottom:'0.5rem', color:'var(--text)'}}>Username</label>
            <input 
              type="text" 
              placeholder="Enter your username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              style={{opacity: isLoading ? 0.6 : 1}}
            />
          </div>
          
          <div style={{marginBottom:'1.5rem'}}>
            <label style={{display:'block', fontSize:'0.9rem', fontWeight:500, marginBottom:'0.5rem', color:'var(--text)'}}>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              style={{opacity: isLoading ? 0.6 : 1}}
            />
          </div>
          
          <button type="submit" className="btn-primary" style={{width:'100%', opacity: isLoading ? 0.7 : 1}} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <div style={{textAlign:'center', marginTop:'1.5rem'}}>
          <p style={{fontSize:'0.95rem', color:'var(--muted)', marginBottom:'0.75rem'}}>Don't have an account?</p>
          <Link to="/SignupPage" style={{
            color:'var(--accent)',
            textDecoration:'none',
            fontWeight:500,
            transition:'color 0.2s ease',
            borderBottom:'1px solid transparent'
          }}
          onMouseEnter={(e) => e.target.style.borderBottomColor = 'var(--accent)'}
          onMouseLeave={(e) => e.target.style.borderBottomColor = 'transparent'}
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
