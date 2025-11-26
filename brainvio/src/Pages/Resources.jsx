import React from 'react';

export default function Resources() {
    const resources = [
        { type: '📚 Article', title: 'Understanding Anxiety Disorders', date: 'Nov 20' },
        { type: '🎥 Video', title: 'Introduction to Mindfulness', date: 'Nov 18' },
        { type: '🎙️ Podcast', title: 'Mental Health in the Workplace', date: 'Nov 15' },
        { type: '📚 Article', title: 'Sleep and Mental Health', date: 'Nov 12' }
    ];

    return (
        <div>
            <h2>Educational Resources</h2>
            <p className="muted-small">Articles, videos, and podcasts on mental health topics.</p>
            
            <div style={{marginTop:'1.5rem'}}>
                {resources.map((res, i) => (
                    <div key={i} style={{marginBottom:'1rem', padding:'1rem', borderRadius:'10px', background:'var(--surface)', border:'1px solid rgba(0,0,0,0.04)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <div>
                            <span style={{fontSize:'0.85rem', color:'var(--muted)'}}>{res.type}</span>
                            <h4 style={{margin:'0.25rem 0 0'}}>{res.title}</h4>
                            <span className="muted-small">{res.date}</span>
                        </div>
                        <button className="btn-ghost">Read</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
