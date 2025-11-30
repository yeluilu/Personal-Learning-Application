import React, { useState, useEffect } from 'react';

export default function DashboardJournal() {
    const [entries, setEntries] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newEntry, setNewEntry] = useState({
        title: '',
        mood: 'Neutral',
        content: ''
    });

    // Fetch entries on component mount
    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://127.0.0.1:8000/users/me/journal', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setEntries(data);
            }
        } catch (error) {
            console.error('Error fetching entries:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!newEntry.title.trim() || !newEntry.content.trim()) return;
        
        try {
            const token = localStorage.getItem('authToken');
            const entry = {
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                mood: newEntry.mood,
                title: newEntry.title,
                content: newEntry.content
            };
            
            const response = await fetch('http://127.0.0.1:8000/users/me/journal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(entry)
            });
            
            if (response.ok) {
                await fetchEntries(); // Refresh entries
                setNewEntry({ title: '', mood: 'Neutral', content: '' });
                setIsCreating(false);
            }
        } catch (error) {
            console.error('Error creating entry:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://127.0.0.1:8000/users/me/journal/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                setEntries(entries.filter(entry => entry.id !== id));
            }
        } catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    const moodColors = {
        'Happy': '#10b981',
        'Calm': '#3b82f6',
        'Neutral': '#6b7280',
        'Anxious': '#f59e0b',
        'Sad': '#8b5cf6'
    };

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h2 style={{ margin: 0, fontSize: '2rem' }}>Journal</h2>
                <p className="muted-small" style={{ margin: '0.5rem 0 1.5rem 0' }}>
                    Reflect on your thoughts and emotions
                </p>
                {!isCreating && (
                    <button className="btn-primary" onClick={() => setIsCreating(true)}>
                        New Entry
                    </button>
                )}
            </div>

            {/* Create New Entry Form */}
            {isCreating && (
                <div style={{
                    maxWidth: '700px',
                    margin: '0 auto 2rem',
                    padding: '2rem',
                    borderRadius: '16px',
                    background: 'var(--surface)',
                    border: '1px solid rgba(0,0,0,0.04)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                }}>
                    <h3 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.5rem' }}>New Entry</h3>
                    
                    <input
                        type="text"
                        placeholder="Title your entry..."
                        value={newEntry.title}
                        onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            marginBottom: '1rem',
                            borderRadius: '10px',
                            border: 'none',
                            background: 'var(--bg)',
                            color: 'var(--text)',
                            fontSize: '1.1rem',
                            fontWeight: 500,
                            outline: 'none',
                            transition: 'box-shadow 0.2s ease'
                        }}
                        onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(10,132,255,0.1)'}
                        onBlur={(e) => e.target.style.boxShadow = 'none'}
                    />

                    <div style={{ 
                        display: 'flex', 
                        gap: '0.5rem', 
                        marginBottom: '1rem',
                        flexWrap: 'wrap'
                    }}>
                        {['Happy', 'Calm', 'Neutral', 'Anxious', 'Sad'].map(mood => (
                            <button
                                key={mood}
                                onClick={() => setNewEntry({ ...newEntry, mood })}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '999px',
                                    border: 'none',
                                    background: newEntry.mood === mood ? moodColors[mood] : 'var(--bg)',
                                    color: newEntry.mood === mood ? '#fff' : 'var(--text)',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    opacity: newEntry.mood === mood ? 1 : 0.6
                                }}
                                onMouseEnter={(e) => e.target.style.opacity = '1'}
                                onMouseLeave={(e) => e.target.style.opacity = newEntry.mood === mood ? '1' : '0.6'}
                            >
                                {mood}
                            </button>
                        ))}
                    </div>

                    <textarea
                        placeholder="What's on your mind?"
                        value={newEntry.content}
                        onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                        rows={8}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            marginBottom: '1.5rem',
                            borderRadius: '10px',
                            border: 'none',
                            background: 'var(--bg)',
                            color: 'var(--text)',
                            fontSize: '1rem',
                            lineHeight: '1.6',
                            resize: 'vertical',
                            fontFamily: 'inherit',
                            outline: 'none',
                            transition: 'box-shadow 0.2s ease'
                        }}
                        onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(10,132,255,0.1)'}
                        onBlur={(e) => e.target.style.boxShadow = 'none'}
                    />

                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                        <button 
                            className="btn-ghost" 
                            onClick={() => {
                                setIsCreating(false);
                                setNewEntry({ title: '', mood: 'Neutral', content: '' });
                            }}
                        >
                            Cancel
                        </button>
                        <button className="btn-primary" onClick={handleCreate}>
                            Save Entry
                        </button>
                    </div>
                </div>
            )}

            {/* Journal Entries List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted)' }}>
                        Loading your entries...
                    </div>
                ) : entries.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '3rem 1rem',
                        color: 'var(--muted)'
                    }}>
                        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No journal entries yet</p>
                        <p style={{ fontSize: '0.9rem' }}>Start writing to track your thoughts and feelings</p>
                    </div>
                ) : (
                    entries.map((entry) => (
                        <div
                            key={entry.id}
                            style={{
                                padding: '1.5rem',
                                borderRadius: '12px',
                                background: 'var(--surface)',
                                border: '1px solid rgba(0,0,0,0.06)',
                                boxShadow: 'var(--shadow-1)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-1)';
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                        <span
                                            style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '999px',
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                                background: moodColors[entry.mood] + '20',
                                                color: moodColors[entry.mood]
                                            }}
                                        >
                                            {entry.mood}
                                        </span>
                                        <span className="muted-small">{entry.date}</span>
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{entry.title}</h3>
                                </div>
                                <button
                                    className="btn-ghost"
                                    onClick={() => handleDelete(entry.id)}
                                    style={{ padding: '0.5rem', minWidth: 'auto' }}
                                >
                                    ✕
                                </button>
                            </div>
                            <p style={{ margin: 0, lineHeight: '1.6', color: 'var(--text)' }}>
                                {entry.content}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
