import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';

// Interface for Job matching backend/api
interface Job {
    _id: string;
    title: string;
    companyName: string;
    description: string;
    jobType: string;
    category: string;
    requirements: string;
    whatsappContact: string;
    createdAt: any;
}

const categories = [
    "IT - Software Development",
    "IT - Administration",
    "Marketing & Sales",
    "Healthcare",
    "Finance",
    "Education",
    "Customer Service",
    "Engineering",
    "Human Resources",
    "Legal",
    "Design",
    "Hospitality"
];

const featuredJobs = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechFlow Abeokuta",
        location: "Abeokuta, Ogun",
        salary: "₦450k - ₦700k",
        type: "Full-time",
        expiry: "In 14 days",
        description: "We are looking for a passionate React developer to lead our frontend team. You will be responsible for building high-quality, scalable web applications.",
        requirements: ["5+ years React experience", "Strong CSS/HTML knowledge", "Leadership experience"],
        whatsapp: "2348000000000",
        logo: "🚀"
    },
    {
        id: 2,
        title: "Marketing Manager",
        company: "Rock City Media",
        location: "Onikolobo, Abeokuta",
        salary: "₦250k - ₦400k",
        type: "Remote",
        expiry: "In 7 days",
        description: "Join our dynamic team to drive growth for local businesses through innovative digital marketing strategies.",
        requirements: ["Social Media Management", "Content Strategy", "SEO/SEM Basics"],
        whatsapp: "2348000000000",
        logo: "📈"
    },
    {
        id: 3,
        title: "Operations Intern",
        company: "Green Logistics",
        location: "Sagamu Interchange",
        salary: "₦50k - ₦80k",
        type: "Internship",
        expiry: "In 2 days",
        description: "Perfect opportunity for recent graduates to learn logistics operations and supply chain management.",
        requirements: ["Strong organization skills", "Basic Excel knowledge", "Fast learner"],
        whatsapp: "2348000000000",
        logo: "📦"
    }
];

import { auth, db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Home: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<'talent' | 'employer'>('talent');
    const [userRole, setUserRole] = useState<'talent' | 'employer' | null>(null);
    const [realJobs, setRealJobs] = useState<Job[]>([]);
    const [isLoadingJobs, setIsLoadingJobs] = useState(true);
    const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userRef = doc(db, 'users', user.uid);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        const role = userSnap.data()?.role;
                        setUserRole(role);
                        setActiveTab(role || 'talent');
                    }
                } catch (err) {
                    console.error("Error fetching user role:", err);
                }
            } else {
                setUserRole(null);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchLatestJobs = async () => {
            try {
                const data = await api.getJobs();
                setRealJobs(data as Job[]);
            } catch (err) {
                console.error("Failed to fetch jobs on home page:", err);
            } finally {
                setIsLoadingJobs(false);
            }
        };
        fetchLatestJobs();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            },
            { threshold: 0.1 }
        );

        revealRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !revealRefs.current.includes(el)) {
            revealRefs.current.push(el);
        }
    };

    return (
        <div className="job-board-home">
            <header className="home-hero-v2">
                <div className="hero-overlay"></div>
                <div className="container hero-content-v2 animate-fade-in">
                    <h1 className="hero-title-v2">
                        {userRole === 'employer' ? (
                            <>Find Top <span className="text-gradient">Local Talent</span></>
                        ) : (
                            <>Find Your <span className="text-gradient">Dream Job</span></>
                        )}
                    </h1>

                    <div className="quick-categories">
                        {categories.slice(0, 6).map((cat, i) => (
                            <span key={i} className="category-tag">{cat}</span>
                        ))}
                    </div>

                    <div className="search-container-v2 glass">
                        <div className="search-input-group">
                            <i className="fas fa-search"></i>
                            <input
                                type="text"
                                placeholder={userRole === 'employer' ? "Search for skills, roles, or talents..." : "Job title, keywords, or company..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="search-divider"></div>
                        <div className="search-input-group">
                            <i className="fas fa-map-marker-alt"></i>
                            <input type="text" placeholder="Abeokuta, Nigeria" readOnly />
                        </div>
                        <button className="btn-search-v2" onClick={() => {
                            if (userRole === 'employer') {
                                window.location.href = '/browse-talent';
                            } else {
                                document.querySelector('.jobs-section')?.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}>{userRole === 'employer' ? 'Search Talent' : 'Search Jobs'}</button>
                    </div>
                </div>
            </header>

            <section className="how-it-works-section" ref={addToRefs}>
                <div className="container">
                    <div className="section-header-centered">
                        <h2 className="section-title-v3">How ViteHire Works</h2>
                        <p className="section-subtitle">Simplified steps to reach your professional goals.</p>

                        <div className="tab-switcher">
                            <button
                                className={`tab-btn ${activeTab === 'talent' ? 'active' : ''}`}
                                onClick={() => setActiveTab('talent')}
                            >
                                For Talent
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'employer' ? 'active' : ''}`}
                                onClick={() => setActiveTab('employer')}
                            >
                                For Employers
                            </button>
                        </div>
                    </div>

                    <div className="steps-container">
                        {activeTab === 'talent' ? (
                            <div className="steps-grid animate-fade-in">
                                <div className="step-item">
                                    <div className="step-number">01</div>
                                    <h3>Create Profile</h3>
                                    <p>Build a professional resume and showcase your skills to top employers.</p>
                                </div>
                                <div className="step-arrow"><i className="fas fa-chevron-right"></i></div>
                                <div className="step-item">
                                    <div className="step-number">02</div>
                                    <h3>Apply & Get Vetted</h3>
                                    <p>Apply to jobs you love and undergo our quick quality verification.</p>
                                </div>
                                <div className="step-arrow"><i className="fas fa-chevron-right"></i></div>
                                <div className="step-item">
                                    <div className="step-number">03</div>
                                    <h3>Swipe & Match</h3>
                                    <p>Use our Tinder-style matching to apply for jobs instantly with a single swipe.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="steps-grid animate-fade-in">
                                <div className="step-item">
                                    <div className="step-number">01</div>
                                    <h3>Post a Role</h3>
                                    <p>List your job opening with clear requirements and salary ranges.</p>
                                </div>
                                <div className="step-arrow"><i className="fas fa-chevron-right"></i></div>
                                <div className="step-item">
                                    <div className="step-number">02</div>
                                    <h3>Review Top Talent</h3>
                                    <p>Browse through pre-vetted candidates and interview the best fits.</p>
                                </div>
                                <div className="step-arrow"><i className="fas fa-chevron-right"></i></div>
                                <div className="step-item">
                                    <div className="step-number">03</div>
                                    <h3>Build Your Team</h3>
                                    <p>Onboard top professionals and grow your business with confidence.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="filters-section">
                <div className="container">
                    <div className="filters-container">
                        <h3>Filter by Category:</h3>
                        <div className="filters-scroll">
                            {categories.map((cat, i) => (
                                <button key={i} className="filter-pill">{cat}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="jobs-section scroll-reveal" ref={addToRefs}>
                <div className="container">
                    <div className="section-header">
                        <h2>Latest Featured Jobs</h2>
                        <a href="/jobs" className="view-all">View All <i className="fas fa-arrow-right"></i></a>
                    </div>

                    <div className="jobs-grid">
                        {featuredJobs.map(job => (
                            <div key={job.id} className="job-card-container">
                                <div className="job-card-inner">
                                    {/* Front of Card */}
                                    <div className="job-card-v2 job-card-front glass">
                                        <div className="job-card-header">
                                            <div className="company-logo">{job.logo}</div>
                                            <div className="job-meta-top">
                                                <span className="job-type">{job.type}</span>
                                                <span className="job-expiry">{job.expiry}</span>
                                            </div>
                                        </div>

                                        <div className="job-card-body">
                                            <h3 className="job-title-v2">{job.title}</h3>
                                            <p className="job-company-v2">{job.company}</p>
                                            <div className="job-details-v2">
                                                <span><i className="fas fa-map-marker-alt"></i> {job.location}</span>
                                                <span><i className="fas fa-money-bill-wave"></i> {job.salary}</span>
                                            </div>
                                            <p className="job-desc-v2">{job.description}</p>
                                        </div>

                                        <div className="job-card-footer">
                                            <button className="btn-info" onClick={(e) => {
                                                const inner = e.currentTarget.closest('.job-card-inner');
                                                inner?.classList.add('is-flipped');
                                            }}>More Info</button>
                                            <button className="btn-apply-v2" onClick={() => {
                                                window.open(`https://wa.me/${job.whatsapp}?text=Hi, I am interested in the ${job.title} role at ${job.company}.`, '_blank');
                                            }}>Apply Now</button>
                                        </div>
                                    </div>

                                    {/* Back of Card */}
                                    <div className="job-card-v2 job-card-back glass">
                                        <h3>Details & Skills</h3>
                                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{job.description}</p>
                                        <div className="job-requirements">
                                            <h4>Specific Requirements:</h4>
                                            <ul>
                                                {job.requirements?.map((req, idx) => (
                                                    <li key={idx}>{req}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="job-card-footer" style={{ marginTop: 'auto' }}>
                                            <button className="btn-info" onClick={(e) => {
                                                const inner = e.currentTarget.closest('.job-card-inner');
                                                inner?.classList.remove('is-flipped');
                                            }}>Back</button>
                                            <button className="btn-apply-v2" onClick={() => {
                                                window.open(`https://wa.me/${job.whatsapp}?text=Hi, I am interested in the ${job.title} role at ${job.company}.`, '_blank');
                                            }}>Apply Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="section-header" style={{ marginTop: '80px' }}>
                        <h2>Latest Added Jobs</h2>
                        <a href="/jobs" className="view-all">View All</a>
                    </div>
                    <div className="simple-jobs-list">
                        {isLoadingJobs ? (
                            <div style={{ textAlign: 'center', padding: '20px' }}>Loading latest opportunities...</div>
                        ) : realJobs.length > 0 ? (
                            realJobs.slice(0, 5).map(job => (
                                <div key={job._id} className="simple-job-row glass">
                                    <div className="row-left">
                                        <div className="mini-logo">🚀</div>
                                        <div>
                                            <h4>{job.title}</h4>
                                            <p>{job.companyName} • Abeokuta</p>
                                        </div>
                                    </div>
                                    <div className="row-right">
                                        <span className="row-salary">{job.jobType}</span>
                                        <a
                                            href={`https://wa.me/${job.whatsappContact}?text=Hi, I am interested in the ${job.title} role at ${job.companyName}.`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-view-small"
                                            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                                        >
                                            Apply
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                                <p>No real jobs posted yet. Be the first!</p>
                                <a href="/post-job" className="btn-primary" style={{ display: 'inline-block', marginTop: '12px' }}>Post a Job</a>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="learning-preview scroll-reveal" ref={addToRefs}>
                <div className="container">
                    <div className="learning-grid glass">
                        <div className="learning-content">
                            <span className="badge-v2">Learning Hub</span>
                            <h2>Master French & Boost Your Career</h2>
                            <p>Globalize your resume! Join our specialized French language programs designed for professionals in Abeokuta.</p>
                            <ul className="learning-features">
                                <li><i className="fas fa-check-circle"></i> Conversational French Classes</li>
                                <li><i className="fas fa-check-circle"></i> DELF/DALF Exam Preparation</li>
                                <li><i className="fas fa-check-circle"></i> Business French for International Trade</li>
                            </ul>
                            <button className="btn-primary-v3">Explore French Courses</button>
                        </div>
                        <div className="learning-visual">
                            <div className="learning-card-mini card-1">
                                <i className="fas fa-language"></i>
                                <span>A1 Beginner</span>
                            </div>
                            <div className="learning-card-mini card-2">
                                <i className="fas fa-graduation-cap"></i>
                                <span>DELF Prep</span>
                            </div>
                            <div className="learning-card-mini card-3">
                                <i className="fas fa-globe-europe"></i>
                                <span>Business French</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-banner scroll-reveal" ref={addToRefs}>
                <div className="container">
                    <div className="cta-content glass">
                        {userRole === 'employer' ? (
                            <>
                                <h2>Ready to scale your team?</h2>
                                <p>Join thousands of employers finding top talent on ViteHire.</p>
                                <button className="btn-primary-v2" onClick={() => window.location.href='/post-job'}>Post a Job for Free</button>
                            </>
                        ) : userRole === 'talent' ? (
                            <>
                                <h2>Ready for your next opportunity?</h2>
                                <p>Build a stunning profile and get noticed by companies in Abeokuta.</p>
                                <button className="btn-primary-v2" onClick={() => window.location.href='/jobs'}>Explore All Jobs</button>
                            </>
                        ) : (
                            <>
                                <h2>Ready to post a job?</h2>
                                <p>Join thousands of employers finding top talent on ViteHire.</p>
                                <button className="btn-primary-v2" onClick={() => window.location.href='/login'}>Get Started for Free</button>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
