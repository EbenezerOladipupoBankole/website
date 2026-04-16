import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';

interface NavbarProps {
    user: User | null;
    userRole: 'talent' | 'employer' | null;
}

const Navbar: React.FC<NavbarProps> = ({ user, userRole }) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('authToken');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const isHomePage = location.pathname === '/';
    const isAuthPage = location.pathname === '/login';

    // Don't show Navbar on Gateway or Auth pages if not logged in
    if (!user && (isHomePage || isAuthPage)) {
        return null;
    }

    return (
        <nav className={`nav ${scrolled ? 'nav-scrolled' : ''} ${menuOpen ? 'nav-open' : ''} ${isHomePage && !scrolled ? 'nav-transparent' : ''}`}>
            <div className="nav-container">
                <Link to="/" className="logo-section">
                    <img src="/logo.svg" alt="ViteHire Logo" className="brand-logo-img" style={{ height: '40px' }} />
                </Link>

                {/* Only show menu and actions if user is logged in */}
                {user ? (
                    <>
                        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                        </button>

                        <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
                            {/* Talent-specific links */}
                            {userRole === 'talent' && (
                                <>
                                    <Link to="/jobs" className={location.pathname === '/jobs' ? 'active' : ''}>Find Jobs</Link>
                                    <Link to="/match" className={`match-link ${location.pathname === '/match' ? 'active' : ''}`}>
                                        Match <span className="new-badge">Beta</span>
                                    </Link>
                                    <Link to="/talent" className={location.pathname === '/talent' ? 'active' : ''}>My Profile</Link>
                                </>
                            )}

                            {/* Employer-specific links */}
                            {userRole === 'employer' && (
                                <>
                                    <Link to="/browse-talent" className={location.pathname === '/browse-talent' ? 'active' : ''}>Browse Talent</Link>
                                    <Link to="/employers" className={location.pathname === '/employers' ? 'active' : ''}>Dashboard</Link>
                                </>
                            )}

                            {/* Shared links */}

                            <div className="mobile-actions">
                                <div className="user-profile-nav">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.displayName || 'User'} className="nav-profile-img" />
                                    ) : (
                                        <div className="nav-profile-placeholder">{user.displayName?.charAt(0)}</div>
                                    )}
                                </div>
                                <button onClick={handleLogout} className="btn-secondary" style={{ width: '100%' }}>Logout</button>
                                {userRole === 'employer' && (
                                    <Link to="/post-job" className="btn-primary" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>Post a Job</Link>
                                )}
                            </div>
                        </div>

                        <div className="nav-actions">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div className="user-profile-nav" title={user.displayName || 'User Profile'}>
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.displayName || 'User'} className="nav-profile-img" />
                                    ) : (
                                        <div className="nav-profile-placeholder">{user.displayName?.charAt(0)}</div>
                                    )}
                                </div>
                                <button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.4em 1em' }}>Logout</button>
                                {userRole === 'employer' && (
                                    <Link to="/post-job" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', padding: '0.6em 1.2em', fontWeight: 600 }}>Post a Job</Link>
                                )}
                            </div>
                        </div>
                    </>
                ) : null}
            </div>

            {/* Backdrop for mobile menu */}
            {menuOpen && <div className="nav-backdrop" onClick={() => setMenuOpen(false)}></div>}
        </nav>
    );
};

export default Navbar;
