import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../services/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const RoleSelection: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                navigate('/login');
                return;
            }

            // Check if user already has a role
            try {
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);
                
                if (userSnap.exists() && userSnap.data()?.role) {
                    // Already has a role, go to home
                    navigate('/');
                } else {
                    setIsLoading(false);
                }
            } catch (err) {
                console.error("Error checking role:", err);
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const selectRole = async (role: 'talent' | 'employer') => {
        const user = auth.currentUser;
        if (!user) return;

        setIsSaving(true);
        try {
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                role: role,
                createdAt: new Date()
            }, { merge: true });

            // Success, go to home or specific dashboard
            navigate(role === 'employer' ? '/post-job' : '/jobs');
        } catch (err) {
            console.error("Error saving role:", err);
            alert("Failed to save your selection. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '40px', marginBottom: '20px', color: 'var(--accent)' }}>
                        <i className="fas fa-circle-notch fa-spin"></i>
                    </div>
                    <p>Preparing your experience...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '16px' }}>Tell us <span className="text-gradient">Who You Are</span></h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '18px', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
                    Personalize your ViteHire experience by choosing your primary goal on the platform.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                    {/* Talent Option */}
                    <div 
                        className="card glass hover-lift" 
                        onClick={() => !isSaving && selectRole('talent')}
                        style={{ padding: '32px 24px', cursor: 'pointer', transition: 'all 0.3s', border: '2px solid transparent' }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                    >
                        <div style={{ fontSize: '48px', marginBottom: '24px' }}>🙋‍♂️</div>
                        <h2>I'm a Talent</h2>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
                            I want to find jobs, build my resume, and match with top employers across Nigeria.
                        </p>
                    </div>

                    {/* Employer Option */}
                    <div 
                        className="card glass hover-lift" 
                        onClick={() => !isSaving && selectRole('employer')}
                        style={{ padding: '32px 24px', cursor: 'pointer', transition: 'all 0.3s', border: '2px solid transparent' }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                    >
                        <div style={{ fontSize: '48px', marginBottom: '24px' }}>🏢</div>
                        <h2>I'm an Employer</h2>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
                            I want to post job openings, find skilled talent, and grow my team.
                        </p>
                    </div>
                </div>

                {isSaving && (
                    <p style={{ marginTop: '24px', color: 'var(--accent)', fontWeight: 600 }}>Saving your choice...</p>
                )}
            </div>
        </div>
    );
};

export default RoleSelection;
