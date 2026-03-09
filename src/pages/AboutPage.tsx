import React from 'react';
import raw_supply from '../assets/raw_material.jpg';
import { Users, Globe, Leaf } from 'lucide-react';
import Counter from '../components/Counter';

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
                                Bioryth Enterprise proudly serves four major industries — Nutraceutical, Food, Pharmaceutical, and Agriculture —
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
                            <img src={raw_supply} alt="Laboratory" />
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
                                <h3><Counter end={500} suffix="+" /></h3>
                                <p>High-Quality Ingredients</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;

