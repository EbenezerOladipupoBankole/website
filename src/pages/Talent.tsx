import React, { useState } from 'react';
import { api } from '../services/api';

const Talent: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        location: 'Lagos', // Not used in backend explicitly yet, but could be part of bio
        role: '', // -> Category in backend
        experience: 'Entry Level', // Not used in backend explicitly
        bio: '', // -> skillsSummary in backend
        category: 'IT & Software' // Added to match backend
    });
    const [cvFile, setCvFile] = useState<File | null>(null);

    const [skillInput, setSkillInput] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleAddSkill = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            e.preventDefault();
            if (!skills.includes(skillInput.trim())) {
                setSkills([...skills, skillInput.trim()]);
            }
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCvFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        if (!cvFile) {
            setError('Please upload your CV/Resume (PDF only).');
            setIsSubmitting(false);
            return;
        }

        try {
            // Prepare FormData for backend
            const submissionData = new FormData();
            submissionData.append('fullName', formData.fullName);
            submissionData.append('phoneNumber', formData.phone); // Backend expects phoneNumber
            submissionData.append('email', formData.email);
            submissionData.append('category', formData.category); // Using role/category

            // Combine Bio + Skills + Experience into 'skillsSummary' for backend
            const summary = `
Role: ${formData.role}
Experience: ${formData.experience}
Location: ${formData.location}

Skills: ${skills.join(', ')}

Bio:
${formData.bio}
            `;
            submissionData.append('skillsSummary', summary.trim());
            submissionData.append('cv', cvFile);

            await api.registerTalent(submissionData);
            setIsSuccess(true);
            window.scrollTo(0, 0);
        } catch (err: any) {
            console.error(err);
            setError('Failed to submit profile. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="page-container animate-fade-in" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="card glass" style={{ maxWidth: '600px', textAlign: 'center', padding: '60px' }}>
                    <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎉</div>
                    <h1 style={{ marginBottom: '16px' }}>Welcome to the Pool!</h1>
                    <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.6 }}>
                        Your profile has been created successfully. Employers can now discover your unique talents.
                        We've sent a confirmation email to <strong>{formData.email}</strong>.
                    </p>
                    <button
                        className="btn-primary"
                        onClick={() => {
                            setIsSuccess(false);
                            setFormData({ fullName: '', email: '', phone: '', location: 'Lagos', role: '', experience: 'Entry Level', bio: '', category: 'IT & Software' });
                            setSkills([]);
                            setCvFile(null);
                        }}
                    >
                        Success
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container animate-fade-in">
            <div className="container" style={{ maxWidth: '900px' }}>
                <header style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <h1 className="page-title">Join the Talent Pool</h1>
                    <p className="page-subtitle">Create your profile and let top companies across Nigeria compete for you.</p>
                </header>

                <div className="card glass" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ background: 'var(--surface-secondary)', padding: '24px', borderBottom: '1px solid var(--border)' }}>
                        <h3 style={{ margin: 0 }}>Basic Information</h3>
                    </div>

                    <form onSubmit={handleSubmit} style={{ padding: '32px' }}>
                        {error && <div style={{ color: 'var(--error)', marginBottom: '20px', fontWeight: 600 }}>{error}</div>}

                        <div className="form-grid" style={{ marginBottom: '32px' }}>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                <label style={{ fontWeight: 600, fontSize: '15px', color: 'var(--primary)' }}>Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                    style={{ padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '16px', outline: 'none' }}
                                />
                            </div>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                <label style={{ fontWeight: 600, fontSize: '15px', color: 'var(--primary)' }}>Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    style={{ padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '16px', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div className="form-grid" style={{ marginBottom: '32px' }}>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                <label style={{ fontWeight: 600, fontSize: '15px', color: 'var(--primary)' }}>Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    style={{ padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '16px', outline: 'none' }}
                                />
                            </div>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                <label style={{ fontWeight: 600, fontSize: '15px', color: 'var(--primary)' }}>Location (City)</label>
                                <select
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    style={{ padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '16px', outline: 'none', background: 'white' }}
                                >
                                    <option>Lagos</option>
                                    <option>Abuja</option>
                                    <option>Port Harcourt</option>
                                    <option>Ibadan</option>
                                    <option>Kano</option>
                                    <option>Abeokuta</option>
                                    <option>Enugu</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ margin: '40px -32px', borderTop: '1px solid var(--border)' }}></div>

                        <h3 style={{ marginBottom: '32px', fontSize: '24px' }}>Professional Profile</h3>

                        <div className="form-grid" style={{ marginBottom: '32px' }}>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                <label style={{ fontWeight: 600, fontSize: '15px', color: 'var(--primary)' }}>Category</label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    style={{ padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '16px', outline: 'none', background: 'white' }}
                                >
                                    <option value="IT & Software">IT & Software</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Education">Education</option>
                                    <option value="Logistics">Logistics</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                <label style={{ fontWeight: 600, fontSize: '15px', color: 'var(--primary)' }}>Experience Level</label>
                                <select
                                    value={formData.experience}
                                    onChange={e => setFormData({ ...formData, experience: e.target.value })}
                                    style={{ padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '16px', outline: 'none', background: 'white' }}
                                >
                                    <option>Intern / Student</option>
                                    <option>Entry Level (0-2 years)</option>
                                    <option>Mid Level (3-5 years)</option>
                                    <option>Senior Level (5+ years)</option>
                                    <option>Executive</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gap: '8px', marginBottom: '32px' }}>
                            <label style={{ fontWeight: 600, fontSize: '15px', color: 'var(--primary)' }}>Specific Job Title</label>
                            <input
                                type="text"
                                required
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                                style={{ padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '16px', outline: 'none' }}
                            />
                        </div>

                        <div style={{ display: 'grid', gap: '8px', marginBottom: '32px' }}>
                            <label style={{ fontWeight: 600, fontSize: '15px', color: 'var(--primary)' }}>Skills (Press Enter to add)</label>
                            <input
                                type="text"
                                value={skillInput}
                                onChange={e => setSkillInput(e.target.value)}
                                onKeyDown={handleAddSkill}
                                style={{ padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '16px', outline: 'none' }}
                            />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '12px' }}>
                                {skills.map((skill, index) => (
                                    <span key={index} style={{
                                        background: 'var(--accent)',
                                        color: 'white',
                                        padding: '8px 18px',
                                        borderRadius: '100px',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
                                    }}>
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(skill)}
                                            style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 0, fontSize: '18px', display: 'flex', alignItems: 'center' }}
                                        >×</button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gap: '8px', marginBottom: '32px' }}>
                            <label style={{ fontWeight: 600, fontSize: '15px', color: 'var(--primary)' }}>Upload Resume/CV (PDF Only)</label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                required
                                style={{
                                    padding: '24px',
                                    borderRadius: '12px',
                                    border: '2px dashed var(--border)',
                                    background: 'var(--surface-secondary)',
                                    width: '100%',
                                    cursor: 'pointer'
                                }}
                            />
                            <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>Required. PDF format only (Max 5MB)</span>
                        </div>

                        <div style={{ display: 'grid', gap: '8px', marginBottom: '40px' }}>
                            <label style={{ fontWeight: 600, fontSize: '15px', color: 'var(--primary)' }}>Professional Bio</label>
                            <textarea
                                rows={6}
                                value={formData.bio}
                                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                style={{ padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '16px', fontFamily: 'inherit', resize: 'vertical', outline: 'none', lineHeight: 1.6 }}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-primary"
                                style={{ padding: '18px 64px', fontSize: '18px', borderRadius: '14px', transform: 'none' }}
                            >
                                {isSubmitting ? 'Uploading Profile...' : 'Create My Professional Profile'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Talent;
