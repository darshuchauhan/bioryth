import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ChevronLeft, Loader2, List } from 'lucide-react';
import { fetchPostById } from '../services/wpService';
import type { WPPost } from '../services/wpService';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

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

    // Process content to add IDs to headings and extract TOC items
    const processed = useMemo(() => {
        if (!post) return { content: '', toc: [] as TOCItem[] };

        const toc: TOCItem[] = [];
        let content = post.content.rendered;

        // Simple regex to find h2 and h3
        const headingRegex = /<h([23])(.*?)>(.*?)<\/h\1>/gi;
        let modifiedContent = content;

        // Reset regex state
        headingRegex.lastIndex = 0;

        const matches = [...content.matchAll(headingRegex)];

        matches.forEach((match, index) => {
            const level = parseInt(match[1]);
            const rawText = match[3].replace(/<[^>]*>?/gm, ''); // Strip tags from text
            const id = `heading-${index}`;

            toc.push({ id, text: rawText, level });

            // We don't replace here yet because indices would shift
        });

        // Now replace in content to add IDs
        let idCounter = 0;
        modifiedContent = content.replace(/<h([23])(.*?)>(.*?)<\/h\1>/gi, (_match, level, attrs, text) => {
            const id = `heading-${idCounter++}`;
            return `<h${level} id="${id}" ${attrs}>${text}</h${level}>`;
        });

        return { content: modifiedContent, toc };
    }, [post]);

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
                    {processed.toc.length > 0 && (
                        <div className="toc-container reveal">
                            <div className="toc-header">
                                <List size={20} />
                                <h3>Table of Contents</h3>
                            </div>
                            <ul className="toc-list">
                                {processed.toc.map((item) => (
                                    <li key={item.id} className={`toc-level-${item.level}`}>
                                        <a href={`#${item.id}`}>{item.text}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="content-inner reveal" dangerouslySetInnerHTML={{ __html: processed.content }} />

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
