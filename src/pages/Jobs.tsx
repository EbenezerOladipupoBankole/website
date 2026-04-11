import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../services/api';
import { auth } from '../services/firebase';

// Interface matching Backend Job Model
interface Job {
    _id: string;
    title: string;
    companyName: string;
    description: string;
    jobType: string;
    category: string;
    requirements: string;
    createdAt: string;
}

const Jobs: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('All Locations'); 
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    // Application Form State
    const [isApplying, setIsApplying] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);
    const [appData, setAppData] = useState({
        fullName: auth.currentUser?.displayName || '',
        email: auth.currentUser?.email || '',
        phone: '',
    });
    const [resume, setResume] = useState<File | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await api.getJobs();
                setJobs(data as Job[]);
            } catch (err) {
                console.error(err);
                setError('Failed to load jobs. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.companyName.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        });
    }, [jobs, searchTerm, locationFilter]);

    const handleApply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedJob) return;

        setFormLoading(true);
        try {
            const formData = new FormData();
            formData.append('fullName', appData.fullName);
            formData.append('email', appData.email);
            formData.append('phone', appData.phone);
            if (resume) formData.append('resume', resume);

            await api.submitApplication(selectedJob._id, formData);
            setFormSuccess(true);
        } catch (err) {
            console.error(err);
            alert("Failed to submit application. Please try again.");
        } finally {
            setFormLoading(false);
        }
    };

    const resetForm = () => {
        setIsApplying(false);
        setFormSuccess(false);
        setResume(null);
    };

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
        <div className="page-container animate-fade-in" style={{ position: 'relative' }}>
            <div className="container">
                <header style={{ marginBottom: '40px' }}>
                    <h1 className="page-title">Discover Opportunities</h1>
                    <p className="page-subtitle">Find the perfect role that matches your skills in Abeokuta.</p>
                </header>

                {/* Search Bar */}
                <div className="search-container-v2 glass" style={{ marginBottom: '48px', padding: '12px', maxWidth: '900px', margin: '0 auto 48px' }}>
                    <div className="search-input-group" style={{ flex: 2 }}>
                        <i className="fas fa-search" style={{ color: 'var(--accent)', fontSize: '18px' }}></i>
                        <input
                            type="text"
                            placeholder="Search job title, company, or keywords..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ fontSize: '18px', padding: '16px' }}
                        />
                    </div>
                    
                    <div className="search-divider" style={{ height: '40px' }}></div>
                    
                    <div className="search-input-group" style={{ flex: 1 }}>
                        <i className="fas fa-map-marker-alt" style={{ color: 'var(--accent)', fontSize: '18px' }}></i>
                        <select
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
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
                            <option>All Locations</option>
                            <option>Abeokuta</option>
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
                        Search
                    </button>
                </div>

                {/* Job Grid */}
                {filteredJobs.length > 0 ? (
                    <div className="jobs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                        {filteredJobs.map(job => (
                            <div key={job._id} onClick={() => { setSelectedJob(job); resetForm(); }} className="job-card card glass" style={{
                                padding: '24px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <span className="job-badge" style={{
                                        fontSize: '12px',
                                        padding: '4px 8px',
                                        borderRadius: '100px',
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        color: 'var(--accent)',
                                        fontWeight: 600
                                    }}>{job.jobType}</span>
                                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                                        {new Date(job.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '20px', marginBottom: '4px' }}>{job.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{job.companyName}</p>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
                                    <span>📍</span>
                                    Abeokuta
                                </div>

                                <div style={{ marginTop: '12px', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 700, color: 'var(--primary)' }}>View to Apply</span>
                                    <button className="btn-outline" style={{ fontSize: '14px', padding: '8px 16px' }}>View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        <h3>No jobs found matching your search.</h3>
                        <p>Try adjusting your filters.</p>
                    </div>
                )}
            </div>

            {selectedJob && (
                <div className="modal-backdrop" style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }} onClick={() => setSelectedJob(null)}>
                    <div className="modal-content card modal-content-glass" style={{
                        width: '100%',
                        maxWidth: '600px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        background: 'white',
                        padding: '0',
                        position: 'relative',
                        borderRadius: '24px'
                    }} onClick={e => e.stopPropagation()}>

                        <div style={{ padding: '32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div>
                                <h2 style={{ fontSize: '28px', marginBottom: '8px', color: 'var(--primary)' }}>{selectedJob.title}</h2>
                                <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>{selectedJob.companyName} • Abeokuta</p>
                            </div>
                            <button onClick={() => setSelectedJob(null)} style={{ background: 'var(--surface-secondary)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', fontSize: '20px', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                        </div>

                        <div style={{ padding: '32px' }}>
                            {!isApplying ? (
                                <>
                                    <div style={{ marginBottom: '32px' }}>
                                        <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '12px' }}>Job Description</h4>
                                        <p style={{ lineHeight: 1.7, color: 'var(--text-primary)', fontSize: '16px' }}>{selectedJob.description}</p>
                                    </div>

                                    <div style={{ marginBottom: '32px' }}>
                                        <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '12px' }}>Requirements</h4>
                                        <p style={{ lineHeight: 1.7, color: 'var(--text-primary)', fontSize: '16px', whiteSpace: 'pre-line' }}>{selectedJob.requirements}</p>
                                    </div>

                                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
                                        <button 
                                            onClick={() => setIsApplying(true)}
                                            className="btn-primary"
                                            style={{ width: '100%', padding: '16px', fontSize: '16px', borderRadius: '14px' }}
                                        >
                                            Apply for this Role
                                        </button>
                                    </div>
                                </>
                            ) : formSuccess ? (
                                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
                                    <h2 style={{ marginBottom: '12px' }}>Application Submitted!</h2>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                                        Your information has been sent to {selectedJob.companyName}. They will contact you if you are a good match.
                                    </p>
                                    <button 
                                        onClick={() => setSelectedJob(null)}
                                        className="btn-primary"
                                        style={{ width: '100%', padding: '14px', borderRadius: '12px' }}
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleApply}>
                                    <h3 style={{ marginBottom: '24px', fontSize: '20px' }}>Submit Your Application</h3>
                                    
                                    <div style={{ marginBottom: '24px' }}>
                                        <label style={{ display: 'block', fontSize: '15px', fontWeight: 600, marginBottom: '10px', color: 'var(--primary)' }}>Full Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            className="search-input"
                                            value={appData.fullName}
                                            onChange={e => setAppData({...appData, fullName: e.target.value})}
                                            style={{ 
                                                width: '100%', 
                                                borderRadius: '14px', 
                                                padding: '16px 20px', 
                                                fontSize: '16px',
                                                border: '1px solid var(--border)',
                                                outline: 'none',
                                                transition: 'border-color 0.2s'
                                            }}
                                        />
                                    </div>

                                    <div style={{ marginBottom: '24px' }}>
                                        <label style={{ display: 'block', fontSize: '15px', fontWeight: 600, marginBottom: '10px', color: 'var(--primary)' }}>Email Address</label>
                                        <input 
                                            type="email" 
                                            required
                                            className="search-input"
                                            value={appData.email}
                                            onChange={e => setAppData({...appData, email: e.target.value})}
                                            style={{ 
                                                width: '100%', 
                                                borderRadius: '14px', 
                                                padding: '16px 20px', 
                                                fontSize: '16px',
                                                border: '1px solid var(--border)',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>

                                    <div style={{ marginBottom: '24px' }}>
                                        <label style={{ display: 'block', fontSize: '15px', fontWeight: 600, marginBottom: '10px', color: 'var(--primary)' }}>Phone Number</label>
                                        <input 
                                            type="tel" 
                                            required
                                            placeholder="e.g. 08012345678"
                                            className="search-input"
                                            value={appData.phone}
                                            onChange={e => setAppData({...appData, phone: e.target.value})}
                                            style={{ 
                                                width: '100%', 
                                                borderRadius: '14px', 
                                                padding: '16px 20px', 
                                                fontSize: '16px',
                                                border: '1px solid var(--border)',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>

                                    <div style={{ marginBottom: '32px' }}>
                                        <label style={{ display: 'block', fontSize: '15px', fontWeight: 600, marginBottom: '10px', color: 'var(--primary)' }}>Upload Resume/CV</label>
                                        <div style={{ position: 'relative' }}>
                                            <input 
                                                type="file" 
                                                required
                                                accept=".pdf,.doc,.docx"
                                                onChange={e => setResume(e.target.files ? e.target.files[0] : null)}
                                                style={{ 
                                                    width: '100%', 
                                                    padding: '24px', 
                                                    borderRadius: '14px', 
                                                    border: '2px dashed var(--border)',
                                                    background: 'var(--surface-secondary)',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        </div>
                                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '10px' }}>Accepted formats: PDF, Word (Max 5MB)</p>
                                    </div>

                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <button 
                                            type="button"
                                            onClick={() => setIsApplying(false)}
                                            className="btn-secondary"
                                            style={{ flex: 1, padding: '14px', borderRadius: '12px' }}
                                        >
                                            Back
                                        </button>
                                        <button 
                                            type="submit"
                                            disabled={formLoading}
                                            className="btn-primary"
                                            style={{ flex: 1, padding: '14px', borderRadius: '12px' }}
                                        >
                                            {formLoading ? 'Submitting...' : 'Submit Application'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Jobs;
