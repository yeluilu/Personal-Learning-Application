import React, { useState } from 'react';

export default function MoodTracking() {
    const [mood, setMood] = useState(5);
    const moods = ['😢', '😕', '😐', '🙂', '😊'];

    return (
        <div>
            <h2>Mood Tracking</h2>
            <p className="muted-small">Log your daily emotions and track patterns over time.</p>
            
            <div style={{marginTop: '1.5rem'}}>
                <h4>How are you feeling today?</h4>
                <div style={{display:'flex', gap:'1rem', justifyContent:'center', fontSize:'2rem', marginTop:'1rem'}}>
                    {moods.map((emoji, i) => (
                        <button key={i} onClick={() => setMood(i)} style={{background:'none', border:'none', cursor:'pointer', opacity: mood === i ? 1 : 0.4, transform: mood === i ? 'scale(1.3)' : 'scale(1)', transition:'all 0.2s'}}>
                            {emoji}
                        </button>
                    ))}
                </div>
                <p style={{textAlign:'center', marginTop:'1rem', color:'var(--muted)'}}>Selected: {['Very sad', 'Sad', 'Neutral', 'Good', 'Great'][mood]}</p>
            </div>

            <div style={{marginTop:'2rem', padding:'1rem', borderRadius:'10px', background:'rgba(10,132,255,0.05)', border:'1px solid rgba(10,132,255,0.1)'}}>
                <h4 style={{marginTop:0}}>Mood Chart</h4>
                <p className="muted-small">Weekly mood patterns and trends coming soon.</p>
            </div>
        </div>
    );
}
