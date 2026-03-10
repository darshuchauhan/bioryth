import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ChevronLeft, Loader2 } from 'lucide-react';
import { fetchPostById } from '../services/wpService';
import type { WPPost } from '../services/wpService';

const BlogDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<WPPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPost = async () => {
            if (id) {
                const data = await fetchPostById(id);
                setPost(data);
            }
            setLoading(false);
        };
        getPost();
    }, [id]);

    if (loading) {
        return (
            <div className="loading-full">
                <Loader2 className="animate-spin" size={48} />
                <p>Loading post details...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="error-full container">
                <h2>Post not found</h2>
                <Link to="/news" className="btn btn-primary">Back to News</Link>
            </div>
        );
    }

    return (
        <div className="blog-detail-page">
            <section className="detail-hero" style={{
                backgroundImage: `url(${post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1200'})`
            }}>
                <div className="hero-overlay"></div>
                <div className="container">
                    <Link to="/news" className="back-link reveal"><ChevronLeft size={20} /> Back to News</Link>
                    <h1 className="reveal" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                    <div className="post-meta reveal">
                        <Calendar size={16} /> {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                </div>
            </section>

            <article className="post-content section">
                <div className="container-small">
                    <div className="content-inner reveal" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

                    <div className="post-footer reveal">
                        <hr />
                        <div className="share-box">
                            <p>Enjoyed this article? Share it with your network.</p>
                            <div className="social-links">
                                {/* Sharing logic could be added here */}
                            </div>
                        </div>
                        <Link to="/news" className="btn btn-secondary mt-2">View All Posts</Link>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogDetailPage;
