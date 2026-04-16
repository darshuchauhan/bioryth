import React from 'react';
import { Leaf, Globe, Users } from 'lucide-react';
import pharma from '../assets/pharmaceutical.jpg';

import Counter from '../components/Counter';
import ProductGrid from '../components/ProductGrid';
import premiumIngredients from '../assets/Premium-grade ingredients.png';
import quickDelivery from '../assets/quick-delivery.png';
import documentSupport from '../assets/global-network.png';

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
                        src="https://cdn.pixabay.com/video/2025/03/04/262464_large.mp4"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <div className="hero-badge reveal">India's Premier Nutraceutical Ingredient Partner</div>
                    <h1 className="reveal ">
                        India’s Premier <br /><span className="gradient-text">Nutraceutical Ingredient</span> Partner
                    </h1>
                    <p className="reveal">
                        Delivering premium, branded nutraceutical and functional food ingredients for high-performance formulations.
                    </p>
                    <div className="hero-btns reveal">
                        <a href="/products" className="btn btn-primary">Explore Products</a>
                    </div>
                </div>
            </section>

            <section id="services" className="services section bg-soft">
                <div className="container">
                    <div className="section-header reveal">
                        <h2>Core Business Services</h2>
                        <p>Comprehensive solutions from concept to creation, ensuring your products exceed market expectations.</p>
                    </div>
                    <div className="services-grid">
                        <div className="service-card reveal">
                            <div className="service-icon"><Leaf size={32} /></div>
                            <h3>Premium Ingredient Supply</h3>
                            <p>Direct access to high-quality ingredients for health supplements and pharmaceutical applications.</p>
                        </div>
                        <div className="service-card reveal">
                            <div className="service-icon"><Users size={32} /></div>
                            <h3>Nutrient Premix</h3>
                            <p>Market-ready blends designed for seamless integration and optimal efficacy.</p>
                        </div>
                        <div className="service-card reveal">
                            <div className="service-icon"><Globe size={32} /></div>
                            <h3>Product Development</h3>
                            <p>Innovative formulations tailored to emerging market trends from concept to creation.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="integrity-section">
                <div className="container">
                    <div className="integrity-card reveal">
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
                    <div className="section-header reveal">
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
                                title: "Global network & support",
                                desc: "Efficient and dependable supply chain ensuring timely delivery across domestic and international markets without compromising quality.",
                                img: documentSupport
                            },
                            {
                                title: "Quick Delivery",
                                desc: "Timely delivery driven by our streamlined global and domestic logistics network.",
                                img: quickDelivery
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="why-card reveal">
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

            <section id="sourcing" className="sourcing section bg-soft">
                <div className="container">
                    <div className="sourcing-grid">
                        <div className="sourcing-text reveal">
                            <span className="label">Our Global Network</span>
                            <h2>Our Sourcing Strength</h2>
                            <p>We leverage 12+ global sourcing countries to ensure a steady supply of innovative and high-purity ingredients from audited and certified production facilities.</p>
                            <ul className="sourcing-list">
                                <li><strong>Domestic Presence:</strong> Extensive network across India for regional distribution.</li>
                                <li><strong>Global Imports:</strong> Strategic sourcing from Europe, USA, China, and Southeast Asia.</li>
                                <li><strong>Direct Partnerships:</strong> Collaborative relationships with certified global manufacturers.</li>
                            </ul>
                            <a href="/contact" className="btn btn-primary mt-2">Partner With Us</a>
                        </div>
                        <div className="sourcing-image reveal">
                            <img src={pharma} alt="Pharmaceutical sourcing" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="science-story" className="science-story section">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="label">Our Philosophy</span>
                        <h2>Science-Driven. Nature-Inspired.</h2>
                        <p>We bridge the gap between nature and nutrition through rigorous evidence-based science.</p>
                    </div>
                    <div className="science-grid">
                        <div className="science-card reveal">
                            <h3>Research-backed ingredients</h3>
                            <p>Every ingredient in our portfolio is selected based on documented safety and clinical efficacy.</p>
                        </div>
                        <div className="science-card reveal">
                            <h3>Science-driven formulation</h3>
                            <p>Our experts assist in creating formulations that are biologically active and chemically stable.</p>
                        </div>
                        <div className="science-card reveal">
                            <h3>Nature-inspired performance</h3>
                            <p>Maximizing the innate potential of natural ingredients through advanced extraction technologies.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="industry-news" className="industry-news section bg-soft">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="label">Insights</span>
                        <h2>Industry News & Updates</h2>
                        <p>Stay informed with the latest market shifts and scientific innovations in the nutraceutical space.</p>
                    </div>
                    <div className="news-blog-grid">
                        <div className="news-card reveal">
                            <div className="news-body">
                                <h3>Science & Innovation</h3>
                                <p>Latest breakthroughs in ingredient extraction and functional food development.</p>
                                <a href="/news" className="btn-text">Read More</a>
                            </div>
                        </div>
                        <div className="news-card reveal">
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
