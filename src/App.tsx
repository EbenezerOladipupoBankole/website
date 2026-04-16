import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';   
import Jobs from './pages/Jobs';
import Talent from './pages/Talent';
import Employers from './pages/Employers';
import PostJob from './pages/PostJob';
import Login from './pages/Login';
import BrowseTalent from './pages/BrowseTalent';
import CareerBlogs from './pages/CareerBlogs';
import InterviewTips from './pages/InterviewTips';
import ResumeBuilder from './pages/ResumeBuilder';
import QuickMatch from './pages/QuickMatch';
import Gateway from './pages/Gateway';
import NotFound from './pages/NotFound';
import './App.css';

import { auth, db } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'talent' | 'employer' | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserRole(userSnap.data()?.role || null);
          }
        } catch (err) {
          console.error('Error fetching user role:', err);
        }
      } else {
        setUserRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar user={user} userRole={userRole} />

        <main className="content-wrapper">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Gateway />} />
            <Route path="/jobs" element={<Jobs userRole={userRole} />} />
            <Route path="/talent" element={<Talent />} />
            <Route path="/employers" element={<Employers />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/login" element={<Login />} />
            <Route path="/browse-talent" element={<BrowseTalent />} />
            <Route path="/career-blogs" element={<CareerBlogs />} />
            <Route path="/interview-tips" element={<InterviewTips />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />

            <Route path="/match" element={<QuickMatch />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {user && (
          <footer className="footer-v2">
            <div className="footer-top container">
              <div className="footer-newsletter">
                <h3>Stay updated with local opportunities</h3>
                <p>Get the latest jobs and talent trends in Nigeria delivered to your inbox.</p>
                <div className="newsletter-form">
                  <input type="email" />
                  <button className="btn-primary">Subscribe</button>
                </div>

                <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Or download our mobile app</p>
                  <div className="download-buttons" style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <button className="btn-download-v2" style={{ padding: '10px 20px', minWidth: 'auto' }}>
                      <svg className="download-icon" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
                        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                      </svg>
                      <div className="btn-content">
                        <span className="btn-small" style={{ fontSize: '9px' }}>Download on the</span>
                        <span className="btn-large" style={{ fontSize: '14px' }}>App Store</span>
                      </div>
                    </button>
                    <a href="/vitehire.apk" download className="btn-download-v2" style={{ padding: '10px 20px', minWidth: 'auto', textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                      <svg className="download-icon" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                      </svg>
                      <div className="btn-content">
                        <span className="btn-small" style={{ fontSize: '9px' }}>Download APK</span>
                        <span className="btn-large" style={{ fontSize: '14px' }}>Direct Install</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-main container">
              <div className="footer-brand-v2">
                <div className="logo-section">
                  <img src="/logo.svg" alt="ViteHire Logo" style={{ height: '32px' }} />
                </div>
                <p className="brand-desc">
                  Connecting top talent with the best companies across Nigeria.
                  Your partner for local career growth and hiring success.
                </p>
                <div className="social-links">
                  <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
                  <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                  <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
                </div>
              </div>


            </div>

            <div className="footer-bottom-v2">
              <div className="container bottom-flex">
                <p>&copy; 2026 ViteHire Technologies. Built with passion in Nigeria.</p>
                <div className="bottom-links">
                  <a href="#">Sitemap</a>
                  <a href="#">Cookies</a>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </Router>
  );
}

export default App;
