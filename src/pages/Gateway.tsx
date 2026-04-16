import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Gateway: React.FC = () => {
    const navigate = useNavigate();
    const revealRefs = useRef<(HTMLElement | null)[]>([]);

    const selectRole = (role: 'talent' | 'employer') => {
        sessionStorage.setItem('pendingRole', role);
        navigate('/login');
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('gw-revealed'); }),
            { threshold: 0.12 }
        );
        revealRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
        return () => observer.disconnect();
    }, []);

    const addRef = (el: HTMLElement | null) => {
        if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
    };

    return (
        <div className="gw-root">
            {/* ── Navbar ── */}
            <nav className="gw-nav">
                <div className="gw-nav-inner">
                    <a href="/" className="gw-logo-link">
                        <img src="/logo.svg" alt="ViteHire" className="gw-logo-img" />
                    </a>
                    <div className="gw-nav-links-desktop">
                        <a href="#how-it-works">How It Works</a>
                        <a href="#why-vitehire">Why ViteHire</a>
                    </div>
                    <div className="gw-nav-actions">
                        <button className="gw-btn-ghost" onClick={() => navigate('/login')}>Log In</button>
                        <button className="gw-btn-solid" onClick={() => selectRole('talent')}>Get Started</button>
                    </div>
                </div>
            </nav>

            {/* ── Hero ── */}
            <header className="gw-hero">
                <div className="gw-hero-bg-orb gw-orb-1"></div>
                <div className="gw-hero-bg-orb gw-orb-2"></div>
                <div className="gw-hero-grid">
                    <div className="gw-hero-content">
                        <span className="gw-badge">Nigeria's Modern Recruitment Platform</span>
                        <h1 className="gw-hero-title">
                            Where <span className="gw-gradient-text">Top Talent</span> Meets<br />Great Opportunity
                        </h1>
                        <p className="gw-hero-sub">
                            ViteHire connects job seekers and employers across Nigeria.
                            Find your dream role or hire pre-vetted professionals — all in one place.
                        </p>
                        <div className="gw-hero-btns">
                            <button className="gw-btn-primary" onClick={() => selectRole('talent')}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                Find a Job
                            </button>
                            <button className="gw-btn-outline" onClick={() => selectRole('employer')}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M3 7l9-4 9 4v14H3V7z"/><path d="M9 21V11h6v10"/></svg>
                                Hire Talent
                            </button>
                        </div>
                        <p className="gw-hero-note">Free to get started · No credit card required</p>
                    </div>
                </div>
            </header>

            {/* ── Value Strip (replaces fake stats) ── */}
            <section className="gw-value-strip" ref={addRef}>
                <div className="gw-value-inner">
                    {[
                        { title: 'Lightning Fast', desc: 'Post a job or apply in under 2 minutes' },
                        { title: 'Smart Matching', desc: 'AI-powered candidate-to-role matching' },
                        { title: 'Verified Profiles', desc: 'Every professional is pre-screened' },
                        { title: 'Built for Nigeria', desc: 'Designed for the Nigerian job market' },
                    ].map((v, i) => (
                        <div className="gw-value-item" key={i}>
                            <div>
                                <strong>{v.title}</strong>
                                <span>{v.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── How It Works ── */}
            <section className="gw-section" id="how-it-works" ref={addRef}>
                <div className="gw-container">
                    <span className="gw-section-badge">Simple Process</span>
                    <h2 className="gw-section-title">How ViteHire Works</h2>
                    <p className="gw-section-sub">Get started in three simple steps — whether you're looking for work or hiring.</p>

                    <div className="gw-steps-grid">
                        {[
                            { num: '01', title: 'Create Your Profile', desc: 'Sign up and build your professional profile in minutes. Showcase your skills, experience, and career goals.' },
                            { num: '02', title: 'Get Matched', desc: 'Our smart algorithm connects you with the best opportunities or the most qualified candidates for your roles.' },
                            { num: '03', title: 'Connect & Grow', desc: 'Apply to jobs, review candidates, interview, and close — all managed within ViteHire.' },
                        ].map((step, i) => (
                            <div className="gw-step-card" key={i}>
                                <div className="gw-step-num">{step.num}</div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Two Paths ── */}
            <section className="gw-paths-section" ref={addRef}>
                <div className="gw-container">
                    <span className="gw-section-badge">Choose Your Path</span>
                    <h2 className="gw-section-title">Built For Everyone</h2>
                    <div className="gw-paths-grid">
                        <div className="gw-path-card gw-path-talent" onClick={() => selectRole('talent')}>
                            <div className="gw-path-icon-wrap talent-wrap">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </div>
                            <span className="gw-path-label">For Job Seekers</span>
                            <h3>I'm Looking for <span style={{color:'var(--accent)'}}>Opportunities</span></h3>
                            <ul className="gw-path-features">
                                <li>✓ Browse hundreds of jobs across Nigeria</li>
                                <li>✓ Swipe-to-match with Quick Match</li>
                                <li>✓ Build a professional resume</li>
                                <li>✓ Track all your applications</li>
                            </ul>
                            <button className="gw-btn-primary" style={{width:'100%'}}>Get Started Free →</button>
                        </div>

                        <div className="gw-path-card gw-path-employer" onClick={() => selectRole('employer')}>
                            <div className="gw-path-icon-wrap employer-wrap">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M3 7l9-4 9 4v14H3V7z"/><path d="M9 21V11h6v10"/></svg>
                            </div>
                            <span className="gw-path-label">For Employers</span>
                            <h3>I'm <span style={{color:'#10B981'}}>Hiring</span> for My Team</h3>
                            <ul className="gw-path-features">
                                <li>✓ Post jobs in minutes</li>
                                <li>✓ Access pre-vetted Nigerian talent</li>
                                <li>✓ Smart candidate matching</li>
                                <li>✓ Manage applications easily</li>
                            </ul>
                            <button className="gw-btn-green" style={{width:'100%'}}>Start Hiring →</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Why ViteHire (replaces fake testimonials) ── */}
            <section className="gw-section gw-section-alt" id="why-vitehire" ref={addRef}>
                <div className="gw-container">
                    <span className="gw-section-badge">Why Choose Us</span>
                    <h2 className="gw-section-title">Why ViteHire?</h2>
                    <p className="gw-section-sub">We're building the most efficient way to connect talent and opportunity in Nigeria.</p>
                    <div className="gw-why-grid">
                        {[
                            { title: 'Quick Match Technology', desc: 'Swipe through jobs or candidates like never before. Our Tinder-style matching makes hiring and job hunting fast and fun.' },
                            { title: 'Mobile First', desc: 'Apply to jobs or review candidates right from your phone. ViteHire works beautifully on any device, anywhere.' },
                            { title: 'Learning Hub', desc: 'Upskill with our built-in courses and resources. Stand out from the crowd with in-demand skills.' },
                            { title: 'All-in-One Platform', desc: 'Job posting, applications, resume building, matching — everything you need in one seamless platform.' },
                            { title: 'Secure & Private', desc: 'Your data is protected with enterprise-grade security. You control who sees your profile and information.' },
                            { title: 'Free to Start', desc: 'Create your account and start exploring at zero cost. No hidden fees, no strings attached.' },
                        ].map((item, i) => (
                            <div className="gw-why-card" key={i}>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Final CTA ── */}
            <section className="gw-cta" ref={addRef}>
                <div className="gw-container">
                    <div className="gw-cta-card">
                        <h2>Ready to Take the Next Step?</h2>
                        <p>Join the growing community of professionals and companies on ViteHire.</p>
                        <div className="gw-hero-btns">
                            <button className="gw-btn-primary" onClick={() => selectRole('talent')}>Find a Job</button>
                            <button className="gw-btn-outline-light" onClick={() => selectRole('employer')}>Post a Job</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="gw-footer">
                <div className="gw-container gw-footer-inner">
                    <div className="gw-footer-brand">
                        <img src="/logo.svg" alt="ViteHire" style={{height:'28px', marginBottom:'12px'}} />
                        <p>Connecting top talent with great companies across Nigeria.</p>
                    </div>
                    <div className="gw-footer-links">
                        <div>
                            <h4>Platform</h4>
                            <a href="/login">Find Jobs</a>
                            <a href="/login">Post a Job</a>
                            <a href="/login">Quick Match</a>
                        </div>
                        <div>
                            <h4>Resources</h4>
                            <a href="/career-blogs">Career Blog</a>
                            <a href="/interview-tips">Interview Tips</a>
                            <a href="/resume-builder">Resume Builder</a>
                        </div>
                        <div>
                            <h4>Company</h4>
                            <a href="#">About Us</a>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Contact</a>
                        </div>
                    </div>
                </div>
                <div className="gw-footer-bottom">
                    <p>© 2026 ViteHire Technologies. Built with passion in Nigeria.</p>
                </div>
            </footer>

            <style>{`
                /* ═══════ GATEWAY LANDING PAGE ═══════ */
                .gw-root {
                    min-height: 100vh; width: 100%; background: #FFFFFF;
                    color: #0F172A; font-family: 'Inter', sans-serif; overflow-x: hidden;
                }

                /* ── Nav ── */
                .gw-nav {
                    position: fixed; top: 0; left: 0; right: 0; height: 68px;
                    background: rgba(255,255,255,0.94); backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px); z-index: 1000;
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                    display: flex; align-items: center; padding: 0 20px;
                }
                .gw-nav-inner {
                    max-width: 1200px; width: 100%; margin: 0 auto;
                    display: flex; align-items: center; justify-content: space-between;
                }
                .gw-logo-link { display: flex; align-items: center; flex-shrink: 0; }
                .gw-logo-img { height: 34px; }
                .gw-nav-links-desktop { display: flex; gap: 32px; }
                .gw-nav-links-desktop a {
                    font-size: 14px; font-weight: 600; color: #64748B;
                    text-decoration: none; transition: color 0.2s;
                }
                .gw-nav-links-desktop a:hover { color: #3B82F6; }
                .gw-nav-actions { display: flex; gap: 10px; align-items: center; }
                .gw-btn-ghost {
                    background: transparent; color: #0F172A; border: none; font-weight: 600;
                    font-size: 14px; padding: 10px 18px; cursor: pointer; border-radius: 10px;
                    transition: background 0.2s;
                }
                .gw-btn-ghost:hover { background: #F1F5F9; transform: none; }
                .gw-btn-solid {
                    background: #0F172A; color: white; border: none; font-weight: 700;
                    font-size: 14px; padding: 10px 22px; border-radius: 10px; cursor: pointer;
                    transition: all 0.2s;
                }
                .gw-btn-solid:hover { background: #1E293B; transform: translateY(-1px); }

                /* ── Hero ── */
                .gw-hero {
                    min-height: 100vh; display: flex; align-items: center; justify-content: center;
                    text-align: center; padding: 100px 20px 60px; position: relative; overflow: hidden;
                    background: linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%);
                }
                .gw-hero-bg-orb {
                    position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.3; z-index: 0;
                    pointer-events: none;
                }
                .gw-orb-1 { width: 550px; height: 550px; background: #3B82F6; top: -180px; right: -80px; }
                .gw-orb-2 { width: 450px; height: 450px; background: #10B981; bottom: -180px; left: -80px; }
                .gw-hero-grid { position: relative; z-index: 10; width: 100%; max-width: 760px; }
                .gw-hero-content { animation: gwFadeUp 0.9s ease-out; }
                .gw-badge {
                    display: inline-block; padding: 8px 20px; background: rgba(59,130,246,0.08);
                    border: 1px solid rgba(59,130,246,0.15); border-radius: 100px;
                    font-size: 13px; font-weight: 700; color: #3B82F6; margin-bottom: 28px;
                }
                .gw-hero-title {
                    font-family: 'Outfit', sans-serif; font-size: clamp(2.2rem, 5.5vw, 4rem);
                    font-weight: 900; line-height: 1.1; letter-spacing: -0.03em;
                    color: #0F172A; margin-bottom: 24px;
                }
                .gw-gradient-text {
                    background: linear-gradient(135deg, #3B82F6, #10B981);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
                }
                .gw-hero-sub {
                    font-size: clamp(15px, 1.8vw, 18px); color: #64748B; line-height: 1.7;
                    max-width: 560px; margin: 0 auto 36px;
                }
                .gw-hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
                .gw-hero-note {
                    margin-top: 20px; font-size: 13px; color: #94A3B8; font-weight: 500;
                }
                .gw-btn-primary {
                    display: inline-flex; align-items: center; gap: 10px;
                    background: linear-gradient(135deg, #3B82F6, #2563EB); color: white;
                    border: none; padding: 15px 30px; border-radius: 14px; font-size: 15px;
                    font-weight: 700; cursor: pointer; transition: all 0.3s;
                    box-shadow: 0 4px 15px rgba(59,130,246,0.3);
                }
                .gw-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59,130,246,0.4); }
                .gw-btn-outline {
                    display: inline-flex; align-items: center; gap: 10px;
                    background: white; color: #0F172A;
                    border: 2px solid #E2E8F0; padding: 15px 30px; border-radius: 14px;
                    font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.3s;
                }
                .gw-btn-outline:hover { border-color: #10B981; color: #10B981; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(16,185,129,0.15); }
                .gw-btn-green {
                    display: inline-flex; align-items: center; gap: 10px;
                    background: linear-gradient(135deg, #10B981, #059669); color: white;
                    border: none; padding: 15px 30px; border-radius: 14px; font-size: 15px;
                    font-weight: 700; cursor: pointer; transition: all 0.3s;
                    box-shadow: 0 4px 15px rgba(16,185,129,0.3);
                }
                .gw-btn-green:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(16,185,129,0.4); }
                .gw-btn-outline-light {
                    display: inline-flex; align-items: center; gap: 10px;
                    background: transparent; color: white;
                    border: 2px solid rgba(255,255,255,0.3); padding: 15px 30px; border-radius: 14px;
                    font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.3s;
                }
                .gw-btn-outline-light:hover { background: rgba(255,255,255,0.1); border-color: white; transform: translateY(-2px); }

                /* ── Value Strip ── */
                .gw-value-strip {
                    background: #0F172A; padding: 0 20px; position: relative; z-index: 5;
                }
                .gw-value-inner {
                    max-width: 1100px; margin: 0 auto; display: grid;
                    grid-template-columns: repeat(4, 1fr); gap: 0;
                }
                .gw-value-item {
                    display: flex; align-items: center; gap: 14px; padding: 32px 24px;
                    border-right: 1px solid rgba(255,255,255,0.06);
                    transition: background 0.3s;
                }
                .gw-value-item:last-child { border-right: none; }
                .gw-value-item:hover { background: rgba(255,255,255,0.04); }
                .gw-value-icon { font-size: 28px; flex-shrink: 0; }
                .gw-value-item strong {
                    display: block; font-size: 14px; font-weight: 700; color: white;
                    margin-bottom: 2px;
                }
                .gw-value-item span { font-size: 13px; color: #94A3B8; line-height: 1.4; }

                /* ── Sections ── */
                .gw-container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
                .gw-section { padding: 96px 0; }
                .gw-section-alt { background: #F8FAFC; }
                .gw-section-badge {
                    display: inline-block; padding: 6px 16px; background: rgba(59,130,246,0.08);
                    border-radius: 100px; font-size: 12px; font-weight: 700; color: #3B82F6;
                    text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px;
                }
                .gw-section-title {
                    font-family: 'Outfit', sans-serif; font-size: clamp(26px, 4vw, 40px);
                    font-weight: 900; color: #0F172A; margin-bottom: 14px; text-align: center;
                    letter-spacing: -0.02em;
                }
                .gw-section-sub {
                    font-size: 16px; color: #64748B; text-align: center;
                    max-width: 520px; margin: 0 auto 52px; line-height: 1.6;
                }
                .gw-section > .gw-container { text-align: center; }

                /* ── Steps ── */
                .gw-steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; text-align: left; }
                .gw-step-card {
                    background: white; border: 1px solid #E2E8F0; border-radius: 22px;
                    padding: 36px 28px; transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
                    position: relative; overflow: hidden;
                }
                .gw-step-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.07); border-color: #3B82F6; }
                .gw-step-num {
                    font-family: 'Outfit', sans-serif; font-size: 60px; font-weight: 900;
                    color: rgba(59,130,246,0.06); position: absolute; top: 12px; right: 20px; line-height: 1;
                }
                .gw-step-icon { font-size: 32px; margin-bottom: 18px; }
                .gw-step-card h3 { font-family: 'Outfit', sans-serif; font-size: 19px; font-weight: 800; margin-bottom: 10px; color: #0F172A; }
                .gw-step-card p { font-size: 14px; color: #64748B; line-height: 1.65; }

                /* ── Paths ── */
                .gw-paths-section { padding: 96px 0; background: white; }
                .gw-paths-section .gw-container { text-align: center; }
                .gw-paths-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; text-align: left; margin-top: 52px; }
                .gw-path-card {
                    background: white; border: 2px solid #E2E8F0; border-radius: 26px;
                    padding: 40px 32px; cursor: pointer; transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
                }
                .gw-path-talent:hover { border-color: #3B82F6; box-shadow: 0 20px 50px rgba(59,130,246,0.1); transform: translateY(-6px); }
                .gw-path-employer:hover { border-color: #10B981; box-shadow: 0 20px 50px rgba(16,185,129,0.1); transform: translateY(-6px); }
                .gw-path-icon-wrap {
                    width: 60px; height: 60px; border-radius: 16px; display: flex;
                    align-items: center; justify-content: center; margin-bottom: 20px;
                }
                .talent-wrap { background: rgba(59,130,246,0.08); color: #3B82F6; }
                .employer-wrap { background: rgba(16,185,129,0.08); color: #10B981; }
                .gw-path-label {
                    font-size: 11px; font-weight: 800; text-transform: uppercase;
                    letter-spacing: 0.15em; color: #94A3B8; display: block; margin-bottom: 10px;
                }
                .gw-path-card h3 { font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 800; margin-bottom: 22px; color: #0F172A; }
                .gw-path-features { list-style: none; padding: 0; margin: 0 0 28px; display: flex; flex-direction: column; gap: 10px; }
                .gw-path-features li { font-size: 14px; color: #475569; line-height: 1.5; }

                /* ── Why ViteHire ── */
                .gw-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; text-align: left; }
                .gw-why-card {
                    background: white; border: 1px solid #E2E8F0; border-radius: 22px;
                    padding: 32px 28px; transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
                }
                .gw-why-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.06); border-color: rgba(59,130,246,0.3); }
                .gw-why-icon { font-size: 30px; margin-bottom: 16px; }
                .gw-why-card h3 { font-family: 'Outfit', sans-serif; font-size: 17px; font-weight: 800; margin-bottom: 8px; color: #0F172A; }
                .gw-why-card p { font-size: 14px; color: #64748B; line-height: 1.6; }

                /* ── CTA ── */
                .gw-cta { padding: 96px 0; }
                .gw-cta-card {
                    background: linear-gradient(135deg, #0F172A, #1E293B); border-radius: 28px;
                    padding: 72px 40px; text-align: center; position: relative; overflow: hidden;
                }
                .gw-cta-card::before {
                    content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
                    background: radial-gradient(circle at 30% 40%, rgba(59,130,246,0.12), transparent 50%),
                                radial-gradient(circle at 70% 60%, rgba(16,185,129,0.08), transparent 50%);
                    z-index: 0; pointer-events: none;
                }
                .gw-cta-card h2 {
                    font-family: 'Outfit', sans-serif; font-size: clamp(26px, 4vw, 38px);
                    font-weight: 900; color: white; margin-bottom: 14px; position: relative; z-index: 1;
                }
                .gw-cta-card p { font-size: 16px; color: rgba(255,255,255,0.65); margin-bottom: 36px; position: relative; z-index: 1; }
                .gw-cta-card .gw-hero-btns { position: relative; z-index: 1; }

                /* ── Footer ── */
                .gw-footer { background: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 56px 0 0; }
                .gw-footer-inner { display: flex; gap: 56px; margin-bottom: 40px; flex-wrap: wrap; }
                .gw-footer-brand { flex: 1; min-width: 220px; }
                .gw-footer-brand p { font-size: 14px; color: #94A3B8; line-height: 1.6; max-width: 260px; }
                .gw-footer-links { display: flex; gap: 48px; flex-wrap: wrap; }
                .gw-footer-links h4 {
                    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 800;
                    color: #0F172A; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.08em;
                }
                .gw-footer-links a {
                    display: block; font-size: 14px; color: #64748B;
                    text-decoration: none; margin-bottom: 8px; transition: color 0.2s;
                }
                .gw-footer-links a:hover { color: #3B82F6; }
                .gw-footer-bottom { text-align: center; padding: 20px; border-top: 1px solid #E2E8F0; }
                .gw-footer-bottom p { font-size: 13px; color: #94A3B8; }

                /* ── Animations ── */
                @keyframes gwFadeUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .gw-value-strip, .gw-section, .gw-paths-section, .gw-cta {
                    opacity: 0; transform: translateY(30px);
                    transition: all 0.8s cubic-bezier(0.16,1,0.3,1);
                }
                .gw-revealed { opacity: 1 !important; transform: translateY(0) !important; }

                /* ═══════ RESPONSIVE ═══════ */
                /* Tablets */
                @media (max-width: 1024px) {
                    .gw-steps-grid { grid-template-columns: repeat(2, 1fr); }
                    .gw-why-grid { grid-template-columns: repeat(2, 1fr); }
                    .gw-value-inner { grid-template-columns: repeat(2, 1fr); }
                    .gw-value-item:nth-child(2) { border-right: none; }
                }

                /* Large phones / small tablets */
                @media (max-width: 768px) {
                    .gw-nav-links-desktop { display: none; }
                    .gw-nav { height: 60px; }
                    .gw-logo-img { height: 30px; }
                    .gw-btn-ghost { padding: 8px 12px; font-size: 13px; }
                    .gw-btn-solid { padding: 8px 16px; font-size: 13px; }

                    .gw-hero { min-height: auto; padding: 100px 20px 50px; }
                    .gw-hero-title { font-size: 2rem; }
                    .gw-badge { font-size: 12px; padding: 6px 16px; }
                    .gw-hero-sub { font-size: 15px; margin-bottom: 28px; }
                    .gw-hero-btns { flex-direction: column; align-items: stretch; }
                    .gw-btn-primary, .gw-btn-outline, .gw-btn-green, .gw-btn-outline-light {
                        width: 100%; justify-content: center; padding: 14px 24px;
                    }

                    .gw-value-inner { grid-template-columns: 1fr 1fr; }
                    .gw-value-item { padding: 24px 16px; gap: 10px; }
                    .gw-value-icon { font-size: 22px; }
                    .gw-value-item strong { font-size: 13px; }
                    .gw-value-item span { font-size: 12px; }

                    .gw-steps-grid, .gw-paths-grid, .gw-why-grid { grid-template-columns: 1fr; }
                    .gw-section { padding: 64px 0; }
                    .gw-paths-section { padding: 64px 0; }
                    .gw-section-title { font-size: 24px; }
                    .gw-section-sub { font-size: 14px; margin-bottom: 36px; }

                    .gw-path-card { padding: 28px 22px; }
                    .gw-path-card h3 { font-size: 20px; }
                    .gw-step-card { padding: 28px 22px; }

                    .gw-cta { padding: 64px 0; }
                    .gw-cta-card { padding: 48px 24px; border-radius: 22px; }

                    .gw-footer-inner { flex-direction: column; gap: 32px; }
                    .gw-footer-links { gap: 28px; }
                }

                /* Small phones */
                @media (max-width: 420px) {
                    .gw-hero-title { font-size: 1.7rem; }
                    .gw-badge { font-size: 11px; padding: 6px 12px; }
                    .gw-hero-sub { font-size: 14px; }
                    .gw-value-inner { grid-template-columns: 1fr; }
                    .gw-value-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); padding: 20px 16px; }
                    .gw-value-item:last-child { border-bottom: none; }
                    .gw-step-card, .gw-why-card, .gw-path-card { padding: 24px 18px; }
                    .gw-section-title { font-size: 22px; }
                    .gw-cta-card h2 { font-size: 22px; }
                    .gw-nav-actions { gap: 6px; }
                    .gw-btn-ghost { padding: 8px 10px; }
                    .gw-btn-solid { padding: 8px 14px; }
                    .gw-footer-links { flex-direction: column; gap: 24px; }
                }
            `}</style>
        </div>
    );
};

export default Gateway;
