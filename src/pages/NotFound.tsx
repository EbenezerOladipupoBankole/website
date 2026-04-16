import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="not-found-page" style={{
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '20px'
        }}>
            <h1 style={{ fontSize: '120px', color: 'var(--accent)', marginBottom: '0' }}>404</h1>
            <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>Oops! Page Not Found</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', marginBottom: '32px' }}>
                It looks like the job you're looking for has been filled or the page has moved.
            </p>
            <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
