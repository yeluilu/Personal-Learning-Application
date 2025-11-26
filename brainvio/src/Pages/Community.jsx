import React from 'react';

export default function Community() {
    const topics = [
        { title: 'Anxiety & Panic Attacks', members: 1240, posts: 3890 },
        { title: 'Depression Support', members: 2156, posts: 5420 },
        { title: 'Sleep & Insomnia', members: 856, posts: 1950 },
        { title: 'Relationships & Social', members: 670, posts: 1340 }
    ];

    return (
        <div>
            <h2>AI Therapist</h2>
            <p className="muted-small">Connect with AI, share experiences, and find support within AI.</p>
            
            <div style={{marginTop:'1.5rem', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:'1rem'}}>
                {topics.map((topic, i) => (
                    <div key={i} style={{padding:'1rem', borderRadius:'10px', background:'var(--surface)', border:'1px solid rgba(0,0,0,0.04)', cursor:'pointer', transition:'transform 0.2s', ':hover': {transform:'translateY(-2px)'}}}>
                        <h4 style={{margin:'0 0 0.5rem'}}>{topic.title}</h4>
                        <div className="muted-small">
                            <p style={{margin:'0.25rem 0'}}>👥 {topic.members} members</p>
                            <p style={{margin:'0.25rem 0'}}>💬 {topic.posts} posts</p>
                        </div>
                        <button className="btn-ghost" style={{marginTop:'0.75rem', fontSize:'0.85rem', padding:'6px 12px'}}>Join</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
