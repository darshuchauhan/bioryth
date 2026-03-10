import React from 'react';
import { Leaf, Globe, Users } from 'lucide-react';
import pharma from '../assets/pharmaceutical.jpg';
import documentSupport from '../assets/document-support.jpg';
import quickDelivery from '../assets/quick-delivery.jpg';
import transparentPricing from '../assets/transparent-pricing.jpg';
import Counter from '../components/Counter';

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
                    <div className="hero-badge reveal">Purity Powered by Science</div>
                    <h1 className="reveal">
                        India's Premier <span className="gradient-text">Nutraceutical Ingredients</span> Partner
                    </h1>
                    <p className="reveal">
                        Elevating health standards globally since 2012. We supply certified, high-performance raw materials for Nutraceutical, Food, Pharma, and Agriculture industries.
                    </p>
                    <div className="hero-btns reveal">
                        <a href="/products" className="btn btn-primary">Explore Products</a>
                        <a href="/contact" className="btn btn-secondary ">Request Sample</a>
                    </div>
                </div>
            </section>

            <section id="services" className="services section bg-soft">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="label">Our Expertise</span>
                        <h2>Core Business Services</h2>
                        <p>Comprehensive solutions from concept to creation, ensuring your products exceed market expectations.</p>
                    </div>
                    <div className="services-grid">
                        <div className="service-card reveal">
                            <div className="service-icon"><Leaf size={32} /></div>
                            <h3>Product Development & Concept Creation</h3>
                            <p>Innovative formulations tailored to emerging market trends and specific health goals.</p>
                        </div>
                        <div className="service-card reveal">
                            <div className="service-icon"><Users size={32} /></div>
                            <h3>Nutrient Premix + Market Ready Blend</h3>
                            <p>Customized blends and premixes designed for seamless integration into your production line.</p>
                        </div>
                        <div className="service-card reveal">
                            <div className="service-icon"><Globe size={32} /></div>
                            <h3>Premium Ingredients + Health Supplements</h3>
                            <p>Direct access to a world-class portfolio of lab-tested ingredients and supplement solutions.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="integrity-section">
                <div className="container">
                    <div className="integrity-card reveal">
                        <div className="integrity-brand">
                            <h2>Our Integrity</h2>
                        </div>
                        <div className="integrity-stats">
                            <div className="i-stat">
                                <div className="i-icon green-icon">
                                    <Users size={32} />
                                </div>
                                <div className="i-text">
                                    <h3><Counter end={150} suffix="+" /> Manufacturers</h3>
                                    <p>Trusted By</p>
                                </div>
                            </div>
                            <div className="i-stat">
                                <div className="i-icon green-icon">
                                    <Leaf size={32} />
                                </div>
                                <div className="i-text">
                                    <h3><Counter end={500} suffix="+" /></h3>
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


            <section id="why-choose-us" className="why-us section">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="label">Our Expertise</span>
                        <h2>Why Choose Bioryth Enterprise?</h2>
                        <p>We combine advanced technology, expert professionals, and precise testing to ensure your products outperform the competition.</p>
                    </div>
                    <div className="why-us-grid">
                        {[
                            {
                                title: "Premium-grade Ingredients",
                                desc: "Lab-tested ingredients for safer, high-performance formulations.",
                                img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
                            },
                            {
                                title: "Documentation Support",
                                desc: "Full COA, MSDS, TDS, and comprehensive regulatory compliance assistance.",
                                img: documentSupport
                            },
                            {
                                title: "Quick Delivery",
                                desc: "Timely delivery driven by our streamlined global and domestic logistics network.",
                                img: quickDelivery
                            },
                            {
                                title: "Transparent Pricing",
                                desc: "Top-tier quality without hidden costs, ensuring value for your enterprise.",
                                img: transparentPricing
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
                            <p>We have built robust partnerships with manufacturers and suppliers from key regions, ensuring a steady supply of innovative and high-purity ingredients.</p>
                            <ul className="sourcing-list">
                                <li><strong>Domestic Presence:</strong> Extensive network across India for regional distribution.</li>
                                <li><strong>Global Imports:</strong> Sourcing from Europe, USA, China, and Southeast Asia.</li>
                                <li><strong>Direct Partnerships:</strong> Collaborative relationships with audited and certified production facilities.</li>
                            </ul>
                            <a href="/contact" className="btn btn-primary mt-2">Partner With Us</a>
                        </div>
                        <div className="sourcing-image reveal">
                            <img src={pharma} alt="Pharmaceutical sourcing" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
