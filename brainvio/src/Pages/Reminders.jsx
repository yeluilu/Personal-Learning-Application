import React, { useState } from 'react';

export default function Reminders() {
    const [reminders, setReminders] = useState([
        { id: 1, type: '📔 Journal', title: 'Daily Journaling', time: '9:00 AM', enabled: true },
        { id: 2, type: '🧘 Mindfulness', title: 'Morning Meditation', time: '6:00 AM', enabled: true },
        { id: 3, type: '💊 Medication', title: 'Take Medication', time: '8:00 PM', enabled: false },
        { id: 4, type: '⚡ Check-in', title: 'Evening Mood Check-in', time: '8:00 PM', enabled: true }
    ]);

    return (
        <div>
            <h2>Reminders & Notifications</h2>
            <p className="muted-small">Set prompts for journaling, mindfulness sessions, and medication adherence.</p>
            
            <div style={{marginTop:'1.5rem'}}>
                {reminders.map((reminder) => (
                    <div key={reminder.id} style={{marginBottom:'1rem', padding:'1rem', borderRadius:'10px', background:'var(--surface)', border:'1px solid rgba(0,0,0,0.04)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <div>
                            <span style={{fontSize:'1.5rem'}}>{reminder.type.split(' ')[0]}</span>
                            <h4 style={{margin:'0.25rem 0 0'}}>{reminder.title}</h4>
                            <span className="muted-small">{reminder.time}</span>
                        </div>
                        <label style={{cursor:'pointer', display:'flex', alignItems:'center', gap:'0.5rem'}}>
                            <input type="checkbox" checked={reminder.enabled} onChange={() => setReminders(reminders.map(r => r.id === reminder.id ? {...r, enabled: !r.enabled} : r))} />
                            <span style={{fontSize:'0.9rem'}}>{reminder.enabled ? 'On' : 'Off'}</span>
                        </label>
                    </div>
                ))}
            </div>

            <button className="btn-primary" style={{marginTop:'1.5rem'}}>+ Add Reminder</button>
        </div>
    );
}
