import React, { useContext } from 'react';
import { UserContext } from './UsersPage';

export default function DashboardOverview() {
    const { userData, setIsJournalOpen } = useContext(UserContext);

    return (
        <div>
            <div className="greeting-card">
                <div className="greeting-text">
                    <span className="greeting-emoji">✨</span>
                    <div>
                        <div className="greeting-main">
                            Welcome back, {userData?.firstName ? userData.firstName.charAt(0).toUpperCase() + userData.firstName.slice(1).toLowerCase() : userData?.username ? userData.username.charAt(0).toUpperCase() + userData.username.slice(1).toLowerCase() : ''}!
                        </div>
                        <div className="greeting-sub">You're doing great. Let's reflect today.</div>
                    </div>
                </div>
            </div>

            <div className="welcome-card mb-1">
                <div className="welcome-actions">
                    <div>
                        <h3>Welcome back{userData ? `, ${userData.firstName ? userData.firstName.charAt(0).toUpperCase() + userData.firstName.slice(1).toLowerCase() : userData.username.charAt(0).toUpperCase() + userData.username.slice(1).toLowerCase()}` : ''}.</h3>
                        <p className="muted-small">Here's your wellness dashboard. Start by opening your journal.</p>
                    </div>
                    <div>
                        <button className="btn-primary" onClick={() => setIsJournalOpen(true)}>New Entry</button>
                    </div>
                </div>
            </div>

            <div className="grid">
                <div className="card">
                    <h4>Quick Actions</h4>
                    <p className="muted-small">Create a new journal entry, track a mood, or log an activity.</p>
                </div>
                <div className="card">
                    <h4>Recent</h4>
                    <p className="muted-small">No recent entries yet — your journal will appear here.</p>
                </div>
                <div className="card">
                    <h4>Stats</h4>
                    <p className="muted-small">Mood trends and insights will appear here.</p>
                </div>
            </div>
        </div>
    );
}
