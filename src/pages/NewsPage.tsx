import React, { useEffect, useState } from 'react';
import { Calendar, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../services/wpService';
import type { WPPost } from '../services/wpService';

const NewsPage: React.FC = () => {
    const [posts, setPosts] = useState<WPPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPosts = async () => {
            const data = await fetchPosts();
            setPosts(data);
            setLoading(false);
        };
        getPosts();
    }, []);

    return (
        <div className="news-page">
            <section className="page-hero bg-primary">
                <div className="container">
                    <h1 className="reveal">Industry News & Updates</h1>
                    <p className="reveal">Latest market shifts, research updates, and ingredient launches from our blog.</p>
                </div>
            </section>

            <section className="news-content section">
                <div className="container">
                    {loading ? (
                        <div className="loading-state">
                            <Loader2 className="animate-spin" size={40} />
                            <p>Fetching latest updates...</p>
                        </div>
                    ) : (
                        <div className="news-blog-grid">
                            {posts.map((post) => (
                                <article key={post.id} className="news-card reveal">
                                    <div className="news-img">
                                        <img
                                            src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800'}
                                            alt={post.title.rendered}
                                        />
                                        <span className="news-tag">Update</span>
                                    </div>
                                    <div className="news-body">
                                        <div className="news-meta">
                                            <Calendar size={14} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                        </div>
                                        <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                        <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered.substring(0, 120) + '...' }} />
                                        <Link to={`/news/${post.slug}`} className="btn-text">
                                            Read More <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                            {posts.length === 0 && (
                                <div className="error-state">
                                    <p>No posts found. Please check back later.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default NewsPage;
