import React from 'react';

export default function Resources() {
    return (
        <div>
            <h2>Resources & Support</h2>
            <p className="muted-small">You are not alone. Help is available.</p>
            
            {/* Crisis Support */}
            <div style={{
                padding: '1.5rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.03))',
                border: '1px solid rgba(16,185,129,0.2)',
                marginBottom: '2rem'
            }}>
                <h3 style={{marginTop: 0, color: 'var(--text)'}}>You Matter</h3>
                <p style={{fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--text)', marginBottom: '1.5rem'}}>
                    If you're going through a difficult time, please remember that you are valued and your life matters. 
                    It's okay to not be okay, and reaching out for help is a sign of strength, not weakness.
                </p>
                
                <div style={{
                    padding: '1.25rem',
                    borderRadius: '10px',
                    background: 'var(--surface)',
                    border: '1px solid rgba(0,0,0,0.06)'
                }}>
                    <h4 style={{marginTop: 0, marginBottom: '1rem'}}>Crisis Support - Available 24/7</h4>
                    
                    <div style={{marginBottom: '1rem'}}>
                        <strong style={{display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem'}}>
                            National Suicide Prevention Lifeline
                        </strong>
                        <a href="tel:988" style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: 'var(--accent)',
                            textDecoration: 'none',
                            display: 'inline-block',
                            marginBottom: '0.5rem'
                        }}>
                            988
                        </a>
                        <p className="muted-small" style={{margin: 0}}>
                            Call or text • Available 24/7 • Free and confidential
                        </p>
                    </div>
                    
                    <div style={{marginBottom: '1rem'}}>
                        <strong style={{display: 'block', marginBottom: '0.5rem'}}>
                            Crisis Text Line
                        </strong>
                        <p style={{margin: 0}}>
                            Text <strong>HELLO</strong> to <strong style={{color: 'var(--accent)'}}>741741</strong>
                        </p>
                    </div>
                    
                    <div>
                        <strong style={{display: 'block', marginBottom: '0.5rem'}}>
                            Veterans Crisis Line
                        </strong>
                        <p style={{margin: 0}}>
                            Call <a href="tel:988" style={{color: 'var(--accent)', textDecoration: 'none', fontWeight: 600}}>988</a> and press <strong>1</strong>
                        </p>
                    </div>
                </div>
            </div>

            {/* Additional Resources */}
            <div className="resources-list">
                <div className="resource-item">
                    <div>
                        <span className="resource-type">Website</span>
                        <h4 className="resource-title">SAMHSA's National Helpline</h4>
                        <p className="muted-small">1-800-662-4357 • Treatment referral and information service</p>
                    </div>
                </div>
                
                <div className="resource-item">
                    <div>
                        <span className="resource-type">Support</span>
                        <h4 className="resource-title">NAMI Helpline</h4>
                        <p className="muted-small">1-800-950-6264 • Mental health information and support</p>
                    </div>
                </div>
                
                <div className="resource-item">
                    <div>
                        <span className="resource-type">Emergency</span>
                        <h4 className="resource-title">Emergency Services</h4>
                        <p className="muted-small">Call 911 if you or someone else is in immediate danger</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
