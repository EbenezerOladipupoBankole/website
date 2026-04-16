import React from 'react';

const CareerBlogs: React.FC = () => {
    const blogs = [
        {
            id: 1,
            title: "Top 10 Skills Employers in Nigeria Are Looking For",
            excerpt: "Discover the most in-demand skills that can help you land your dream job in Nigeria.",
            date: "Oct 12, 2025",
            author: "ViteHire Team"
        },
        {
            id: 2,
            title: "Remote Work vs. On-site: What Works Best in 2026?",
            excerpt: "Analyzing the pros and cons of different work models in the current local economy.",
            date: "Sep 28, 2025",
            author: "Sarah Johnson"
        },
        {
            id: 3,
            title: "How to Ace Your Tech Interview",
            excerpt: "Practical tips and strategies to prepare for technical interviews at top local tech hubs.",
            date: "Sep 15, 2025",
            author: "David O."
        }
    ];

    return (
        <div className="page-container animate-fade-in">
            <div className="container">
                <h1 className="page-title">Career Blogs</h1>
                <p className="page-subtitle">Insights, trends, and advice for your professional journey.</p>

                <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    {blogs.map(blog => (
                        <div key={blog.id} className="card glass" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ height: '200px', background: 'var(--surface-secondary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                                <i className="fas fa-image" style={{ fontSize: '48px', opacity: 0.5 }}></i>
                            </div>
                            <div>
                                <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600 }}>{blog.date} • {blog.author}</span>
                                <h3 style={{ fontSize: '20px', marginTop: '8px', marginBottom: '8px' }}>{blog.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{blog.excerpt}</p>
                            </div>
                            <button className="btn-outline" style={{ marginTop: 'auto', alignSelf: 'flex-start', padding: '8px 16px', fontSize: '14px', borderRadius: '8px' }}>Read Article</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CareerBlogs;