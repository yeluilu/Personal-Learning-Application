import React, { useState, useEffect, useRef } from 'react';

export default function AITherapist() {
    const [messages, setMessages] = useState([
        { id: 1, type: 'ai', text: 'Hello, I\'m CalmlyAI. What\'s on your mind today?' }
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
        // Very simple stub – could be replaced with backend call.
        if (userText.toLowerCase().includes('stress')) return 'Stress can be heavy. When did you first start feeling this way?';
        if (userText.toLowerCase().includes('anx')) return 'Anxiety often comes in waves. Can you describe the current feeling?';
        if (userText.toLowerCase().includes('sad')) return 'I hear that sadness. What do you feel you need right now?';
        return 'I\'m listening. Tell me a bit more so I can understand better.';
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
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div style={{display:'flex', flexDirection:'column', height:'100%', maxWidth:'780px'}}>
            <div style={{marginBottom:'1rem'}}>
                <h2 style={{margin:'0 0 0.5rem', letterSpacing:'-0.5px'}}>AI Therapist</h2>
                <p className="muted-small" style={{margin:0}}>Private reflective space. Your messages are not yet stored.</p>
            </div>

            <div style={{
                flex:1,
                display:'flex',
                flexDirection:'column',
                background:'var(--surface)',
                border:'1px solid rgba(0,0,0,0.06)',
                borderRadius:'16px',
                boxShadow:'var(--shadow-1)',
                overflow:'hidden'
            }}>
                <div ref={scrollRef} style={{
                    flex:1,
                    overflowY:'auto',
                    padding:'1.25rem 1.25rem 1rem'
                }}>
                    {messages.map(msg => (
                        <div key={msg.id} style={{
                            display:'flex',
                            justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                            marginBottom:'0.85rem'
                        }}>
                            <div style={{
                                maxWidth:'70%',
                                padding:'0.75rem 1rem',
                                borderRadius:'14px',
                                fontSize:'0.95rem',
                                lineHeight:1.4,
                                background: msg.type === 'user'
                                    ? 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)'
                                    : 'var(--bg)',
                                color: msg.type === 'user' ? '#fff' : 'var(--text)',
                                boxShadow: msg.type === 'user' ? '0 4px 16px rgba(10,132,255,0.25)' : '0 2px 8px rgba(0,0,0,0.05)',
                                border: msg.type === 'ai' ? '1px solid rgba(0,0,0,0.06)' : 'none'
                            }}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div style={{display:'flex', justifyContent:'flex-start', marginBottom:'0.85rem'}}>
                            <div style={{
                                padding:'0.6rem 0.9rem',
                                borderRadius:'14px',
                                background:'var(--bg)',
                                border:'1px solid rgba(0,0,0,0.06)',
                                fontSize:'0.85rem',
                                color:'var(--muted)',
                                display:'flex',
                                alignItems:'center',
                                gap:'6px'
                            }}>
                                <span style={{display:'inline-block', width:6, height:6, background:'var(--accent)', borderRadius:'50%', animation:'pulse 1.2s infinite'}}></span>
                                <span style={{display:'inline-block', width:6, height:6, background:'var(--accent)', borderRadius:'50%', animation:'pulse 1.2s 0.3s infinite'}}></span>
                                <span style={{display:'inline-block', width:6, height:6, background:'var(--accent)', borderRadius:'50%', animation:'pulse 1.2s 0.6s infinite'}}></span>
                                Thinking...
                            </div>
                        </div>
                    )}
                </div>
                <div style={{
                    borderTop:'1px solid rgba(0,0,0,0.06)',
                    padding:'0.75rem 0.9rem',
                    background:'var(--surface-2)',
                    backdropFilter:'blur(var(--glass-blur))'
                }}>
                    <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{display:'flex', gap:'0.6rem'}}>
                        <input
                            type="text"
                            placeholder="Share your thoughts..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            style={{flex:1, padding:'0.75rem 1rem'}}
                        />
                        <button type="submit" className="btn-primary" style={{display:'flex', alignItems:'center', gap:'0.4rem', padding:'0.75rem 1.2rem'}}>
                            <span>Send</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9"/></svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
