import React from 'react';
import { useNavigate } from 'react-router-dom';

const Gateway: React.FC = () => {
    const navigate = useNavigate();

    const selectRole = (role: 'talent' | 'employer') => {
        sessionStorage.setItem('pendingRole', role);
        navigate('/login');
    };

    return (
        <div className="gateway-split-container animate-fade-in" style={{ 
            display: 'flex', 
            minHeight: '100vh',
            width: '100%',
            overflow: 'hidden',
            flexDirection: window.innerWidth < 768 ? 'column' : 'row'
        }}>
            {/* Talent Half */}
            <div 
                className="gateway-panel talent-panel"
                onClick={() => selectRole('talent')}
                style={{
                    flex: 1,
                    position: 'relative',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    background: 'url("/images/gateway-bg.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'left center'
                }}
            >
                <div className="panel-overlay" style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(15, 23, 42, 0.7)',
                    transition: 'background-color 0.4s ease'
                }}></div>
                <div className="panel-content" style={{ 
                    position: 'relative', 
                    zIndex: 2, 
                    textAlign: 'center', 
                    color: 'white',
                    padding: '40px'
                }}>
                    <span style={{ fontSize: '14px', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.8, marginBottom: '16px', display: 'block' }}>Opportunity Awaits</span>
                    <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, marginBottom: '24px' }}>I'M <span className="text-gradient">TALENT</span></h2>
                    <p style={{ maxWidth: '400px', margin: '0 auto', fontSize: '18px', opacity: 0.9 }}>
                        Find your next career move in the Rock City.
                    </p>
                    <div className="panel-button" style={{ 
                        marginTop: '40px', 
                        padding: '16px 48px', 
                        border: '2px solid white', 
                        display: 'inline-block',
                        fontWeight: 700,
                        textTransform: 'uppercase'
                    }}>Join as Talent</div>
                </div>
            </div>

            {/* Employer Half */}
            <div 
                className="gateway-panel employer-panel"
                onClick={() => selectRole('employer')}
                style={{
                    flex: 1,
                    position: 'relative',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    background: 'url("/images/gateway-bg.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'right center'
                }}
            >
                <div className="panel-overlay" style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(2, 6, 23, 0.85)',
                    transition: 'background-color 0.4s ease'
                }}></div>
                <div className="panel-content" style={{ 
                    position: 'relative', 
                    zIndex: 2, 
                    textAlign: 'center', 
                    color: 'white',
                    padding: '40px'
                }}>
                    <span style={{ fontSize: '14px', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.8, marginBottom: '16px', display: 'block' }}>Power your Growth</span>
                    <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, marginBottom: '24px' }}>I'M <span className="text-gradient">HIRING</span></h2>
                    <p style={{ maxWidth: '400px', margin: '0 auto', fontSize: '18px', opacity: 0.9 }}>
                        Access pre-vetted local professionals in Abeokuta.
                    </p>
                    <div className="panel-button" style={{ 
                        marginTop: '40px', 
                        padding: '16px 48px', 
                        border: '2px solid var(--accent)', 
                        display: 'inline-block',
                        fontWeight: 700,
                        color: 'var(--accent)',
                        textTransform: 'uppercase'
                    }}>Find Talent</div>
                </div>
            </div>

            <style>{`
                .gateway-panel:hover {
                    flex: 1.25 !important;
                }
                .gateway-panel:hover .panel-overlay {
                    background-color: rgba(15, 23, 42, 0.4) !important;
                }
                .talent-panel:hover {
                    border-right: 4px solid var(--accent);
                }
                .employer-panel:hover {
                    border-left: 4px solid var(--accent);
                }
                @media (max-width: 768px) {
                    .gateway-split-container {
                        flex-direction: column !important;
                    }
                    .gateway-panel:hover {
                        flex: 1 !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Gateway;
