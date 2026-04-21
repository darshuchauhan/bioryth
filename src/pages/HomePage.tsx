import React from 'react';
import { Leaf, Globe, Users, Handshake } from 'lucide-react';
import pharma from '../assets/global-map (1).png';

import Counter from '../components/Counter';
import ProductGrid from '../components/ProductGrid';
import premiumIngredients from '../assets/pgrade.jpg';
import quickDelivery from '../assets/qdelivery.jpg';
import documentSupport from '../assets/document-support.jpg';

const HomePage: React.FC = () => {
    return (
        <main>
            <section id="hero" className="hero">
                <div className="hero-video-container">
                    <video
                        className="hero-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster="https://images.unsplash.com/photo-1579165466541-71e2247fb5c5?auto=format&fit=crop&q=80&w=2000"
                        src="https://blog.bioryth.com/wp-content/uploads/2026/04/FINAL-VIDEO.mp4"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    
                    <h1 style={{ color: 'white' }} className='hero-txt'>
                        India's Premier <br /><span className="gradient-text">Nutraceutical Ingredient</span> Partner
                    </h1>
                    <p>
                        Delivering premium, branded nutraceutical and functional food ingredients for high-performance formulations.
                    </p>
                    <div className="hero-btns">
                        <a href="/products" className="btn btn-primary">Explore Products</a>
                    </div>
                </div>
            </section>

            <section id="services" className="services section bg-soft">
                <div className="container">
                    <div className="section-header\">
                        <h2>Core Business Services</h2>
                        <p>Comprehensive solutions from concept to creation, ensuring your products exceed market expectations.</p>
                    </div>
                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-icon"><Leaf size={32} /></div>
                            <h3>Premium Ingredient Supply</h3>
                            <p>Direct access to high-quality ingredients for health supplements and pharmaceutical applications.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon"><Users size={32} /></div>
                            <h3>Nutrient Premix</h3>
                            <p>Market-ready blends designed for seamless integration and optimal efficacy.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon"><Globe size={32} /></div>
                            <h3>Product Development</h3>
                            <p>Innovative formulations tailored to emerging market trends from concept to creation.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="integrity-section">
                <div className="container">
                    <div className="integrity-card">
                        <div className="integrity-brand">
                            <h2>Trusted Partner</h2>
                        </div>
                        <div className="integrity-stats">
                            <div className="i-stat">
                                <div className="i-icon green-icon">
                                    <Users size={32} />
                                </div>
                                <div className="i-text">
                                    <h3><Counter end={150} suffix="+" /> Manufacturers</h3>
                                    <p>Trusted Enterprise Partners</p>
                                </div>
                            </div>
                            <div className="i-stat">
                                <div className="i-icon green-icon">
                                    <Leaf size={32} />
                                </div>
                                <div className="i-text">
                                    <h3><Counter end={100} suffix="+" /></h3>
                                    <p>High-Quality Ingredients</p>
                                </div>
                            </div>
                            <div className="i-stat">
                                <div className="i-icon green-icon">
                                    <Globe size={32} />
                                </div>
                                <div className="i-text">
                                    <h3><Counter end={12} suffix="+" /></h3>
                                    <p>Global Sourcing Countries</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ProductGrid title="Our Featured Ingredients" limit={4} />

            <section id="why-choose-us" className="why-us section">
                <div className="container">
                    <div className="section-header">
                        <span className="label">Why Us</span>
                        <h2>Why Choose Bioryth Enterprise?</h2>
                        <p>We combine advanced sourcing, scientific validation, and expert-driven support to deliver high-performance nutraceutical and functional ingredients that set your product apart.</p>
                    </div>
                    <div className="why-us-grid">
                        {[
                            {
                                title: "Premium-grade Ingredients",
                                desc: "Globally sourced, clinically backed nutraceutical and functional ingredients designed for superior performance, purity, and consistency.",
                                img: premiumIngredients
                            },
                            {
                                title: "Documentation Support",
                                desc: "Efficient and dependable supply chain ensuring timely delivery across domestic and international markets without compromising quality.",
                                img: documentSupport
                            },
                            {
                                title: "Quick Delivery",
                                desc: "Timely delivery driven by our streamlined global and domestic logistics network.",
                                img: quickDelivery
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="why-card">
                                <div className="why-img">
                                    <img src={item.img} alt={item.title} />
                                </div>
                                <div className="why-info">
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="global-network" className="global-network section bg-soft">
                <div className="container">
                    <div className="section-header">
                        <span className="label">Our Global Network</span>
                        <h2>Our Sourcing Strength</h2>
                        <p>We leverage 12+ global sourcing countries to ensure a steady supply of innovative and high-purity ingredients from audited and certified production facilities.</p>
                    </div>

                    <div className="network-map-card">
                        <img src={pharma} alt="Global sourcing network" width={600} height={700} />
                    </div>

                    <div className="network-highlights">
                        {[
                            {
                                icon: <Users size={32} />,
                                title: 'Domestic Presence',
                                desc: 'Extensive network across India for regional distribution.'
                            },
                            {
                                icon: <Globe size={32} />,
                                title: 'Sourcing Network',
                                desc: 'Strategic inbound sourcing from Europe, USA, China, and Southeast Asia.'
                            },
                            {
                                icon: <Handshake size={32} />,
                                title: 'Direct Partnerships',
                                desc: 'Collaborative relationships with certified global manufacturers.'
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="highlight-card">
                                <div className="highlight-icon">{item.icon}</div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    
                </div>
            </section>

            <section id="science-story" className="science-story section">
                <div className="container">
                    <div className="section-header">
                        <span className="label">Our Philosophy</span>
                        <h2>Science-Driven. Nature-Inspired.</h2>
                        <p>We bridge the gap between nature and nutrition through rigorous evidence-based science.</p>
                    </div>
                    <div className="science-grid">
                        <div className="science-card">
                            <h3>Research-backed ingredients</h3>
                            <p>Every ingredient in our portfolio is selected based on documented safety and clinical efficacy.</p>
                        </div>
                        <div className="science-card">
                            <h3>Science-driven formulation</h3>
                            <p>Our experts assist in creating formulations that are biologically active and chemically stable.</p>
                        </div>
                        <div className="science-card">
                            <h3>Nature-inspired performance</h3>
                            <p>Maximizing the innate potential of natural ingredients through advanced extraction technologies.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="industry-news" className="industry-news section bg-soft">
                <div className="container">
                    <div className="section-header">
                        <span className="label">Insights</span>
                        <h2>Industry News & Updates</h2>
                        <p>Stay informed with the latest market shifts and scientific innovations in the nutraceutical space.</p>
                    </div>
                    <div className="news-blog-grid">
                        <div className="news-card">
                            <div className="news-body">
                                <h3>Science & Innovation</h3>
                                <p>Latest breakthroughs in ingredient extraction and functional food development.</p>
                                <a href="/news" className="btn-text">Read More</a>
                            </div>
                        </div>
                        <div className="news-card">
                            <div className="news-body">
                                <h3>Industry Updates</h3>
                                <p>Regulatory changes and market trends affecting the global nutraceutical industry.</p>
                                <a href="/news" className="btn-text">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
