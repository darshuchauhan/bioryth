import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Globe, Leaf, Microscope, Beaker, Calendar, ChevronRight, Loader2, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import Counter from '../components/Counter';
import { fetchCategoryBySlug, fetchPostsByCategory } from '../services/wpService';
import type { WPPost } from '../services/wpService';

import raw_supply from '../assets/raw_material.jpg';
import science_lab from '../assets/sciencelab.jpg';

const AboutPage: React.FC = () => {
    const [posts, setPosts] = useState<WPPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSciencePosts = async () => {
            try {
                const categoryId = await fetchCategoryBySlug('science');
                if (categoryId) {
                    const data = await fetchPostsByCategory(categoryId);
                    setPosts(data.slice(0, 3)); // Show top 3
                }
            } catch (error) {
                console.error('Error loading science posts:', error);
            } finally {
                setLoading(false);
            }
        };
        getSciencePosts();
    }, []);

    return (
        <div className="about-page">
            <section className="page-hero bg-primary">
                <div className="container">
                    <h1 className="reveal">About Bioryth Enterprise</h1>
                    <p className="reveal">India's Leading Nutraceutical and Functional Premium Ingredients Supplier.</p>
                </div>
            </section>

            <section className="about-content section">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-text reveal">
                            <h2>Excellence in Raw Material Supply</h2>
                            <p>
                                Bioryth Enterprise proudly serves the nutraceutical and functional food industries by supplying high-quality raw materials essential for product formulation and large-scale manufacturing.
                                As a trusted importer, exporter, and trader, we specialize in delivering premium-grade ingredients to clients across India and global markets.
                            </p>
                            <p>
                                Our strong international sourcing network ensures consistent purity, certified safety standards, and competitive pricing, enabling brands and manufacturers to develop world-class products.
                                With reliability, transparency, and uncompromised quality at the heart of our operations, Bioryth Enterprise stands as your ideal partner for all raw material requirements.
                            </p>
                            <a href="https://wa.me/919909117959" target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4 inline-flex items-center gap-2">
                                <MessageCircle size={20} />
                                Inquiry via WhatsApp
                            </a>
                        </div>
                        <div className="about-image reveal">
                            <img src={raw_supply} alt="Raw Material" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-stats-section bg-soft section">
                <div className="container">
                    <div className="stats-grid reveal">
                        <div className="stat-card">
                            <div className="stat-icon"><Users size={32} /></div>
                            <div className="stat-info">
                                <h3><Counter end={150} suffix="+" /></h3>
                                <p>Manufacturers Served</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon"><Globe size={32} /></div>
                            <div className="stat-info">
                                <h3><Counter end={12} suffix="+" /></h3>
                                <p>Global Sourcing Countries</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon"><Leaf size={32} /></div>
                            <div className="stat-info">
                                <h3><Counter end={100} suffix="+" /></h3>
                                <p>High-Quality Ingredients</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Science Story Section */}
            <section id="science-story" className="science-story section">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="label">Science Story</span>
                        <h2>The Science of Nutrition</h2>
                        <p>Research-backed ingredient functionality and innovation.</p>
                    </div>
                    <div className="science-grid">
                        <div className="science-card reveal">
                            <div className="sci-icon"><Microscope size={40} /></div>
                            <h3>Research-backed ingredients</h3>
                            <p>Every ingredient is selected based on documented safety and clinical efficacy.</p>
                        </div>
                        <div className="science-card reveal">
                            <div className="sci-icon"><Beaker size={40} /></div>
                            <h3>Science-driven formulation</h3>
                            <p>We assist in creating stabilized, biologically active formulations.</p>
                        </div>
                        <div className="science-card reveal">
                            <div className="sci-icon"><Leaf size={40} /></div>
                            <h3>Nature-inspired performance</h3>
                            <p>Maximizing the innate potential of natural ingredients through advanced technologies.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Science Stories & Innovation (Dynamic) */}
            <section className="science-story-section section bg-soft">
                <div className="container">
                    <div className="section-header reveal text-center">
                        <span className="label">Innovation</span>
                        <h2>Science Stories & Innovation</h2>
                        <p>Discover the research and origins behind our premium ingredients.</p>
                    </div>

                    {loading ? (
                        <div className="loading-state">
                            <Loader2 className="animate-spin" size={40} />
                            <p>Loading science stories...</p>
                        </div>
                    ) : (
                        <div className="science-posts-grid">
                            {posts.length > 0 ? posts.map((post) => (
                                <div key={post.id} className="science-post-card reveal">
                                    <div className="post-image">
                                        <img
                                            src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || science_lab}
                                            alt={post.title.rendered}
                                        />
                                    </div>
                                    <div className="post-content">
                                        <div className="post-meta">
                                            <Calendar size={14} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                        </div>
                                        <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                        <Link to={`/news/${post.slug}`} className="btn-text">
                                            Read Story <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-center w-full">No stories available at the moment.</p>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Industry News & Update Section */}
            <section id="industry-news" className="industry-news section">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="label">Insights</span>
                        <h2>Industry News & Updates</h2>
                        <p>Stay informed with the latest market shifts and scientific innovations.</p>
                    </div>
                    <div className="news-blog-grid">
                        <div className="news-card reveal">
                            <div className="news-body">
                                <h3>Market Trends</h3>
                                <p>Regulatory changes and market trends affecting the nutraceutical industry.</p>
                                <Link to="/news" className="btn-text">Explore Updates</Link>
                            </div>
                        </div>
                        <div className="news-card reveal">
                            <div className="news-body">
                                <h3>Scientific Breakthroughs</h3>
                                <p>Latest breakthroughs in ingredient extraction and functional development.</p>
                                <Link to="/news" className="btn-text">Read More</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Corporate Office Section */}
            <section className="corporate-office section bg-soft">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="label">Reach Out</span>
                        <h2>Corporate Office</h2>
                        <p>Partner with us for your premium ingredient needs.</p>
                    </div>
                    <div className="contact-grid">
                        <div className="reveal">
                            <div className="info-block">
                                <h3>Call Us</h3>
                                <p><Phone size={20} className="inline mr-2 text-primary" /> +91 9909117959</p>
                            </div>
                            <div className="info-block">
                                <h3>Email</h3>
                                <p><Mail size={20} className="inline mr-2 text-primary" /> info@bioryth.com</p>
                            </div>
                            <Link to="/contact" className="btn btn-primary mt-2">Visit Contact Page</Link>
                        </div>
                        <div className="reveal">
                            <div className="info-block">
                                <h3>Office Location</h3>
                                <p><MapPin size={20} className="inline mr-2 text-primary" /> India Headquarters</p>
                                <p className="text-medium">Available for scheduled B2B consultations and inquiries.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;

