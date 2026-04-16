import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';

interface Job {
    _id: string;
    title: string;
    companyName: string;
    description: string;
    jobType: string;
    category: string;
    requirements: string;
    createdAt: any;
    logo?: string;
}

const QuickMatch: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [swipeClass, setSwipeClass] = useState('');
    const [showMatch, setShowMatch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await api.getJobs();
                setJobs(data as Job[]);
            } catch (err) {
                console.error("Match error:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const handleSwipe = async (direction: 'left' | 'right') => {
        setSwipeClass(`swipe-${direction}`);

        if (direction === 'right') {
            setIsSubmitting(true);
            try {
                // Submit a quick application with current user details if available
                // In a full implementation, this uses the user's saved profile/CV
                const formData = new FormData();
                formData.append('fullName', auth.currentUser?.displayName || 'Anonymous Candidate');
                formData.append('email', auth.currentUser?.email || 'N/A');
                formData.append('phone', 'Captured via Profile');
                
                await api.submitApplication(jobs[currentIndex]._id, formData);
                
                setTimeout(() => {
                    setShowMatch(true);
                    setIsSubmitting(false);
                }, 300);
            } catch (err) {
                console.error("Quick apply error:", err);
                setIsSubmitting(false);
                nextCard();
            }
        } else {
            setTimeout(() => {
                nextCard();
            }, 300);
        }
    };

    const nextCard = () => {
        setSwipeClass('');
        setShowMatch(false);
        setCurrentIndex(prev => prev + 1);
    };

    const currentJob = jobs[currentIndex];

    if (isLoading) {
        return (
            <div className="quick-match-page">
                <div className="spinner" style={{ marginTop: '100px' }}></div>
            </div>
        );
    }

    if (!currentJob) {
        return (
            <div className="quick-match-page">
                <div className="empty-state">
                    <i className="fas fa-search"></i>
                    <h2>No more jobs to swipe!</h2>
                    <p>Check back later for new opportunities across Nigeria.</p>
                    <button className="btn-primary" onClick={() => navigate('/jobs')} style={{ marginTop: '24px' }}>
                        Browse All Jobs
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="quick-match-page">
            <div className="container" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <span className="badge-v2">Quick Match Mode</span>
                <h1 style={{ marginTop: '8px' }}>Swipe to Apply</h1>
            </div>

            <div className="swipe-container">
                <div className={`swipe-card ${swipeClass}`}>
                    <div className="card-header">
                        <div className="card-company-logo">
                            {currentJob.logo || '🏢'}
                        </div>
                        <span className="card-badge">{currentJob.jobType}</span>
                    </div>

                    <h2>{currentJob.title}</h2>
                    <p className="company-name">{currentJob.companyName}</p>

                    <div className="match-details">
                        <div className="match-detail-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>Nigeria</span>
                        </div>
                        <div className="match-detail-item">
                            <i className="fas fa-briefcase"></i>
                            <span>{currentJob.category}</span>
                        </div>
                        <div className="match-detail-item">
                            <i className="fas fa-clock"></i>
                            <span>Posted {new Date(currentJob.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="card-description">
                        <p>{currentJob.description}</p>
                        <br />
                        <h4 style={{ marginBottom: '8px' }}>Requirements:</h4>
                        <p>{currentJob.requirements}</p>
                    </div>

                    {isSubmitting && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'inherit', zIndex: 100 }}>
                            <div className="spinner"></div>
                        </div>
                    )}
                </div>

                {/* Match Overlay */}
                {showMatch && (
                    <div className="match-overlay">
                        <div className="match-popup" style={{ background: 'white', padding: '48px', borderRadius: '32px', boxShadow: '0 30px 60px rgba(0,0,0,0.3)', color: 'var(--primary)' }}>
                            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎯</div>
                            <h1 style={{ color: 'var(--primary)', WebkitTextFillColor: 'initial', fontSize: '40px' }}>APPLICATION SENT!</h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '400px', margin: '0 auto 32px' }}>
                                You've successfully applied for <strong>{currentJob.title}</strong> at <strong>{currentJob.companyName}</strong> using your profile.
                            </p>
                            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                                <button className="btn-primary" onClick={nextCard} style={{ padding: '16px 40px' }}>
                                    Keep Swiping
                                </button>
                                <button className="btn-secondary" onClick={() => navigate('/jobs')} style={{ padding: '16px 40px' }}>
                                    Browse More
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="swipe-actions">
                <button className="swipe-btn btn-dislike" onClick={() => handleSwipe('left')} disabled={isSubmitting}>
                    <i className="fas fa-times"></i>
                </button>
                <button className="swipe-btn btn-undo" onClick={() => setCurrentIndex(0)} disabled={isSubmitting}>
                    <i className="fas fa-undo"></i>
                </button>
                <button className="swipe-btn btn-like" onClick={() => handleSwipe('right')} disabled={isSubmitting}>
                    <i className="fas fa-heart"></i>
                </button>
            </div>

            <div style={{ marginTop: '20px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                Swipe Right to Apply • Swipe Left to Pass
            </div>
        </div>
    );
};

export default QuickMatch;
