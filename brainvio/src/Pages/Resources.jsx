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
            
            <div className="resources-list">
                {resources.map((res, i) => (
                    <div key={i} className="resource-item">
                        <div>
                            <span className="resource-type">{res.type}</span>
                            <h4 className="resource-title">{res.title}</h4>
                            <span className="muted-small">{res.date}</span>
                        </div>
                        <button className="btn-ghost">Read</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
