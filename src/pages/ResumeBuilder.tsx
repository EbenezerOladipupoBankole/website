import React from 'react';

const ResumeBuilder: React.FC = () => {
    return (
        <div className="page-container animate-fade-in">
            <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
                <h1 className="page-title">Resume Builder</h1>
                <p className="page-subtitle">Create a professional resume in minutes.</p>

                <div className="card glass" style={{ padding: '60px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                    <div style={{ width: '80px', height: '80px', background: 'var(--surface-secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: 'var(--accent)' }}>
                        <i className="fas fa-file-alt"></i>
                    </div>
                    <h2>Build Your Resume for Free</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
                        Our AI-powered resume builder helps you highlight your skills and experience to stand out to employers across Nigeria.
                    </p>

                    <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button className="btn-primary">Start Building</button>
                        <button className="btn-outline" style={{ borderRadius: '12px', padding: '0.6em 1.2em' }}>Upload Existing</button>
                    </div>

                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '24px' }}>
                        * No sign-up required for basic templates.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;