import { Leaf, Globe, Users } from 'lucide-react';
import lab from '../assets/lab.jpg';
import documentSupport from '../assets/document-support.jpg';
import quickDelivery from '../assets/quick-delivery.jpg';
import transparentPricing from '../assets/transparent-pricing.jpg';
import pharma from '../assets/pharmaceutical.jpg';
const HomePage: React.FC = () => {
    return (
        <main>
            <section id="hero" className="hero">
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <h1 className="reveal">
                        India's Leading <span className="gradient-text">Nutraceutical Ingredients</span> Supplier
                    </h1>
                    <p className="reveal">
                        Purity by Science. Driven by Nature. We deliver world-class raw materials
                        to empower health and wellness brands globally.
                    </p>
                    <div className="hero-btns reveal">
                        <a href="#ingredients" className="btn btn-secondary">Our Catalog</a>
                        <a href="/contact" className="btn btn-outline connect-btn">Connect With Us</a>
                    </div>
                </div>
            </section>

            <section id="about-preview" className="about section">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-image reveal">
                            <img
                                src={lab}
                                alt="Scientist in lab"
                            />
                        </div>
                        <div className="about-text reveal">
                            <span className="label">The Bioryth Advantage</span>
                            <h2>Elevating Nutritional Standards since 2012</h2>
                            <p>
                                Bioryth Enterprise proudly serves four major industries — Nutraceutical, Food, Pharmaceutical, and Agriculture — by supplying high-quality raw materials essential for product formulation and large-scale manufacturing. As a trusted importer, exporter, and trader, we specialize in delivering premium-grade ingredients to clients across India and global markets. Our strong international sourcing network ensures consistent purity, certified safety standards, and competitive pricing, enabling brands and manufacturers to develop world-class nutraceutical, food, pharma, and agricultural products.
                            </p>
                            <a href="/about" className="btn btn-primary">Read Our Story</a>
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
                                    <h3>150+ Manufactures</h3>
                                    <p>Trusted By</p>
                                </div>
                            </div>
                            <div className="i-stat">
                                <div className="i-icon green-icon">
                                    <Leaf size={32} />
                                </div>
                                <div className="i-text">
                                    <h3>500+</h3>
                                    <p>High-Quality Ingredients</p>
                                </div>
                            </div>
                            <div className="i-stat">
                                <div className="i-icon green-icon">
                                    <Globe size={32} />
                                </div>
                                <div className="i-text">
                                    <h3>12+</h3>
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
                            <p>Our sourcing strength is built on a globally integrated network of certified manufacturers, advanced quality-verification protocols, and deep technical expertise across nutraceutical, food, pharmaceutical, and agriculture raw materials.</p>
                            <a href="/about" className="btn btn-outline">Learn More</a>
                        </div>
                        <div className="sourcing-stats reveal">
                            <div className="strength-card">
                                <h3>Supply Excellence</h3>
                                <p>Where trusted global sourcing, rigorous quality assurance, and a strong partner network come together to deliver consistent, safe, and premium raw materials.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="ingredients" className="ingredients section">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="label">Product Catalog</span>
                        <h2>Expertly Sourced Ingredients</h2>
                        <p>Browse our core categories of premium raw materials catering to diverse industries.</p>
                    </div>
                    <div className="ingredients-grid">
                        {[
                            { title: 'Nutraceuticals', desc: 'Amino acids, vitamins, and minerals for health supplements.', img: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800' },
                            { title: 'Food & Beverage', desc: 'Specialty ingredients for functional foods and beverages.', img: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=800' },
                            { title: 'Pharmaceutical', desc: 'API and excipients meeting strict BP/USP/EP standards.', img: pharma },
                            { title: 'Agriculture', desc: 'High-quality compounds for advanced agricultural formulations.', img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800' }
                        ].map((item, idx) => (
                            <div key={idx} className="card reveal">
                                <div className="card-img">
                                    <img src={item.img} alt={item.title} />
                                </div>
                                <div className="card-body">
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="quality" className="quality section bg-primary">
                <div className="container reveal">
                    <div className="quality-content">
                        <h2>Safety, Compliance & Quality</h2>
                        <p>We adhere to the strictest global regulatory standards including FSSAI, ISO 22000, HACCP, and GMP.</p>
                        <div className="cert-strip">
                            <img src="/FSSAI_logo.png" alt="FSSAI Certified" className="cert-logo" />
                            <img src="/iso22000.png" alt="ISO 22000 Certified" className="cert-logo" />
                            <img src="/haccp.png" alt="HACCP Certified" className="cert-logo" />
                            <img src="/gmp.jpg" alt="WHO-GMP Certified" className="cert-logo" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
