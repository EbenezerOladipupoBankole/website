import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup, db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Login: React.FC = () => {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tempRole, setTempRole] = useState<'talent' | 'employer' | null>(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        const pendingRole = sessionStorage.getItem('pendingRole') as 'talent' | 'employer' | null;
        if (pendingRole) {
            setTempRole(pendingRole);
        } else {
            // Default to talent if no role was selected/passed
            setTempRole('talent');
        }
    }, []);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (mode === 'login') {
                const result = await signInWithEmailAndPassword(auth, email, password);
                localStorage.setItem('authToken', await result.user.getIdToken());
                navigate('/');
            } else {
                // Signup
                const result = await createUserWithEmailAndPassword(auth, email, password);
                const user = result.user;
                
                await updateProfile(user, { displayName: fullName });

                // Save user data & role
                await setDoc(doc(db, 'users', user.uid), {
                    uid: user.uid,
                    email: user.email,
                    displayName: fullName,
                    role: tempRole || 'talent',
                    createdAt: new Date()
                });

                localStorage.setItem('authToken', await user.getIdToken());
                navigate('/');
            }
        } catch (err: any) {
            console.error("Auth failed:", err);
            setError(err.message || "Authentication failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            
            // Save project data & role (only if it's a new user or we want to update)
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                role: tempRole || 'talent',
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

    return (
        <div className="page-container animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '85vh', padding: '20px', background: '#f8fafc' }}>
            <div className="card" style={{ 
                width: '100%', 
                maxWidth: '420px', 
                padding: '40px', 
                background: 'white', 
                borderRadius: '24px', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                border: '1px solid #e2e8f0'
            }}>
                
                <div className="animate-fade-in">
                    <h1 style={{ fontSize: '32px', marginBottom: '8px', textAlign: 'center', fontWeight: 800 }}>
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '32px', fontSize: '15px' }}>
                        {mode === 'login' 
                            ? 'Glad to see you again! Please enter your details.' 
                            : 'Join the #1 professional community in Nigeria.'}
                    </p>

                    <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        {error && (
                            <div style={{ padding: '12px', borderRadius: '12px', background: '#fef2f2', color: '#dc2626', fontSize: '14px', border: '1px solid #fee2e2' }}>
                                <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i>
                                {error}
                            </div>
                        )}

                        {mode === 'signup' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label htmlFor="name" style={{ fontWeight: 600, fontSize: '13px', color: '#444', marginLeft: '4px' }}>Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}

                                    required
                                    style={{
                                        padding: '14px 18px',
                                        borderRadius: '14px',
                                        border: '1.5px solid #e2e8f0',
                                        fontSize: '15px',
                                        background: 'white',
                                        color: '#1e293b',
                                        transition: 'all 0.2s'
                                    }}
                                />
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label htmlFor="email" style={{ fontWeight: 600, fontSize: '13px', color: '#444', marginLeft: '4px' }}>Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}

                                required
                                style={{
                                    padding: '14px 18px',
                                    borderRadius: '14px',
                                    border: '1.5px solid #e2e8f0',
                                    fontSize: '15px',
                                    background: 'white',
                                    color: '#1e293b',
                                    transition: 'all 0.2s'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label htmlFor="password" style={{ fontWeight: 600, fontSize: '13px', color: '#444', marginLeft: '4px' }}>Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                                required
                                style={{
                                    padding: '14px 18px',
                                    borderRadius: '14px',
                                    border: '1.5px solid #e2e8f0',
                                    fontSize: '15px',
                                    background: 'white',
                                    color: '#1e293b',
                                    transition: 'all 0.2s'
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                marginTop: '10px',
                                background: '#1e293b', // Sleek dark blue/black
                                color: 'white',
                                padding: '16px',
                                borderRadius: '14px',
                                border: 'none',
                                fontWeight: 700,
                                fontSize: '16px',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {isLoading ? 'Processing...' : (mode === 'login' ? 'Log In' : 'Sign Up')}
                        </button>
                        
                        <div style={{ position: 'relative', textAlign: 'center', margin: '8px 0' }}>
                            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#e2e8f0', zIndex: 1 }}></div>
                            <span style={{ position: 'relative', background: 'white', padding: '0 15px', zIndex: 2, fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>OR</span>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            style={{
                                background: 'white',
                                color: '#1e293b',
                                padding: '14px',
                                borderRadius: '14px',
                                border: '1.5px solid #e2e8f0',
                                fontWeight: 600,
                                fontSize: '15px',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                transition: 'all 0.2s'
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continue with Google
                        </button>
                    </form>
                </div>

                <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '15px', color: '#64748b' }}>
                    {mode === 'login' ? (
                        <>Don't have an account? <span onClick={() => setMode('signup')} style={{ color: 'var(--accent)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Sign up</span></>
                    ) : (
                        <>Already have an account? <span onClick={() => setMode('login')} style={{ color: 'var(--accent)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Log in</span></>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;

