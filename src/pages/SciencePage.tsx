import React, { useEffect, useState } from 'react';
import { Beaker, Leaf, Microscope, Calendar, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchCategoryBySlug, fetchPostsByCategory } from '../services/wpService';
import type { WPPost } from '../services/wpService';
import science from '../assets/sciencelab.jpg';

const SciencePage: React.FC = () => {
    const [posts, setPosts] = useState<WPPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSciencePosts = async () => {
            try {
                const categoryId = await fetchCategoryBySlug('science');
                if (categoryId) {
                    const data = await fetchPostsByCategory(categoryId);
                    setPosts(data);
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
                            <div className="sci-icon"><Microscope size={40} /></div>
                            <h3>Research-backed ingredients</h3>
                            <p>Every ingredient is selected based on documented safety and clinical efficacy, ensuring high performance in every formulation.</p>
                        </div>
                        <div className="science-card reveal">
                            <div className="sci-icon"><Beaker size={40} /></div>
                            <h3>Science-driven formulation</h3>
                            <p>Our experts assist in creating stabilized, biologically active formulations that set your product apart in the market.</p>
                        </div>
                        <div className="science-card reveal">
                            <div className="sci-icon"><Leaf size={40} /></div>
                            <h3>Nature-inspired performance</h3>
                            <p>We maximize the innate potential of natural ingredients through advanced extraction and optimization technologies.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="science-story-section section bg-soft">
                <div className="container">
                    {loading ? (
                        <div className="loading-state">
                            <Loader2 className="animate-spin" size={40} />
                            <p>Loading science stories...</p>
                        </div>
                    ) : (
                        <>
                            <div className="section-header reveal text-center">
                                <h2>Science Stories & Innovation</h2>
                                <p>Discover the research and origins behind our premium ingredients.</p>
                            </div>

                            {posts.length > 0 ? (
                                <div className="science-posts-grid">
                                    {posts.map((post) => (
                                        <div key={post.id} className="science-post-card reveal">
                                            <div className="post-image">
                                                <img
                                                    src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || science}
                                                    alt={post.title.rendered}
                                                />
                                                {post._embedded?.['wp:term']?.[0]?.[0] && (
                                                    <span className="news-tag" style={{ position: 'absolute', top: '15px', right: '15px' }}>
                                                        {post._embedded['wp:term'][0][0].name}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="post-content">
                                                <div className="post-meta">
                                                    <Calendar size={14} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                                </div>
                                                <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                                <div
                                                    className="post-excerpt"
                                                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered.substring(0, 150) + '...' }}
                                                />
                                                <Link to={`/news/${post.slug}`} className="btn-text">
                                                    Read Story <ChevronRight size={16} />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="about-grid">
                                    <div className="about-text reveal">
                                        <span className="label">The Journey</span>
                                        <h2>Ingredient Origins & Innovation</h2>
                                        <p>From ethical sourcing in diverse global regions to advanced extraction processes, we ensure every ingredient tells a story of quality and transparency.</p>
                                        <p>Our innovation team works tirelessly to discover new health impacts, ensuring Bioryth remains at the forefront of the nutraceutical industry.</p>
                                    </div>
                                    <div className="about-image reveal">
                                        <img src={science} alt="Science Lab" className="rounded-img" />
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default SciencePage;
