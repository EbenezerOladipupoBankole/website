import React from 'react';

const LearningHub: React.FC = () => {
    const courses = [
        { title: "French for Absolute Beginners (A1)", provider: "Alliance Française Nigeria", duration: "12 Weeks", level: "Beginner" },
        { title: "Intermediate French Conversation (B1)", provider: "Alliance Française Nigeria", duration: "8 Weeks", level: "Intermediate" },
        { title: "Business French Mastery", provider: "Global Talent Hub", duration: "6 Weeks", level: "Advanced" },
        { title: "DELF Exam Preparation", provider: "L'école de Français", duration: "4 Weeks", level: "Test Prep" }
    ];

    return (
        <div className="page-container animate-fade-in">
            <div className="container">
                <h1 className="page-title">French Learning Hub</h1>
                <p className="page-subtitle">Master the language of global business and upscale your career prospects.</p>

                <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                    {courses.map((course, index) => (
                        <div key={index} className="card glass" style={{ transition: 'transform 0.2s' }}>
                            <div style={{ marginBottom: '16px' }}>
                                <span style={{ background: 'var(--surface-secondary)', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                    {course.level}
                                </span>
                            </div>
                            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{course.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>By {course.provider}</p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}><i className="far fa-clock"></i> {course.duration}</p>
                            <button className="btn-outline" style={{ width: '100%', marginTop: '20px', borderRadius: '8px' }}>Start Learning</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearningHub;