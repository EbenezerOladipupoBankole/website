import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
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

    const isHomePage = location.pathname === '/';

    return (
        <nav className={`nav ${scrolled ? 'nav-scrolled' : ''} ${menuOpen ? 'nav-open' : ''} ${isHomePage && !scrolled ? 'nav-transparent' : ''}`}>
            <div className="nav-container">
                <Link to="/" className="logo-section">
                    <img src="/logo.svg" alt="ViteHire Logo" className="brand-logo-img" style={{ height: '40px' }} />
                </Link>

                {/* Mobile Toggle */}
                <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>

                <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
                    <Link to="/jobs" className={location.pathname === '/jobs' ? 'active' : ''}>Find Jobs</Link>
                    <Link to="/talent" className={location.pathname === '/talent' ? 'active' : ''}>Join Talent</Link>
                    <Link to="/employers" className={location.pathname === '/employers' ? 'active' : ''}>For Employers</Link>
                    <Link to="/learning-hub" className={location.pathname === '/learning-hub' ? 'active' : ''}>French Hub</Link>
                    <Link to="/match" className={`match-link ${location.pathname === '/match' ? 'active' : ''}`}>
                        Match <span className="new-badge">Beta</span>
                    </Link>

                    {/* Only visible in mobile menu */}
                    <div className="mobile-actions">
                        <Link to="/login" className="btn-secondary" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>Log In</Link>
                        <Link to="/post-job" className="btn-primary" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>Post a Job</Link>
                    </div>
                </div>

                <div className="nav-actions">
                    <Link to="/login" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', padding: '0.6em 1.2em', fontWeight: 600 }}>Log In</Link>
                    <Link to="/post-job" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', padding: '0.6em 1.2em', fontWeight: 600 }}>Post a Job</Link>
                </div>
            </div>

            {/* Backdrop for mobile menu */}
            {menuOpen && <div className="nav-backdrop" onClick={() => setMenuOpen(false)}></div>}
        </nav>
    );
};

export default Navbar;
