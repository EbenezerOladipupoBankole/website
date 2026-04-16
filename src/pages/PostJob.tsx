import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const PostJob: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [jobData, setJobData] = useState({
        title: '',
        companyName: '', 
        category: 'IT & Software', 
        jobType: 'Full-time',
        description: '',
        requirements: '', 
    });

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login', { state: { from: { pathname: '/post-job' } } });
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await api.postJob(jobData);
            alert('Job posted successfully!');
            navigate('/jobs');
        } catch (error) {
            console.error(error);
            alert('Failed to post job. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="page-container animate-fade-in">
            <div className="container" style={{ maxWidth: '800px' }}>
                <header style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <h1 className="page-title">Post a Job</h1>
                    <p className="page-subtitle">Find your next star employee across Nigeria.</p>
                </header>

                <div className="card glass">
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '24px' }}>
                        <div style={{ display: 'grid', gap: '8px' }}>
                            <label style={{ fontWeight: 600 }}>Job Title</label>
                            <input
                                type="text"
                                required
                                value={jobData.title}
                                onChange={e => setJobData({ ...jobData, title: e.target.value })}

                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.8)' }}
                            />
                        </div>

                        <div className="form-grid">
                            <div style={{ display: 'grid', gap: '8px' }}>
                                <label style={{ fontWeight: 600 }}>Company Name</label>
                                <input
                                    type="text"
                                    required
                                    value={jobData.companyName}
                                    onChange={e => setJobData({ ...jobData, companyName: e.target.value })}

                                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.8)' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gap: '8px' }}>
                                <label style={{ fontWeight: 600 }}>Job Type</label>
                                <select
                                    value={jobData.jobType}
                                    onChange={e => setJobData({ ...jobData, jobType: e.target.value })}
                                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.8)' }}
                                >
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Contract</option>
                                    <option>Internship</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                <label style={{ fontWeight: 600 }}>Category</label>
                                <select
                                    value={jobData.category}
                                    onChange={e => setJobData({ ...jobData, category: e.target.value })}
                                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.8)' }}
                                >
                                    <option value="IT & Software">IT & Software</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Education">Education</option>
                                    <option value="Logistics">Logistics</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gap: '8px' }}>
                            <label style={{ fontWeight: 600 }}>Job Description</label>
                            <textarea
                                rows={4}
                                required
                                value={jobData.description}
                                onChange={e => setJobData({ ...jobData, description: e.target.value })}

                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.8)', fontFamily: 'inherit' }}
                            />
                        </div>

                        <div style={{ display: 'grid', gap: '8px' }}>
                            <label style={{ fontWeight: 600 }}>Requirements</label>
                            <textarea
                                rows={4}
                                required
                                value={jobData.requirements}
                                onChange={e => setJobData({ ...jobData, requirements: e.target.value })}

                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.8)', fontFamily: 'inherit' }}
                            />
                        </div>

                        <div style={{ paddingTop: '16px' }}>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn-primary"
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    fontSize: '18px',
                                    background: 'var(--accent)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontWeight: 700
                                }}
                            >
                                {isLoading ? 'Posting...' : 'Post Job Now'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostJob;
