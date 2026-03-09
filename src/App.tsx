import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductsPage from './pages/ProductsPage';
import './App.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

import { Linkedin, Twitter, Instagram, Facebook, Send, Mail, Phone, MapPin } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ... existing hooks ...
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      const windowHeight = window.innerHeight;
      const revealPoint = 150;

      reveals.forEach((reveal) => {
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });

      const header = document.querySelector('header');
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('sticky');
        } else {
          header.classList.remove('sticky');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-wrapper">
      <header>
        <nav className="container">
          <div className="logo">
            <Link to="/">
              <img src="/icon.png" alt="Bioryth Enterprise Logo" className="brand-logo" />
            </Link>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/contact" className="btn btn-primary nav-btn text-white">Inquire Now</Link></li>
          </ul>
        </nav>
      </header>

      {children}

      <footer className="footer section">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col col-main">
              <Link to="/" className="footer-logo">
                <img src="/icon.png" alt="Bioryth Logo" />
              </Link>
              <p className="footer-desc">
                High-performance nutraceutical ingredients. Purity by science, driven by nature since 2012.
              </p>
              <div className="social-links">
                <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
                <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul className="footer-contact">
                <li><MapPin size={18} /> Surat, Gujarat, India</li>
                <li><Mail size={18} /> info@biorythenterprise.com</li>
                <li><Phone size={18} /> +91 91041 33333</li>
              </ul>
            </div>

            <div className="footer-col col-newsletter">
              <h4>Subscribe</h4>
              <p>Get the latest updates on new ingredients and industry news.</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your Email" required />
                <button type="submit" className="btn-icon">
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Bioryth Enterprise. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
