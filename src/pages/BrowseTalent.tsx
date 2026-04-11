import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../services/api';

// Interface matching Backend Talent Model (adapted)
interface Talent {
    _id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    category: string;
    skillsSummary: string; // Backend stores summary text, we might need to parse or display as is
    cvPath: string;
    createdAt: string;
}

const BrowseTalent: React.FC = () => {
    const [talents, setTalents] = useState<Talent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [selectedProfile, setSelectedProfile] = useState<Talent | null>(null);

    useEffect(() => {
        const fetchTalents = async () => {
            try {
                const data = await api.getTalents();
                setTalents(data as Talent[]);
            } catch (err) {
                console.error(err);
                setError('Failed to load talent pool.');
            } finally {
                setLoading(false);
            }
        };

        fetchTalents();
    }, []);

    const filteredTalent = useMemo(() => {
        return talents.filter(talent => {
            const matchesSearch = talent.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                talent.skillsSummary.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === 'All' || talent.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [talents, searchTerm, categoryFilter]);

    if (loading) return (
        <div className="page-container" style={{ display: 'flex', justifyContent: 'center', paddingTop: '100px' }}>
            <div className="spinner"></div>
        </div>
    );

    if (error) return (
        <div className="page-container" style={{ textAlign: 'center', paddingTop: '100px', color: 'var(--error)' }}>
            <h3>{error}</h3>
        </div>
    );

    return (
        <div className="page-container animate-fade-in">
            <div className="container">
                <header style={{ marginBottom: '40px' }}>
                    <h1 className="page-title">Browse Talent Pool</h1>
                    <p className="page-subtitle">Discover and hire the best professionals in Abeokuta.</p>
                </header>

                {/* Filter Bar */}
                <div className="search-container-v2 glass" style={{ marginBottom: '48px', padding: '12px', maxWidth: '900px', margin: '0 auto 48px' }}>
                    <div className="search-input-group" style={{ flex: 2 }}>
                        <i className="fas fa-search" style={{ color: 'var(--accent)', fontSize: '18px' }}></i>
                        <input
                            type="text"
                            placeholder="Search by candidate name or skills..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ fontSize: '18px', padding: '16px' }}
                        />
                    </div>
                    
                    <div className="search-divider" style={{ height: '40px' }}></div>
                    
                    <div className="search-input-group" style={{ flex: 1 }}>
                        <i className="fas fa-briefcase" style={{ color: 'var(--accent)', fontSize: '18px' }}></i>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            style={{ 
                                border: 'none', 
                                padding: '16px', 
                                width: '100%', 
                                fontSize: '18px', 
                                outline: 'none', 
                                background: 'transparent',
                                cursor: 'pointer',
                                color: 'var(--text-primary)',
                                fontWeight: 500
                            }}
                        >
                            <option value="All">All Categories</option>
                            <option value="IT & Software">IT & Software</option>
                            <option value="Sales">Sales</option>
                            <option value="Education">Education</option>
                            <option value="Logistics">Logistics</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <button 
                        className="btn-primary" 
                        style={{ 
                            padding: '16px 32px', 
                            borderRadius: '12px', 
                            fontSize: '16px',
                            transform: 'none',
                            background: 'var(--primary)',
                            margin: '4px'
                        }}
                    >
                        Filter
                    </button>
                </div>

                {/* Talent Grid */}
                {filteredTalent.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                        {filteredTalent.map(talent => (
                            <div key={talent._id} className="card glass" style={{
                                padding: '32px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}
                                onClick={() => setSelectedProfile(talent)}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{
                                        width: '64px', height: '64px',
                                        borderRadius: '50%',
                                        background: 'var(--surface-secondary)',
                                        color: 'var(--primary)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '24px', fontWeight: 700
                                    }}>
                                        {talent.fullName.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '20px', margin: 0 }}>{talent.fullName}</h3>
                                        <p style={{ color: 'var(--accent)', fontWeight: 600, margin: '4px 0 0' }}>{talent.category}</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>
                                    <span>📍 Abeokuta</span>
                                    <span>Joined: {new Date(talent.createdAt).toLocaleDateString()}</span>
                                </div>

                                <p style={{ lineHeight: 1.5, color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {talent.skillsSummary}
                                </p>

                                <button className="btn-outline" style={{ marginTop: '16px', width: '100%' }}>View Profile</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                        <h3>No candidates found.</h3>
                        <p>Try broadening your search criteria.</p>
                    </div>
                )}
            </div>

            {/* Profile Detail Modal */}
            {selectedProfile && (
                <div className="modal-backdrop" style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }} onClick={() => setSelectedProfile(null)}>
                    <div className="card glass modal-content-glass" style={{
                        width: '100%',
                        maxWidth: '700px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        padding: '40px',
                        background: 'var(--surface)',
                        position: 'relative'
                    }} onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedProfile(null)}
                            style={{
                                position: 'absolute',
                                top: '20px', right: '20px',
                                background: 'transparent', border: 'none',
                                fontSize: '24px', cursor: 'pointer', color: 'var(--text-muted)'
                            }}
                        >×</button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                            <div style={{
                                width: '100px', height: '100px',
                                borderRadius: '50%',
                                background: 'var(--accent)',
                                color: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '40px', fontWeight: 700
                            }}>
                                {selectedProfile.fullName.charAt(0)}
                            </div>
                            <div>
                                <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>{selectedProfile.fullName}</h2>
                                <p style={{ fontSize: '20px', color: 'var(--accent)', fontWeight: 600 }}>{selectedProfile.category}</p>
                                <div style={{ display: 'flex', gap: '16px', marginTop: '8px', color: 'var(--text-secondary)' }}>
                                    <span>📍 Abeokuta</span>
                                    <span>📧 {selectedProfile.email}</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '18px', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>Skills & Bio</h3>
                            <p style={{ lineHeight: 1.8, fontSize: '16px', whiteSpace: 'pre-line' }}>{selectedProfile.skillsSummary}</p>
                        </div>

                        <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
                            <a
                                href={`tel:${selectedProfile.phoneNumber}`}
                                className="btn-primary"
                                style={{ flex: 1, padding: '16px', fontSize: '16px', textDecoration: 'none', textAlign: 'center', display: 'block' }}
                            >
                                Call {selectedProfile.phoneNumber}
                            </a>
                            <a
                                href={`http://localhost:5000/${selectedProfile.cvPath}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline"
                                style={{ flex: 1, padding: '16px', fontSize: '16px', textDecoration: 'none', textAlign: 'center', display: 'block' }}
                            >
                                View CV
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrowseTalent;
