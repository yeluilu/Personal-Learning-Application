import React from 'react';

export default function ProfessionalSupport() {
    const therapists = [
        { name: 'Dr. Sarah Johnson', specialty: 'Anxiety & Depression', availability: 'Available' },
        { name: 'Dr. Michael Chen', specialty: 'Trauma & PTSD', availability: 'Available' },
        { name: 'Dr. Emily Rodriguez', specialty: 'Family Therapy', availability: 'Busy' }
    ];

    return (
        <div>
            <h2>Professional Support</h2>
            <p className="muted-small">Connect with licensed therapists and counselors via chat, video, or voice.</p>
            
            <div style={{marginTop:'1.5rem', padding:'1rem', borderRadius:'10px', background:'rgba(10,132,255,0.05)', border:'1px solid rgba(10,132,255,0.1)', marginBottom:'1.5rem'}}>
                <h4 style={{marginTop:0}}>Available Support Methods</h4>
                <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(120px, 1fr))', gap:'0.75rem'}}>
                    <button className="btn-primary" style={{padding:'10px', fontSize:'0.9rem'}}>💬 Chat</button>
                    <button className="btn-primary" style={{padding:'10px', fontSize:'0.9rem'}}>📹 Video Call</button>
                    <button className="btn-primary" style={{padding:'10px', fontSize:'0.9rem'}}>☎️ Voice Call</button>
                </div>
            </div>

            <h4>Therapists</h4>
            {therapists.map((therapist, i) => (
                <div key={i} style={{marginBottom:'1rem', padding:'1rem', borderRadius:'10px', background:'var(--surface)', border:'1px solid rgba(0,0,0,0.04)'}}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
                        <div>
                            <h5 style={{margin:'0 0 0.25rem'}}>{therapist.name}</h5>
                            <p className="muted-small" style={{margin:0}}>{therapist.specialty}</p>
                        </div>
                        <span style={{fontSize:'0.85rem', padding:'4px 12px', borderRadius:'999px', background: therapist.availability === 'Available' ? 'rgba(34,197,94,0.1)' : 'rgba(168,85,247,0.1)', color: therapist.availability === 'Available' ? '#22c55e' : '#a855f7'}}>
                            {therapist.availability}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
