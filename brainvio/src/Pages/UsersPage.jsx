import { useState, useEffect } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { applyTheme, getSavedTheme } from "../utils/themeHelper";
import React from 'react';
import NewJournalModal from '../Components/NewJournalModal.jsx';

function UsersPage() {
    const savedToken = localStorage.getItem("authToken");

    // ✅ Added hooks at the top — always declare hooks first, before any conditional logic
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ Added loading state
    const [error, setError] = useState(false);    // ✅ Added error state
    const [isJournalOpen, setIsJournalOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false); // collapsed by default
    const navigate = useNavigate();

    useEffect(() => {
        applyTheme(getSavedTheme());
    }, []);

    useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch("http://127.0.0.1:8000/users/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${savedToken}`
                    }
                });

                // ✅ Added check for invalid response
                if (!response.ok) {
                    throw new Error("Invalid token or network error");
                }

                const data = await response.json();
                setUserData(data);
            } catch (err) {
                console.error("Error fetching user:", err);
                setError(true);                     // ✅ Set error state if fetch fails
                localStorage.removeItem("authToken"); // ✅ Remove invalid token
            } finally {
                setLoading(false); // ✅ Stop loading regardless of success/failure
            }
        }

        if (savedToken) {
            getUser();
        } else {
            setLoading(false); // ✅ Stop loading immediately if no token
        }
    }, [savedToken]);

    // ✅ Redirect if no token or fetch failed
    if (!savedToken || error) {
        return <Navigate to="/LoginPage" />;
    }

    // ✅ Show loading message while fetching user data
    if (loading) {
        return <div>Loading user data...</div>;
    }

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/LoginPage');
    };

    return (
        <div className="container">
            <div className={`dashboard ${!isSidebarVisible ? 'collapsed' : ''}`}>
                <aside className="dashboard-sidebar">
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <div className="profile-pill mb-1">
                        <div className="avatar">{userData ? userData.username.charAt(0).toUpperCase() : 'U'}</div>
                        <div>
                            <div style={{fontWeight:700}}>{userData ? userData.username : 'No user'}</div>
                            <div className="muted-small">Member</div>
                        </div>
                        </div>
                        <div>
                            <button className="btn-ghost" onClick={() => setIsSidebarVisible(false)}>Collapse</button>
                        </div>
                    </div>

                    <nav>
                        <ul className="dashboard-nav">
                            <li>
                                <NavLink to="/UsersPage" end className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
                                    <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5z"/></svg>
                                    <span>Overview</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/UsersPage/journal" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
                                    <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM8 7h8v2H8V7zM8 11h8v2H8v-2z"/></svg>
                                    <span>Journal</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/UsersPage/progress" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
                                    <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17h3v4H3v-4zm5-6h3v10H8V11zm5-4h3v14h-3V7zm5-6h3v20h-3V1z"/></svg>
                                    <span>Progress</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/UsersPage/settings" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
                                    <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm9.4 4a7.9 7.9 0 0 0-.1-1l2.1-1.6-2-3.5-2.6.6a7.7 7.7 0 0 0-1.6-.9L15.7.9h-3.4L10.8 5c-.6.2-1.2.5-1.8.9L6.4 5.4 3.8 8.9l2.1 1.6c-.1.3-.1.6-.1 1s0 .7.1 1L3.8 14.7l2.6 3.5 2.6-.6c.5.4 1.1.7 1.8.9l1.5 4.1h3.4l1.5-4.1c.6-.2 1.1-.5 1.6-.9l2.6.6 2-3.5-2.1-1.6c.1-.3.1-.6.1-1z"/></svg>
                                    <span>Settings</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                    <div style={{marginTop: '1rem'}}>
                        <button className="btn-ghost" onClick={handleLogout}>Log out</button>
                    </div>
                </aside>

                <main className="dashboard-main">
                    {/* Hamburger button in top-right */}
                    {!isNavOpen && (
                    <div style={{position:'fixed', top:20, right:20, zIndex:1300}}>
                        <button className="sections-button" aria-expanded={isNavOpen} aria-label="Toggle navigation" onClick={() => setIsNavOpen(!isNavOpen)}>
                            <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>
                    </div>
                    )}
                    {/* Dropdown panel in top-right corner */}
                    {isNavOpen && (
                        <div className="dashboard-dropdown-panel" role="menu">
                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
                                <h4 style={{margin:0}}>Menu</h4>
                                <button className="btn-ghost" onClick={() => setIsNavOpen(false)} aria-label="Close menu" style={{padding:'4px 8px'}}>✕</button>
                            </div>
                            <nav>
                                <ul>
                                    <li style={{marginBottom:8}}><NavLink to="/UsersPage" end className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} onClick={() => setIsNavOpen(false)}>Overview</NavLink></li>
                                    <li style={{marginBottom:8}}><NavLink to="/UsersPage/journal" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} onClick={() => setIsNavOpen(false)}>Journal</NavLink></li>
                                    <li style={{marginBottom:8}}><NavLink to="/UsersPage/progress" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} onClick={() => setIsNavOpen(false)}>Progress</NavLink></li>
                                    <li style={{marginBottom:8}}><NavLink to="/UsersPage/settings" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} onClick={() => setIsNavOpen(false)}>Settings</NavLink></li>
                                </ul>
                            </nav>
                        </div>
                    )}
                    <div className="dashboard-header">
                        <h1 className="UserFirstName">{userData ? `Hello ${userData.username}` : "No user found"}</h1>
                    </div>

                    <div className="welcome-card mb-1">
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <div>
                                <h3 style={{margin:0}}>Welcome back{userData ? `, ${userData.firstName || userData.username}` : ''}.</h3>
                                <p className="muted-small" style={{margin:'6px 0 0'}}>Here's your wellness dashboard. Start by opening your journal.</p>
                            </div>
                            <div>
                                <button className="btn-primary" onClick={() => setIsJournalOpen(true)}>New Entry</button>
                            </div>
                        </div>
                    </div>

                    <div className="grid">
                        <div className="card">
                            <h4 style={{marginTop:0}}>Quick Actions</h4>
                            <p className="muted-small">Create a new journal entry, track a mood, or log an activity.</p>
                        </div>
                        <div className="card">
                            <h4 style={{marginTop:0}}>Recent</h4>
                            <p className="muted-small">No recent entries yet — your journal will appear here.</p>
                        </div>
                        <div className="card">
                            <h4 style={{marginTop:0}}>Stats</h4>
                            <p className="muted-small">Mood trends and insights will appear here.</p>
                        </div>
                    </div>

                    <section style={{marginTop:'1rem'}}>
                        <Outlet />
                    </section>
                </main>
            </div>
            {/* Modal stub for new journal entry */}
            <React.Suspense fallback={null}>
                {isJournalOpen && (
                    <NewJournalModal open={isJournalOpen} onClose={() => setIsJournalOpen(false)} />
                )}
            </React.Suspense>
        </div>
    );
}

export default UsersPage;