import React from 'react';
import { useNavigate } from 'react-router-dom';

const Gateway: React.FC = () => {
    const navigate = useNavigate();

    const selectRole = (role: 'talent' | 'employer') => {
        sessionStorage.setItem('pendingRole', role);
        navigate('/login');
    };

    return (
        <div className="gateway-root">
            {/* Mobile Header */}
            <header className="mobile-header">
                <img src="/logo.svg" alt="ViteHire Logo" className="mobile-logo" />
            </header>

            <main className="gateway-container">
                {/* Center Branding Plate (Desktop Only) */}
                <div className="branding-center">
                    <div className="branding-glass">
                        <img src="/logo.svg" alt="ViteHire Logo" className="logo-main" />
                        <div className="divider-h"></div>
                        <p className="tagline">Official Recruitment Portal</p>
                    </div>
                </div>

                {/* Left Side: Talent */}
                <section 
                    className="pane pane-talent" 
                    onClick={() => selectRole('talent')}
                >
                    <div className="pane-content">
                        <div className="pane-icon-box talent-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pane-icon">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <span className="pane-sup">For Candidates</span>
                        <h2 className="pane-title">I am <span className="text-highlight-talent">Talent</span> looking for growth</h2>
                        <p className="pane-desc">Discover the best local opportunities and kickstart your dream career in Abeokuta.</p>
                        <button className="pane-btn talent-btn">
                            Get Started
                            <svg className="btn-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                        </button>
                    </div>
                </section>

                {/* Right Side: Employer */}
                <section 
                    className="pane pane-employer" 
                    onClick={() => selectRole('employer')}
                >
                    <div className="pane-content">
                        <div className="pane-icon-box employer-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pane-icon">
                                <path d="M3 21h18"></path>
                                <path d="M3 7l9-4 9 4v14H3V7z"></path>
                                <path d="M9 21V11h6v10"></path>
                            </svg>
                        </div>
                        <span className="pane-sup">For Recruiters</span>
                        <h2 className="pane-title">I am <span className="text-highlight-employer">Hiring</span> for my team</h2>
                        <p className="pane-desc">Build your high-performance team with pre-vetted local professionals ready to deliver.</p>
                        <button className="pane-btn employer-btn">
                            Find Talent
                            <svg className="btn-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                        </button>
                    </div>
                </section>
            </main>

            <style>{`
                :root {
                    --clr-bg: #FFFFFF;
                    --clr-bg-alt: #F8FAFC;
                    --clr-text: #0F172A;
                    --clr-text-sec: #64748B;
                    --clr-talent: #3B82F6;
                    --clr-employer: #10B981;
                    --border-clr: rgba(0, 0, 0, 0.05);
                }

                .gateway-root {
                    min-height: 100vh;
                    width: 100%;
                    background: var(--clr-bg);
                    color: var(--clr-text);
                    font-family: 'Inter', sans-serif;
                    display: flex;
                    flex-direction: column;
                    overflow-x: hidden;
                }

                .gateway-container {
                    flex: 1;
                    display: flex;
                    position: relative;
                    width: 100%;
                }

                /* Center Branding (Desktop) */
                .branding-center {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 1000;
                    pointer-events: none;
                }

                .branding-glass {
                    padding: clamp(24px, 2vw, 32px) clamp(32px, 3vw, 48px);
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    border-radius: 32px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.08);
                    animation: plateFadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                .logo-main {
                    height: clamp(32px, 4vw, 44px);
                }

                .divider-h {
                    height: 1px;
                    width: 100%;
                    background: linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent);
                }

                .tagline {
                    font-size: 11px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    color: var(--clr-text-sec);
                    font-family: 'Outfit', sans-serif;
                }

                /* Panes (Split sides) */
                .pane {
                    flex: 1;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: clamp(40px, 8vw, 100px);
                    cursor: pointer;
                    transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
                    overflow: hidden;
                }

                .pane::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    transition: opacity 0.7s;
                    z-index: 1;
                }

                .pane-talent::after {
                    background: radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.03), transparent 70%);
                    border-right: 1px solid var(--border-clr);
                }

                .pane-employer::after {
                    background: radial-gradient(circle at 100% 100%, rgba(16, 185, 129, 0.03), transparent 70%);
                }

                @media (min-width: 1024px) {
                    .pane:hover {
                        background: var(--clr-bg-alt);
                    }
                    .pane:hover::after {
                        opacity: 1;
                    }
                }

                .pane-content {
                    position: relative;
                    z-index: 10;
                    max-width: 440px;
                    width: 100%;
                    text-align: center;
                    transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .pane:hover .pane-content {
                    transform: translateY(-8px);
                }

                /* Icon Styles */
                .pane-icon-box {
                    width: clamp(64px, 6vw, 84px);
                    height: clamp(64px, 6vw, 84px);
                    margin: 0 auto 32px;
                    border-radius: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                }

                .talent-box {
                    background: rgba(59, 130, 246, 0.06);
                    color: var(--clr-talent);
                    border: 1px solid rgba(59, 130, 246, 0.1);
                }

                .employer-box {
                    background: rgba(16, 185, 129, 0.06);
                    color: var(--clr-employer);
                    border: 1px solid rgba(16, 185, 129, 0.1);
                }

                .pane:hover .talent-box {
                    background: var(--clr-talent);
                    color: white;
                    box-shadow: 0 15px 30px rgba(59, 130, 246, 0.2);
                }

                .pane:hover .employer-box {
                    background: var(--clr-employer);
                    color: white;
                    box-shadow: 0 15px 30px rgba(16, 185, 129, 0.2);
                }

                .pane-icon {
                    width: 40%;
                    height: 40%;
                }

                /* Text Typography */
                .pane-sup {
                    font-size: 13px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    color: var(--clr-text-sec);
                    display: block;
                    margin-bottom: 20px;
                    font-family: 'Outfit', sans-serif;
                }

                .pane-title {
                    font-size: clamp(2rem, 3.5vw, 3.2rem);
                    font-weight: 900;
                    line-height: 1.15;
                    color: var(--clr-text);
                    margin-bottom: 24px;
                    font-family: 'Outfit', sans-serif;
                    letter-spacing: -0.03em;
                }

                .text-highlight-talent { color: var(--clr-talent); }
                .text-highlight-employer { color: var(--clr-employer); }

                .pane-desc {
                    font-size: clamp(16px, 1.5vw, 18px);
                    color: var(--clr-text-sec);
                    line-height: 1.6;
                    margin-bottom: 40px;
                    max-width: 380px;
                    margin-left: auto;
                    margin-right: auto;
                }

                /* Pane Buttons */
                .pane-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px 40px;
                    border-radius: 100px;
                    font-size: 14px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    border: 2px solid transparent;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    background: var(--clr-bg-alt);
                    color: var(--clr-text);
                }

                .pane:hover .talent-btn {
                    background: var(--clr-talent);
                    color: white;
                    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
                }

                .pane:hover .employer-btn {
                    background: var(--clr-employer);
                    color: white;
                    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2);
                }

                .btn-chevron {
                    width: 18px;
                    height: 18px;
                    transition: transform 0.3s;
                }

                .pane:hover .btn-chevron {
                    transform: translateX(6px);
                }

                /* Mobile/Responsive Styles */
                .mobile-header {
                    display: none;
                    justify-content: center;
                    padding: 30px 0;
                    background: white;
                    border-bottom: 1px solid var(--border-clr);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }

                .mobile-logo { height: 36px; }

                @media (max-width: 1023px) {
                    .gateway-container {
                        flex-direction: column;
                    }

                    .mobile-header {
                        display: flex;
                    }

                    .branding-center {
                        display: none;
                    }

                    .pane {
                        flex: none;
                        width: 100%;
                        min-height: 50vh;
                        border-right: none;
                    }

                    .pane-talent {
                        border-bottom: 1px solid var(--border-clr);
                    }

                    .pane-desc {
                        max-width: 100%;
                    }

                    .pane-btn {
                        width: 100%;
                        justify-content: center;
                        max-width: 320px;
                    }
                }

                @keyframes plateFadeIn {
                    from { transform: translate(-50%, -40%) scale(0.95); opacity: 0; }
                    to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default Gateway;
