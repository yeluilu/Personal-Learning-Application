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
                            <div style={{fontWeight:700}}>{userData ? userData.username.charAt(0).toUpperCase() + userData.username.slice(1).toLowerCase() : 'No user'}</div>
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
                                <NavLink to="/UsersPage/aibuddy" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
                                    <span>AI Buddy</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/UsersPage/exercises" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
                                    <span>Guided Exercises</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/UsersPage/resources" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
                                    <span>Resources</span>
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
                                    <li style={{marginBottom:8}}><NavLink to="/UsersPage/aibuddy" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} onClick={() => setIsNavOpen(false)}>AI Buddy</NavLink></li>
                                    <li style={{marginBottom:8}}><NavLink to="/UsersPage/exercises" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} onClick={() => setIsNavOpen(false)}>Guided Exercises</NavLink></li>
                                    <li><NavLink to="/UsersPage/resources" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} onClick={() => setIsNavOpen(false)}>Resources</NavLink></li>
                                </ul>
                            </nav>
                        </div>
                    )}

                    <section style={{marginTop:'1rem'}}>
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