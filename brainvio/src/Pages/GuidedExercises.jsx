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
            
            <div className="exercises-grid">
                {exercises.map((ex, i) => (
                    <div key={i} className="exercise-card">
                        <h4>{ex.name}</h4>
                        <p className="muted-small">{ex.description}</p>
                        <button className="btn-primary">Start</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
