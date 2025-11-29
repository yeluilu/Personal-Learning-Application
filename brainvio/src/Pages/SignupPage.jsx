import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { applyTheme, getSavedTheme } from "../utils/themeHelper";

function SignupPage(){
    useEffect(() => {
        applyTheme(getSavedTheme());
    }, []);

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (!firstName || !lastName || !email || !username || !password) {
            setError("All fields are required");
            setIsLoading(false);
            return;
        }

        const data = { firstName, lastName, email, username, password };

        try {
            const response = await fetch("http://127.0.0.1:8000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            const token = result.access_token;
            if (response.ok){
                console.log("Success:", result);
                localStorage.setItem("authToken", token);
                navigate("/users/me", { state: { user: result } });
            }
            else{
                setError(result.detail || "Signup failed. Please try again.");
                console.error("Signup failed:", result);
            }
        } catch (error) {
            setError("Connection error. Please try again.");
            console.error("Error sending data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div className="container" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'100vh', padding:'2rem'}}>
            <div style={{width:'100%', maxWidth:'500px', animation: 'fadeIn 0.6s ease'}}>
                {/* Header */}
                <div style={{textAlign:'center', marginBottom:'2rem'}}>
                    <div style={{fontSize:'2.5rem', marginBottom:'1rem'}}>✨</div>
                    <h1 className="signup-header" style={{marginBottom:'0.5rem'}}>Join CalmlyAI</h1>
                    <p style={{color:'var(--muted)', marginBottom:'1.5rem'}}>Start your mental wellness journey today</p>
                </div>

                {/* Form */}
                <form className="signup-form" onSubmit={handleSubmit} style={{width:'100%'}}>
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

                    {/* Name Fields */}
                    <div style={{display:'flex', flexDirection:'column', gap:'1rem', marginBottom:'1rem', width:'100%'}}>
                        <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
                            <label style={{display:'block', fontSize:'0.9rem', fontWeight:500, marginBottom:'0.5rem'}}>First Name</label>
                            <input 
                                type="text" 
                                placeholder="First name" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)}
                                disabled={isLoading}
                                style={{width:'100%', opacity: isLoading ? 0.6 : 1, boxSizing:'border-box'}}
                            />
                        </div>
                        <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
                            <label style={{display:'block', fontSize:'0.9rem', fontWeight:500, marginBottom:'0.5rem'}}>Last Name</label>
                            <input 
                                type="text" 
                                placeholder="Last name" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)}
                                disabled={isLoading}
                                style={{width:'100%', opacity: isLoading ? 0.6 : 1, boxSizing:'border-box'}}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div style={{marginBottom:'1rem'}}>
                        <label style={{display:'block', fontSize:'0.9rem', fontWeight:500, marginBottom:'0.5rem'}}>Email</label>
                        <input 
                            type="email" 
                            placeholder="your@email.com" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            style={{opacity: isLoading ? 0.6 : 1}}
                        />
                    </div>

                    {/* Username */}
                    <div style={{marginBottom:'1rem'}}>
                        <label style={{display:'block', fontSize:'0.9rem', fontWeight:500, marginBottom:'0.5rem'}}>Username</label>
                        <input 
                            type="text" 
                            placeholder="Choose a username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isLoading}
                            style={{opacity: isLoading ? 0.6 : 1}}
                        />
                    </div>

                    {/* Password */}
                    <div style={{marginBottom:'1.5rem'}}>
                        <label style={{display:'block', fontSize:'0.9rem', fontWeight:500, marginBottom:'0.5rem'}}>Password</label>
                        <input 
                            type="password" 
                            placeholder="Create a strong password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            style={{opacity: isLoading ? 0.6 : 1}}
                        />
                    </div>

                    <button type="submit" className="btn-primary" style={{width:'100%', opacity: isLoading ? 0.7 : 1}} disabled={isLoading}>
                        {isLoading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                {/* Footer */}
                <div style={{textAlign:'center', marginTop:'1.5rem'}}>
                    <p style={{fontSize:'0.95rem', color:'var(--muted)', marginBottom:'0.75rem'}}>Already have an account?</p>
                    <Link to="/login" style={{
                        color:'var(--accent)',
                        textDecoration:'none',
                        fontWeight:500,
                        transition:'color 0.2s ease',
                        borderBottom:'1px solid transparent'
                    }}
                    onMouseEnter={(e) => e.target.style.borderBottomColor = 'var(--accent)'}
                    onMouseLeave={(e) => e.target.style.borderBottomColor = 'transparent'}
                    >
                        Sign in here
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;