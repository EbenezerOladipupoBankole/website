import React from 'react';
import { Link } from 'react-router-dom';

const Employers: React.FC = () => {
    return (
        <div className="page-container animate-fade-in">
            <div className="container">
                <header style={{ marginBottom: '60px', textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
                    <h1 className="page-title" style={{ fontSize: '48px' }}>Hire Top Local Talent</h1>
                    <p className="page-subtitle">Connecting you with the best professionals across Nigeria, fast.</p>
                </header>

                <div className="employers-options" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '40px',
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    {/* Option 1: Post a Job */}
                    <div className="employer-option-card glass" style={{
                        padding: '48px',
                        borderRadius: '32px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '24px',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        boxShadow: '0 20px 40px rgba(59, 130, 246, 0.1)'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0, right: 0,
                            width: '200px', height: '200px',
                            background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
                            transform: 'translate(30%, -30%)'
                        }}></div>

                        <div style={{
                            width: '64px', height: '64px',
                            background: 'var(--accent)',
                            borderRadius: '16px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '32px', color: 'white',
                            marginBottom: '8px'
                        }}>
                            💼
                        </div>

                        <div>
                            <h3 style={{ fontSize: '28px', marginBottom: '12px', fontWeight: 800 }}>Post a Job</h3>
                            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                Create a job listing in minutes and reach thousands of qualified candidates across Nigeria immediately.
                            </p>
                        </div>

                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                            {[' Instant publication', ' Smart candidate matching', ' Direct messaging'].map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: 'var(--text-primary)' }}>
                                    <span style={{ color: 'var(--success)', fontSize: '18px' }}>✓</span> {item}
                                </li>
                            ))}
                        </ul>

                        <Link to="/post-job" className="btn-primary" style={{
                            width: '100%',
                            textAlign: 'center',
                            padding: '16px',
                            fontSize: '18px',
                            marginTop: '16px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textDecoration: 'none'
                        }}>
                            Post a Job Now <span style={{ marginLeft: '8px' }}>→</span>
                        </Link>
                    </div>

                    {/* Option 2: Browse Talent */}
                    <div className="employer-option-card glass" style={{
                        padding: '48px',
                        borderRadius: '32px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '24px',
                        position: 'relative',
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))'
                    }}>
                        <div style={{
                            width: '64px', height: '64px',
                            background: 'var(--primary)',
                            borderRadius: '16px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '32px', color: 'white',
                            marginBottom: '8px'
                        }}>
                            🔍
                        </div>

                        <div>
                            <h3 style={{ fontSize: '28px', marginBottom: '12px', fontWeight: 800 }}>Browse Talent</h3>
                            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                Proactively search our database of verified professionals. Filter by skills, experience, and location.
                            </p>
                        </div>

                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                            {[' Verified profiles', ' View portfolios & resumes', ' Invite to apply'].map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: 'var(--text-primary)' }}>
                                    <span style={{ color: 'var(--primary)', fontSize: '18px' }}>✓</span> {item}
                                </li>
                            ))}
                        </ul>

                        <Link to="/browse-talent" className="btn-outline" style={{
                            width: '100%',
                            padding: '16px',
                            fontSize: '18px',
                            marginTop: '16px',
                            borderWidth: '2px',
                            display: 'inline-block',
                            textAlign: 'center',
                            textDecoration: 'none'
                        }}>
                            Search Talent Pool
                        </Link>
                    </div>
                </div>

                {/* Dashboard Section */}
                <div style={{ marginTop: '80px', maxWidth: '1000px', margin: '80px auto 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '32px' }}>Your Job Postings</h2>
                        <Link to="/post-job" className="btn-outline" style={{ padding: '8px 16px', fontSize: '14px', borderRadius: '8px' }}>
                            + New Job
                        </Link>
                    </div>

                    <div style={{ display: 'grid', gap: '20px' }}>
                        {/* Mock Job Post 1 */}
                        <div className="card glass" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                    <h3 style={{ fontSize: '20px', margin: 0 }}>Senior React Developer</h3>
                                    <span style={{ padding: '4px 8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '100px', fontSize: '12px', fontWeight: 600 }}>Active</span>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Posted 2 days ago • IT & Software • Remote</p>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '24px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>145</div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Views</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent)' }}>12</div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Applicants</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginLeft: '16px' }}>
                                    <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px', minWidth: '120px' }}>View Applicants</button>
                                </div>
                            </div>
                        </div>

                        {/* Mock Job Post 2 */}
                        <div className="card glass" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                    <h3 style={{ fontSize: '20px', margin: 0 }}>Marketing Specialist</h3>
                                    <span style={{ padding: '4px 8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '100px', fontSize: '12px', fontWeight: 600 }}>Active</span>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Posted 5 days ago • Marketing • Hybrid</p>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '24px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>320</div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Views</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent)' }}>45</div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Applicants</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginLeft: '16px' }}>
                                    <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px', minWidth: '120px' }}>View Applicants</button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Mock Job Post 3 */}
                        <div className="card glass" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.7 }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                    <h3 style={{ fontSize: '20px', margin: 0 }}>Customer Support Rep</h3>
                                    <span style={{ padding: '4px 8px', background: 'rgba(100, 116, 139, 0.1)', color: 'var(--text-muted)', borderRadius: '100px', fontSize: '12px', fontWeight: 600 }}>Closed</span>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Posted 3 weeks ago • Custom Service • On-site</p>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '24px' }}>
                                <div style={{ textAlign: 'center', opacity: 0.6 }}>
                                    <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>512</div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Views</div>
                                </div>
                                <div style={{ textAlign: 'center', opacity: 0.6 }}>
                                    <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent)' }}>89</div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Applicants</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginLeft: '16px' }}>
                                    <button className="btn-outline" style={{ padding: '8px 16px', fontSize: '13px', minWidth: '120px' }}>Archived</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employers;
