import React from 'react';

const InterviewTips: React.FC = () => {
    return (
        <div className="page-container animate-fade-in">
            <div className="container" style={{ maxWidth: '900px' }}>
                <h1 className="page-title">Interview Tips</h1>
                <p className="page-subtitle">Master the art of the interview with our expert guides.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div className="card glass">
                        <h2 style={{ marginBottom: '16px', color: 'var(--primary)' }}>Before the Interview</h2>
                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)' }}>
                            <li><strong>Research the Company:</strong> Understand their mission, values, and recent news.</li>
                            <li><strong>Review the Job Description:</strong> Match your skills to their requirements.</li>
                            <li><strong>Prepare Your Outfit:</strong> Dress professionally and comfortably.</li>
                            <li><strong>Practice Common Questions:</strong> "Tell me about yourself", "What are your strengths?", etc.</li>
                        </ul>
                    </div>

                    <div className="card glass">
                        <h2 style={{ marginBottom: '16px', color: 'var(--primary)' }}>During the Interview</h2>
                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)' }}>
                            <li><strong>Be Punctual:</strong> Arrive 10-15 minutes early (or log in early for virtual calls).</li>
                            <li><strong>Body Language:</strong> Maintain eye contact and sit up straight.</li>
                            <li><strong>Ask Questions:</strong> Have 2-3 questions ready to ask the interviewer.</li>
                            <li><strong>Be Honest:</strong> If you don't know an answer, it's okay to admit it but show willingness to learn.</li>
                        </ul>
                    </div>

                    <div className="card glass">
                        <h2 style={{ marginBottom: '16px', color: 'var(--primary)' }}>After the Interview</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Send a thank-you email within 24 hours expressing your appreciation for their time and reiterating your interest in the role.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewTips;