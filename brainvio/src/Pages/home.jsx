import Logo from "../Components/LoginLogo.jsx";
import '../index.css'
import React from 'react';
import ButtonLogin from "../Components/ButtonLogin.jsx";
import ButtonSign from '../Components/ButtonSignUp.jsx'
import ButtonToggle from '../Components/ButtonToggle.jsx'
import { useTheme } from '../utils/themeHelper';
import { MindfulnessIcon, SelfCareIcon, ReflectionIcon } from '../Components/Icons';

function Home(){
    const { isDarkMode, toggleMode } = useTheme();

    const tips = [
        { icon: <MindfulnessIcon />, title: 'Mindfulness', desc: 'Take a moment to breathe' },
        { icon: <SelfCareIcon />, title: 'Self-Care', desc: 'Prioritize your wellness' },
        { icon: <ReflectionIcon />, title: 'Reflection', desc: 'Understand your emotions' }
    ];

    return (
        <div className="container" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'2rem', padding:'2rem', minHeight:'100vh', background:'linear-gradient(135deg, rgba(10,132,255,0.05) 0%, rgba(10,132,255,0.02) 100%)'}}>
            <div style={{maxWidth:'700px', width:'100%'}}>
                {/* Header */}
                <div style={{textAlign:'center', marginBottom:'2rem'}}>
                    <Logo />
                    <p style={{fontSize:'1.1rem', color:'var(--muted)', textAlign:'center', marginTop:'1rem'}}>
                        Your personal companion for mental health and wellness
                    </p>
                </div>

                {/* CTA Buttons */}
                <div style={{display:'flex', gap:'1rem', flexWrap:'wrap', justifyContent:'center', marginBottom:'3rem'}}>
                    <ButtonLogin />
                    <ButtonSign />
                </div>

                {/* Tips Section */}
                <div style={{marginBottom:'2rem'}}>
                    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))', gap:'1rem'}}>
                        {tips.map((tip, i) => (
                            <div key={i} style={{
                                padding:'1.5rem',
                                borderRadius:'12px',
                                background:'var(--surface)',
                                textAlign:'center',
                                border:'1px solid rgba(0,0,0,0.05)',
                                transition:'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{fontSize:'2rem', marginBottom:'0.5rem', color:'var(--accent)'}}>
                                    {tip.icon}
                                </div>
                                <h4 style={{margin:'0.5rem 0', fontWeight:600}}>{tip.title}</h4>
                                <p style={{margin:'0.5rem 0', fontSize:'0.9rem', color:'var(--muted)'}}>{tip.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div style={{
                    padding:'2rem',
                    borderRadius:'14px',
                    background:'var(--surface)',
                    border:'1px solid rgba(0,0,0,0.05)',
                    textAlign:'center'
                }}>
                    <h3 style={{margin:'0 0 0.75rem', color:'var(--text)'}}>Ready to begin your wellness journey?</h3>
                    <p style={{color:'var(--muted)', marginBottom:'1.5rem', fontSize:'0.95rem'}}>Join thousands improving their mental health today</p>
                    <ButtonSign />
                </div>
            </div>

            <ButtonToggle isDarkMode={isDarkMode} toggleMode={toggleMode} />
        </div>
    );
}

export default Home