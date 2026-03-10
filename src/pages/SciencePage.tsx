import React from 'react';
import { Beaker, BookOpen, Microscope } from 'lucide-react';

const SciencePage: React.FC = () => {
    return (
        <div className="science-page">
            <section className="page-hero bg-primary">
                <div className="container">
                    <h1 className="reveal">The Science of Nutrition</h1>
                    <p className="reveal">Research-backed ingredient functionality and innovation.</p>
                </div>
            </section>

            <section className="science-content section">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="label">Our Approach</span>
                        <h2>Ingredient Science & Innovation</h2>
                        <p>We bridge the gap between nature and nutrition through rigorous evidence-based science.</p>
                    </div>

                    <div className="science-grid">
                        <div className="science-card reveal">
                            <div className="sci-icon"><Beaker size={40} /></div>
                            <h3>Ingredient Functionality</h3>
                            <p>Detailed insights into how our premium ingredients interact with biological systems to deliver health benefits.</p>
                        </div>
                        <div className="science-card reveal">
                            <div className="sci-icon"><Microscope size={40} /></div>
                            <h3>Quality Control</h3>
                            <p>Every batch undergoes stringent testing for purity, potency, and safety in our state-of-the-art facilities.</p>
                        </div>
                        <div className="science-card reveal">
                            <div className="sci-icon"><BookOpen size={40} /></div>
                            <h3>Research-Backed Info</h3>
                            <p>Our formulations are guided by the latest clinical research and industry-leading nutritional studies.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="story-section section bg-soft">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-text reveal">
                            <span className="label">The Journey</span>
                            <h2>Ingredient Origins & Innovation</h2>
                            <p>From ethical sourcing in diverse global regions to advanced extraction processes, we ensure every ingredient tells a story of quality and transparency.</p>
                            <p>Our innovation team works tirelessly to discover new health impacts, ensuring Bioryth remains at the forefront of the nutraceutical industry.</p>
                        </div>
                        <div className="about-image reveal">
                            <img src="https://images.unsplash.com/photo-1532187875605-2fe35951856c?auto=format&fit=crop&q=80&w=1000" alt="Science Lab" className="rounded-img" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SciencePage;
