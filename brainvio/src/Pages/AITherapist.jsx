import React, { useState } from 'react';

export default function AITherapist() {
    const [messages, setMessages] = useState([
        { id: 1, type: 'ai', text: 'Hello! I\'m your AI Therapist. How are you feeling today?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { id: messages.length + 1, type: 'user', text: input }]);
            // Simulate AI response
            setTimeout(() => {
                setMessages(prev => [...prev, { id: prev.length + 1, type: 'ai', text: 'I understand. Tell me more about that...' }]);
            }, 500);
            setInput('');
        }
    };

    return (
        <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
            <h2>AI Therapist</h2>
            <p className="muted-small">Chat with your personal AI therapist for support and guidance.</p>
            
            <div style={{flex:1, overflowY:'auto', marginTop:'1.5rem', marginBottom:'1rem', padding:'1rem', background:'var(--surface)', borderRadius:'10px', border:'1px solid rgba(0,0,0,0.04)'}}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{marginBottom:'1rem', textAlign: msg.type === 'user' ? 'right' : 'left'}}>
                        <div style={{
                            display:'inline-block',
                            maxWidth:'70%',
                            padding:'0.75rem 1rem',
                            borderRadius:'10px',
                            background: msg.type === 'user' ? 'var(--accent)' : 'var(--bg)',
                            color: msg.type === 'user' ? 'white' : 'var(--text)',
                            border: msg.type === 'ai' ? '1px solid rgba(0,0,0,0.04)' : 'none'
                        }}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{display:'flex', gap:'0.5rem'}}>
                <input 
                    type="text" 
                    placeholder="Share your thoughts..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    style={{flex:1}}
                />
                <button className="btn-primary" onClick={handleSend} style={{padding:'0.75rem 1.5rem'}}>Send</button>
            </div>
        </div>
    );
}
