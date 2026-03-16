import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../services/api';

// Interface matching Backend Job Model
interface Job {
    _id: string;
    title: string;
    companyName: string;
    description: string;
    jobType: string;
    category: string;
    requirements: string;
    whatsappContact: string;
    createdAt: string;
}

const Jobs: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('All Locations'); // Note: Backend doesn't have location field yet, assuming Abeokuta
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

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

    // Filter Logic
    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.companyName.toLowerCase().includes(searchTerm.toLowerCase());
            // const matchesLocation = locationFilter === 'All Locations' || job.location.includes(locationFilter); // Location not in backend yet
            return matchesSearch;
        });
    }, [jobs, searchTerm, locationFilter]);

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
                <div className="jobs-filter-bar card glass" style={{ marginBottom: '32px', padding: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        placeholder="Search job title or company..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', minWidth: '200px', fontSize: '16px' }}
                    />
                    <select
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', minWidth: '150px', fontSize: '16px' }}
                    >
                        <option>All Locations</option>
                        <option>Abeokuta</option>
                    </select>
                </div>

                {/* Job Grid */}
                {filteredJobs.length > 0 ? (
                    <div className="jobs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                        {filteredJobs.map(job => (
                            <div key={job._id} onClick={() => setSelectedJob(job)} className="job-card card glass" style={{
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

            {/* Job Details Modal */}
            {selectedJob && (
                <div className="modal-backdrop" style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }} onClick={() => setSelectedJob(null)}>
                    <div className="modal-content card glass" style={{
                        width: '100%',
                        maxWidth: '600px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        background: 'var(--surface)',
                        padding: '0',
                        position: 'relative'
                    }} onClick={e => e.stopPropagation()}>

                        {/* Modal Header */}
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div>
                                <h2 style={{ fontSize: '24px', marginBottom: '4px' }}>{selectedJob.title}</h2>
                                <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>{selectedJob.companyName} • Abeokuta</p>
                            </div>
                            <button onClick={() => setSelectedJob(null)} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-muted)' }}>×</button>
                        </div>

                        {/* Modal Body */}
                        <div style={{ padding: '24px' }}>
                            <div style={{ marginBottom: '24px' }}>
                                <h4 style={{ fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Description</h4>
                                <p style={{ lineHeight: 1.6 }}>{selectedJob.description}</p>
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <h4 style={{ fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Requirements</h4>
                                <p style={{ lineHeight: 1.6, whiteSpace: 'pre-line' }}>{selectedJob.requirements}</p>
                            </div>

                            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                                <h3 style={{ marginBottom: '16px' }}>Apply for this role</h3>
                                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                                    Interested? Send your CV/Resume directly to the employer via WhatsApp.
                                </p>
                                <a
                                    href={`https://wa.me/${selectedJob.whatsappContact}?text=Hi, I am interested in the ${selectedJob.title} role at ${selectedJob.companyName}.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: '14px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '8px',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <span>Apply via WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Jobs;
