import React from 'react';

export default function CrisisSupport() {
    const resources = [
        { name: 'National Suicide Prevention Lifeline', phone: '988', available: '24/7', type: 'Phone' },
        { name: 'Crisis Text Line', phone: 'Text HOME to 741741', available: '24/7', type: 'SMS' },
        { name: 'International Association for Suicide Prevention', phone: 'https://www.iasp.info', available: '24/7', type: 'Online' },
        { name: 'NAMI Helpline', phone: '1-800-950-NAMI', available: 'M-F 10am-10pm', type: 'Phone' }
    ];

    return (
        <div>
            <h2>🆘 Crisis Support</h2>
            <p className="muted-small">Immediate help and support when you need it most.</p>
            
            <div style={{marginTop:'1.5rem', padding:'1.25rem', borderRadius:'10px', background:'rgba(239,68,68,0.08)', border:'2px solid rgba(239,68,68,0.2)'}}>
                <h4 style={{margin:'0 0 0.75rem', color:'#dc2626'}}>If you're in immediate danger, call 911 or your local emergency number.</h4>
                <p className="muted-small" style={{margin:0}}>You are not alone. Help is available 24/7.</p>
            </div>

            <div style={{marginTop:'1.5rem'}}>
                <h4>Emergency Resources</h4>
                {resources.map((res, i) => (
                    <div key={i} style={{marginBottom:'1rem', padding:'1rem', borderRadius:'10px', background:'var(--surface)', border:'1px solid rgba(0,0,0,0.04)'}}>
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
                            <div>
                                <h5 style={{margin:'0 0 0.25rem'}}>{res.name}</h5>
                                <p className="muted-small" style={{margin:'0.25rem 0'}}>{res.phone}</p>
                                <span style={{fontSize:'0.8rem', color:'var(--muted)'}}>{res.available} • {res.type}</span>
                            </div>
                            <button className="btn-primary" style={{padding:'8px 16px', fontSize:'0.9rem'}}>Contact</button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{marginTop:'1.5rem', padding:'1rem', borderRadius:'10px', background:'rgba(34,197,94,0.05)', border:'1px solid rgba(34,197,94,0.1)'}}>
                <p className="muted-small" style={{margin:0}}>💚 Your life matters. Reach out to someone you trust or contact one of these resources today.</p>
            </div>
        </div>
    );
}
