import React, { useState, useEffect, useRef } from 'react';

export default function AITherapist() {
    const [messages, setMessages] = useState([
        { id: 1, type: 'ai', text: 'Hi there! I\'m your AI Buddy. I\'m here to listen and support you. How are you feeling today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    function generateAIResponse(userText) {
        // Simple stub responses
        if (userText.toLowerCase().includes('stress')) return 'I understand stress can feel overwhelming. Remember, it\'s okay to take breaks and reach out to a professional therapist if you need more support. What specific situation is causing you stress?';
        if (userText.toLowerCase().includes('anx')) return 'Anxiety can be really challenging. Have you tried any grounding exercises? I\'d recommend speaking with a mental health professional who can provide personalized strategies. Would you like to talk more about what\'s making you anxious?';
        if (userText.toLowerCase().includes('sad')) return 'I hear you, and your feelings are valid. Sometimes talking to a therapist can really help work through these emotions. What do you think might help you feel better right now?';
        return 'I\'m here to listen. While I can offer support, please remember that speaking with a licensed therapist is always recommended for mental health concerns. Tell me more about what\'s on your mind.';
    }

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed) return;
        const userMsg = { id: Date.now(), type: 'user', text: trimmed };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);
        setTimeout(() => {
            const aiMsg = { id: Date.now() + 1, type: 'ai', text: generateAIResponse(trimmed) };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 900);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div style={{
            display:'flex',
            flexDirection:'column',
            height:'calc(100vh - 100px)',
            maxHeight:'900px',
            width:'100%',
            maxWidth:'900px',
            margin:'0 auto'
        }}>
            {/* Messages Container */}
            <div ref={scrollRef} style={{
                flex:1,
                overflowY:'auto',
                padding:'2rem 1rem',
                display:'flex',
                flexDirection:'column',
                gap:'1.5rem'
            }}>
                {messages.map(msg => (
                    <div key={msg.id} style={{
                        display:'flex',
                        gap:'1rem',
                        justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                        width:'100%'
                    }}>
                        {msg.type === 'ai' && (
                            <div style={{
                                width:'36px',
                                height:'36px',
                                borderRadius:'50%',
                                background:'linear-gradient(135deg, var(--accent), var(--accent-2))',
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center',
                                flexShrink:0,
                                color:'white',
                                fontWeight:600,
                                fontSize:'1rem'
                            }}>
                                AI
                            </div>
                        )}
                        <div style={{
                            maxWidth:'70%',
                            padding:'1rem 1.25rem',
                            borderRadius:'8px',
                            fontSize:'0.95rem',
                            lineHeight:1.6,
                            background: msg.type === 'user' ? 'var(--surface)' : 'transparent',
                            color: 'var(--text)',
                            border: msg.type === 'user' ? '1px solid rgba(0,0,0,0.06)' : 'none'
                        }}>
                            {msg.text}
                        </div>
                        {msg.type === 'user' && (
                            <div style={{
                                width:'36px',
                                height:'36px',
                                borderRadius:'50%',
                                background:'var(--muted)',
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center',
                                flexShrink:0,
                                color:'white',
                                fontWeight:600,
                                fontSize:'1rem'
                            }}>
                                You
                            </div>
                        )}
                    </div>
                ))}
                {isTyping && (
                    <div style={{display:'flex', gap:'1rem', width:'100%'}}>
                        <div style={{
                            width:'36px',
                            height:'36px',
                            borderRadius:'50%',
                            background:'linear-gradient(135deg, var(--accent), var(--accent-2))',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            flexShrink:0,
                            color:'white',
                            fontWeight:600,
                            fontSize:'1rem'
                        }}>
                            AI
                        </div>
                        <div style={{
                            padding:'1rem 1.25rem',
                            display:'flex',
                            alignItems:'center',
                            gap:'8px',
                            color:'var(--muted)',
                            fontSize:'0.9rem'
                        }}>
                            <span style={{display:'inline-block', width:8, height:8, background:'var(--muted)', borderRadius:'50%', animation:'pulse 1.4s infinite'}}></span>
                            <span style={{display:'inline-block', width:8, height:8, background:'var(--muted)', borderRadius:'50%', animation:'pulse 1.4s 0.2s infinite'}}></span>
                            <span style={{display:'inline-block', width:8, height:8, background:'var(--muted)', borderRadius:'50%', animation:'pulse 1.4s 0.4s infinite'}}></span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Container */}
            <div style={{
                borderTop:'1px solid rgba(0,0,0,0.06)',
                padding:'1.5rem 1rem',
                background:'var(--bg)',
                position:'sticky',
                bottom:0
            }}>
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{
                    maxWidth:'900px',
                    margin:'0 auto',
                    position:'relative'
                }}>
                    <textarea
                        placeholder="Message AI Buddy..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={1}
                        style={{
                            width:'100%',
                            padding:'1rem 3.5rem 1rem 1rem',
                            borderRadius:'24px',
                            border:'1px solid rgba(0,0,0,0.1)',
                            fontSize:'0.95rem',
                            lineHeight:1.5,
                            resize:'none',
                            outline:'none',
                            background:'var(--surface)',
                            color:'var(--text)',
                            minHeight:'52px',
                            maxHeight:'200px',
                            overflow:'auto',
                            fontFamily:'inherit',
                            transition:'border-color 0.2s ease',
                            boxShadow:'0 2px 8px rgba(0,0,0,0.05)'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
                    />
                    <button 
                        type="submit" 
                        disabled={!input.trim()}
                        style={{
                            position:'absolute',
                            right:'8px',
                            bottom:'8px',
                            width:'36px',
                            height:'36px',
                            borderRadius:'50%',
                            border:'none',
                            background: input.trim() ? 'var(--accent)' : 'var(--muted)',
                            color:'white',
                            cursor: input.trim() ? 'pointer' : 'not-allowed',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            transition:'all 0.2s ease',
                            opacity: input.trim() ? 1 : 0.5,
                            padding:0,
                            margin:0
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"/>
                            <polygon points="22 2 15 22 11 13 2 9"/>
                        </svg>
                    </button>
                </form>
                <p style={{
                    textAlign:'center',
                    fontSize:'0.75rem',
                    color:'var(--muted)',
                    marginTop:'0.75rem',
                    marginBottom:0
                }}>
                    AI Buddy can make mistakes. Consider checking important information and always consult a licensed therapist for mental health support.
                </p>
            </div>
        </div>
    );
}
