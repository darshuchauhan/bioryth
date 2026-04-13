import React, { useEffect, useState } from 'react';
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

import {  MessageCircle, Menu, X } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) closeMenu();
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
    // Trigger scroll check on mount and whenever pathname changes
    // Add a small timeout to ensure elements are rendered before check
    const timeout = setTimeout(() => {
      handleScroll();
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, [isMenuOpen, location.pathname]);

  return (
    <div className={`app-wrapper ${isMenuOpen ? 'menu-open' : ''}`}>
      <header className={!isHomePage ? 'not-home' : ''}>
        <nav className="container no-padding-mobile">
          <div className="logo-group">
            <Link to="/" className="logo" onClick={closeMenu}>
              <img src="/icon.png" alt="Bioryth Enterprise Logo" className="brand-logo" />
            </Link>
          </div>

          <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><Link to="/" onClick={closeMenu} className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li><Link to="/about" onClick={closeMenu} className={location.pathname === '/about' ? 'active' : ''}>About Us</Link></li>
            <li><Link to="/products" onClick={closeMenu} className={location.pathname === '/products' ? 'active' : ''}>Product List</Link></li>
            <li><Link to="/science" onClick={closeMenu} className={location.pathname === '/science' ? 'active' : ''}>Science Story</Link></li>
            <li><Link to="/news" onClick={closeMenu} className={location.pathname.startsWith('/news') ? 'active' : ''}>Industry News</Link></li>
            <li><Link to="/contact" onClick={closeMenu} className={location.pathname === '/contact' ? 'active' : ''}>Contact Us</Link></li>
          </ul>
        </nav>
      </header>

      {children}

      <a href="https://wa.me/919909117959" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
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
                Science-driven. Nature-inspired. Performance delivered.
              </p>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/products">Product List</Link></li>
                <li><Link to="/science">Science Story</Link></li>
                <li><Link to="/news">Blog</Link></li>
                <li><Link to="/news">Industry News</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul className="footer-links">
                <li>Phone: +91 9909117959</li>
                <li>Email: info@bioryth.com</li>
                <li><Link to="/contact">Inquiry Form</Link></li>
              </ul>
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
import ProductDetailPage from './pages/ProductDetailPage';

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
          <Route path="/news/:slug" element={<BlogDetailPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
