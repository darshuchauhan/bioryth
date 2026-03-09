import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="about-page">
            <section className="page-hero bg-primary">
                <div className="container">
                    <h1>About Bioryth Enterprise</h1>
                    <p>India's Leading Nutraceutical, Food, Pharmaceutical, and Agricultural Ingredients Supplier.</p>
                </div>
            </section>

            <section className="about-content section">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-text reveal">
                            <h2>Excellence in Raw Material Supply</h2>
                            <p>
                                Bioryth Enterprise proudly serves four major industries — **Nutraceutical, Food, Pharmaceutical, and Agriculture** —
                                by supplying high-quality raw materials essential for product formulation and large-scale manufacturing.
                                As a trusted importer, exporter, and trader, we specialize in delivering premium-grade ingredients to clients
                                across India and global markets.
                            </p>
                            <p>
                                Our strong international sourcing network ensures consistent purity, certified safety standards,
                                and competitive pricing, enabling brands and manufacturers to develop world-class products.
                                With reliability, transparency, and uncompromised quality at the heart of our operations,
                                Bioryth Enterprise stands as your ideal partner for all raw material requirements.
                            </p>
                        </div>
                        <div className="about-image reveal">
                            <img src="https://images.unsplash.com/photo-1579165466541-71e2247fb5c5?auto=format&fit=crop&q=80&w=800" alt="Laboratory" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-stats-section bg-soft section">
                <div className="container">
                    <div className="stats-row reveal justify-center">
                        <div className="stat text-center">
                            <h3>150+</h3>
                            <p>Manufacturers Served</p>
                        </div>
                        <div className="stat text-center" style={{ marginLeft: '4rem' }}>
                            <h3>12+</h3>
                            <p>Global Sourcing Countries</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
