import { useState, useEffect, createContext } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { applyTheme, getSavedTheme } from "../utils/themeHelper";
import React from 'react';
import NewJournalModal from '../Components/NewJournalModal.jsx';

export const UserContext = createContext(null);

function UsersPage() {
    const savedToken = localStorage.getItem("authToken");

    // ✅ Added hooks at the top — always declare hooks first, before any conditional logic
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ Added loading state
    const [error, setError] = useState(false);    // ✅ Added error state
    const [isJournalOpen, setIsJournalOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false); // hidden by default
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
        return <Navigate to="/login" />;
    }

    // ✅ Show loading message while fetching user data
    if (loading) {
        return <div>Loading user data...</div>;
    }

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <div className="container">
            <div className={`dashboard collapsed`}>
                <main className="dashboard-main">
                    {/* Hamburger button in top-right - opens dropdown menu */}
                    {!isNavOpen && (
                    <div className="hamburger-wrapper">
                        <button className="sections-button" aria-expanded={isNavOpen} aria-label="Toggle navigation" onClick={() => setIsNavOpen(!isNavOpen)}>
                            <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>
                    </div>
                    )}
                    {/* Calm dropdown panel */}
                    {isNavOpen && (
                        <div className="calm-dropdown-panel" role="menu">
                            <div style={{padding: '1.5rem', borderBottom: '1px solid rgba(141,153,174,0.1)'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem'}}>
                                    <h4 style={{margin: 0, fontSize: '1.1rem', fontWeight: 500, color: 'var(--text)'}}>Menu</h4>
                                    <button 
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            fontSize: '1.5rem',
                                            color: 'var(--muted)',
                                            cursor: 'pointer',
                                            padding: '0.25rem'
                                        }}
                                        onClick={() => setIsNavOpen(false)} 
                                        aria-label="Close menu"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                                    <div className="avatar">{userData ? userData.username.charAt(0).toUpperCase() : 'U'}</div>
                                    <div>
                                        <div style={{fontWeight: 500, fontSize: '0.95rem', color: 'var(--text)'}}>
                                            {userData ? userData.username.charAt(0).toUpperCase() + userData.username.slice(1).toLowerCase() : 'User'}
                                        </div>
                                        <div style={{fontSize: '0.85rem', color: 'var(--muted)'}}>
                                            {userData?.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <nav style={{padding: '1rem'}}>
                                <ul style={{listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
                                    <li><NavLink to="/users/me/aibuddy" className={({isActive}) => `calm-nav-item ${isActive ? 'active' : ''}`} onClick={() => setIsNavOpen(false)}>💬 Chat</NavLink></li>
                                    <li><NavLink to="/users/me/journal" className={({isActive}) => `calm-nav-item ${isActive ? 'active' : ''}`} onClick={() => setIsNavOpen(false)}>📝 Journal</NavLink></li>
                                    <li><NavLink to="/users/me/exercises" className={({isActive}) => `calm-nav-item ${isActive ? 'active' : ''}`} onClick={() => setIsNavOpen(false)}>🧘 Exercises</NavLink></li>
                                    <li><NavLink to="/users/me/progress" className={({isActive}) => `calm-nav-item ${isActive ? 'active' : ''}`} onClick={() => setIsNavOpen(false)}>📊 Progress</NavLink></li>
                                    <li><NavLink to="/users/me" end className={({isActive}) => `calm-nav-item ${isActive ? 'active' : ''}`} onClick={() => setIsNavOpen(false)}>🏠 Home</NavLink></li>
                                    <li><NavLink to="/users/me/resources" className={({isActive}) => `calm-nav-item ${isActive ? 'active' : ''}`} onClick={() => setIsNavOpen(false)}>🆘 Support</NavLink></li>
                                </ul>
                            </nav>
                            <div style={{padding: '1rem', borderTop: '1px solid rgba(141,153,174,0.1)'}}>
                                <button 
                                    onClick={handleLogout}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'transparent',
                                        border: '1.5px solid rgba(141,153,174,0.2)',
                                        borderRadius: '12px',
                                        color: 'var(--text-soft)',
                                        fontSize: '0.95rem',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}

                    <section className="dashboard-content">
                        <UserContext.Provider value={{ userData, setIsJournalOpen }}>
                            <Outlet />
                        </UserContext.Provider>
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