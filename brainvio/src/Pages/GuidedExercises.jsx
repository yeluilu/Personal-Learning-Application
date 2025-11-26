import React from 'react';

export default function GuidedExercises() {
    const exercises = [
        { name: 'Breathing Techniques', description: 'Box breathing, 4-7-8 technique, and more.' },
        { name: 'Meditation', description: 'Guided mindfulness and body scan sessions.' },
        { name: 'Grounding Exercises', description: '5-4-3-2-1 technique and sensory awareness.' },
        { name: 'Progressive Relaxation', description: 'Muscle relaxation for stress relief.' }
    ];

    return (
        <div>
            <h2>Guided Self-Care Exercises</h2>
            <p className="muted-small">Meditation, mindfulness, breathing techniques, and grounding exercises.</p>
            
            <div style={{marginTop:'1.5rem', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'1rem'}}>
                {exercises.map((ex, i) => (
                    <div key={i} style={{padding:'1rem', borderRadius:'10px', background:'var(--surface)', border:'1px solid rgba(0,0,0,0.04)', boxShadow:'var(--shadow-1)'}}>
                        <h4 style={{marginTop:0}}>{ex.name}</h4>
                        <p className="muted-small">{ex.description}</p>
                        <button className="btn-primary" style={{marginTop:'0.5rem', fontSize:'0.9rem', padding:'8px 16px'}}>Start</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
