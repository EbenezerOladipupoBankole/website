import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Job {
    _id: string;
    title: string;
    companyName: string;
    description: string;
    jobType: string;
    category: string;
    requirements: string;
    whatsappContact: string;
    createdAt: any;
    logo?: string;
}

const QuickMatch: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [swipeClass, setSwipeClass] = useState('');
    const [showMatch, setShowMatch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await api.getJobs();
                // Filter out any jobs already seen if we had a tracking system
                // For now, just load them all
                setJobs(data as Job[]);
            } catch (err) {
                console.error("Match error:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const handleSwipe = (direction: 'left' | 'right') => {
        setSwipeClass(`swipe-${direction}`);

        setTimeout(() => {
            if (direction === 'right') {
                // In a real app, this would trigger an application in the DB
                setShowMatch(true);
            } else {
                nextCard();
            }
        }, 300);
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
                    <p>Check back later for new opportunities in Abeokuta.</p>
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
                            <span>Abeokuta, Ogun</span>
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
                </div>

                {/* Match Overlay */}
                {showMatch && (
                    <div className="match-overlay">
                        <div className="match-popup">
                            <h1>IT'S A MATCH!</h1>
                            <p>You've applied for <strong>{currentJob.title}</strong> at <strong>{currentJob.companyName}</strong>!</p>
                            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                                <button className="btn-primary" onClick={() => {
                                    window.open(`https://wa.me/${currentJob.whatsappContact}?text=Hi, I applied for the ${currentJob.title} role via ViteHire Match!`, '_blank');
                                    nextCard();
                                }}>
                                    Message Employer
                                </button>
                                <button className="btn-secondary" onClick={nextCard}>
                                    Keep Swiping
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="swipe-actions">
                <button className="swipe-btn btn-dislike" onClick={() => handleSwipe('left')}>
                    <i className="fas fa-times"></i>
                </button>
                <button className="swipe-btn btn-undo" onClick={() => setCurrentIndex(0)}>
                    <i className="fas fa-undo"></i>
                </button>
                <button className="swipe-btn btn-like" onClick={() => handleSwipe('right')}>
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
