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
        if (userText.toLowerCase().includes('stress')) {
            return 'I understand stress can feel overwhelming. Remember, it\'s okay to take breaks and reach out to a professional therapist if you need more support. What specific situation is causing you stress?';
        }
        if (userText.toLowerCase().includes('anx')) {
            return 'Anxiety can be really challenging. Have you tried any grounding exercises? I\'d recommend speaking with a mental health professional who can provide personalized strategies. Would you like to talk more about what\'s making you anxious?';
        }
        if (userText.toLowerCase().includes('sad')) {
            return 'I hear you, and your feelings are valid. Sometimes talking to a therapist can really help work through these emotions. What do you think might help you feel better right now?';
        }
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
        <div className="ai-chat-container">
            <div ref={scrollRef} className="ai-messages-container">
                {messages.map(msg => (
                    <div key={msg.id} className={`ai-message-row ${msg.type}`}>
                        {msg.type === 'ai' && (
                            <div className="ai-avatar ai">AI</div>
                        )}
                        <div className={`ai-message-content ${msg.type}`}>
                            {msg.text}
                        </div>
                        {msg.type === 'user' && (
                            <div className="ai-avatar user">You</div>
                        )}
                    </div>
                ))}
                
                {isTyping && (
                    <div className="ai-message-row ai">
                        <div className="ai-avatar ai">AI</div>
                        <div className="ai-typing-indicator">
                            <span className="ai-typing-dot"></span>
                            <span className="ai-typing-dot"></span>
                            <span className="ai-typing-dot"></span>
                        </div>
                    </div>
                )}
            </div>

            <div className="ai-input-container">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="ai-input-form">
                    <textarea
                        className="ai-input-textarea"
                        placeholder="Message AI Buddy..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={1}
                    />
                    <button type="submit" disabled={!input.trim()} className="ai-send-button">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"/>
                            <polygon points="22 2 15 22 11 13 2 9"/>
                        </svg>
                    </button>
                </form>
                <p className="ai-disclaimer">
                    AI Buddy can make mistakes. Consider checking important information and always consult a licensed therapist for mental health support.
                </p>
            </div>
        </div>
    );
}
