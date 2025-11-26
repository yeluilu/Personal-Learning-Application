import React from 'react';

export default function CBTTools() {
    const tools = [
        { name: 'Thought Journal', desc: 'Record thoughts, identify patterns, and reframe negatives.' },
        { name: 'Behavioral Activation', desc: 'Schedule activities and build momentum.' },
        { name: 'Cognitive Reframing', desc: 'Challenge distorted thinking patterns.' },
        { name: 'Exposure Logging', desc: 'Track exposure therapy progress.' }
    ];

    return (
        <div>
            <h2>CBT Tools</h2>
            <p className="muted-small">Cognitive Behavioral Therapy exercises to manage thoughts and behaviors.</p>
            
            <div style={{marginTop:'1.5rem'}}>
                {tools.map((tool, i) => (
                    <div key={i} style={{marginBottom:'1rem', padding:'1rem', borderRadius:'10px', background:'rgba(10,132,255,0.03)', border:'1px solid rgba(10,132,255,0.1)'}}>
                        <h4 style={{margin:'0 0 0.5rem'}}>{tool.name}</h4>
                        <p className="muted-small" style={{margin:0}}>{tool.desc}</p>
                    </div>
                ))}
            </div>

            <button className="btn-primary" style={{marginTop:'1rem'}}>Start New Session</button>
        </div>
    );
}
