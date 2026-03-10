import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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

import { Linkedin, Instagram, Facebook, Send, MessageCircle } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
          <div className="logo-group">
            <Link to="/" className="logo">
              <img src="/icon.png" alt="Bioryth Enterprise Logo" className="brand-logo" />
            </Link>
            <div className="header-socials">
              <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/science">Story / Science</Link></li>
            <li><Link to="/news">Industry News</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/contact" className="btn btn-primary nav-btn text-white">Request Sample</Link></li>
          </ul>
        </nav>
      </header>

      {children}

      <a href="https://wa.me/919104133333" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <MessageCircle size={30} />
      </a>

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
                <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/science">Story / Science</Link></li>
                <li><Link to="/news">Blog / News</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Support</h4>
              <ul className="footer-links">
                <li><Link to="/contact">Request Sample</Link></li>
                <li><a href="https://wa.me/919104133333">WhatsApp Chat</a></li>
                <li><Link to="/contact">Inquiry Form</Link></li>
              </ul>
            </div>

            <div className="footer-col col-newsletter">
              <h4>Newsletter</h4>
              <p>Stay updated with our latest ingredient launches and industry trends.</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Email Address" required />
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

import SciencePage from './pages/SciencePage';
import NewsPage from './pages/NewsPage';

import BlogDetailPage from './pages/BlogDetailPage';

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
          <Route path="/science" element={<SciencePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<BlogDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
