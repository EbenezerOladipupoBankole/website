import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Get return url from location state or default to /post-job
    const from = (location.state as any)?.from?.pathname || '/post-job';

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            // Mock successful login
            localStorage.setItem('authToken', 'mock-token-12345');
            setIsLoading(false);
            navigate(from, { replace: true });
        }, 1500);
    };

    return (
        <div className="page-container animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <div className="card glass" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '8px', textAlign: 'center' }}>Welcome Back</h1>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '32px' }}>
                    Log in to post jobs and manage candidates.
                </p>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Don't have an account? <a href="#" style={{ color: 'var(--accent)', fontWeight: 600 }}>Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
