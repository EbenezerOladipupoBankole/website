import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup, db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [stage, setStage] = useState<'role' | 'login'>('role');
    const [tempRole, setTempRole] = useState<'talent' | 'employer' | null>(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        const pendingRole = sessionStorage.getItem('pendingRole') as 'talent' | 'employer' | null;
        if (pendingRole) {
            setTempRole(pendingRole);
            setStage('login');
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Simulate API call for email/password
        setTimeout(async () => {
            // Mock successful login
            localStorage.setItem('authToken', 'mock-token-12345');
            
            // If we have a role from stage 1, we would normally save it here
            // but since it's a mock, we'll just navigate
            setIsLoading(false);
            navigate('/');
        }, 1500);
    };

    const handleGoogleLogin = async () => {
        if (!tempRole) return;
        
        setIsLoading(true);
        setError(null);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            
            // Save the role chosen in Stage 1 to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                role: tempRole,
                createdAt: new Date()
            }, { merge: true });

            localStorage.setItem('authToken', await user.getIdToken());
            sessionStorage.removeItem('pendingRole');
            navigate('/');
        } catch (err: any) {
            console.error("Google login failed:", err);
            setError(err.message || "Failed to log in with Google");
        } finally {
            setIsLoading(false);
        }
    };

    const selectRole = (role: 'talent' | 'employer') => {
        setTempRole(role);
        setStage('login');
    };

    return (
        <div className="page-container animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '20px' }}>
            <div className="card glass" style={{ width: '100%', maxWidth: 'min(400px, 90vw)', padding: 'clamp(24px, 5vw, 40px)' }}>
                
                {stage === 'role' ? (
                    <div className="animate-fade-in">
                        <h1 style={{ fontSize: '28px', marginBottom: '12px', textAlign: 'center' }}>Welcome to <span className="text-gradient">ViteHire</span></h1>
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '32px' }}>
                            To get started, please tell us who you are.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <button 
                                className="card glass hover-lift" 
                                onClick={() => selectRole('talent')}
                                style={{ 
                                    padding: '20px', 
                                    width: '100%', 
                                    textAlign: 'left', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '16px',
                                    border: '1px solid var(--border)',
                                    background: 'white'
                                }}
                            >
                                <span style={{ fontSize: '28px' }}>🙋‍♂️</span>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '18px' }}>I'm a Talent</div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>I'm looking for job opportunities</div>
                                </div>
                            </button>

                            <button 
                                className="card glass hover-lift" 
                                onClick={() => selectRole('employer')}
                                style={{ 
                                    padding: '20px', 
                                    width: '100%', 
                                    textAlign: 'left', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '16px',
                                    border: '1px solid var(--border)',
                                    background: 'white'
                                }}
                            >
                                <span style={{ fontSize: '28px' }}>🏢</span>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '18px' }}>I'm an Employer</div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>I'm looking to hire top talent</div>
                                </div>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <button 
                            onClick={() => setStage('role')} 
                            style={{ 
                                background: 'transparent', 
                                border: 'none', 
                                color: 'var(--text-muted)', 
                                fontSize: '14px', 
                                marginBottom: '20px', 
                                padding: 0, 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '4px',
                                cursor: 'pointer' 
                            }}
                        >
                            <i className="fas fa-arrow-left"></i> Change Role ({tempRole === 'talent' ? 'Talent' : 'Employer'})
                        </button>

                        <h1 style={{ fontSize: '32px', marginBottom: '8px', textAlign: 'center' }}>Sign In</h1>
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '32px' }}>
                            {tempRole === 'employer' ? 'Log in to manage your company dashboard.' : 'Log in to find and apply for jobs.'}
                        </p>

                        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {error && (
                                <div style={{ padding: '10px', borderRadius: '8px', background: '#fee2e2', color: '#dc2626', fontSize: '14px', border: '1px solid #fecaca' }}>
                                    {error}
                                </div>
                            )}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label htmlFor="email" style={{ fontWeight: 600, fontSize: '14px' }}>Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    style={{
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        border: '1px solid var(--border)',
                                        fontSize: '16px',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label htmlFor="password" style={{ fontWeight: 600, fontSize: '14px' }}>Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    style={{
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        border: '1px solid var(--border)',
                                        fontSize: '16px',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                style={{
                                    marginTop: '12px',
                                    background: 'var(--accent)',
                                    color: 'white',
                                    padding: '14px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    opacity: isLoading ? 0.7 : 1
                                }}
                            >
                                {isLoading ? 'Logging in...' : 'Log In'}
                            </button>
                            
                            <div style={{ position: 'relative', textAlign: 'center', margin: '10px 0' }}>
                                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--border)', zIndex: 1 }}></div>
                                <span style={{ position: 'relative', background: 'white', padding: '0 10px', zIndex: 2, fontSize: '14px', color: 'var(--text-muted)' }}>OR</span>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                style={{
                                    background: 'white',
                                    color: 'var(--text-primary)',
                                    padding: '12px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border)',
                                    fontWeight: 600,
                                    fontSize: '16px',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <i className="fab fa-google" style={{ color: '#4285F4' }}></i>
                                Continue with Google
                            </button>
                        </form>
                    </div>
                )}

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Don't have an account? <a href="#" style={{ color: 'var(--accent)', fontWeight: 600 }}>Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
