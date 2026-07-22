import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { 
    Calendar, 
    ChevronRight, 
    Loader2, 
    Clock, 
    Share2, 
    Check, 
    Linkedin, 
    Twitter, 
    MessageCircle, 
    ArrowRight 
} from 'lucide-react';
import { fetchPostsBySlug, fetchPosts, type WPPost } from '../services/wpService';
import './BlogDetailPage.css';

const BlogDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const location = useLocation();
    const isBlog = location.pathname.startsWith('/blog');
    const backPath = isBlog ? '/blog' : '/news';
    const backLabel = isBlog ? 'Blog' : 'Industry News';
    
    const [post, setPost] = useState<WPPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<WPPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const getPostData = async () => {
            setLoading(true);
            if (slug) {
                const data = await fetchPostsBySlug(slug);
                setPost(data);

                // Fetch recent posts for related articles section
                const allPosts = await fetchPosts();
                if (data) {
                    setRelatedPosts(allPosts.filter(p => p.id !== data.id).slice(0, 3));
                } else {
                    setRelatedPosts(allPosts.slice(0, 3));
                }
            }
            setLoading(false);
        };
        getPostData();
    }, [slug]);

    // Process article content and calculate estimated reading time
    const processed = useMemo(() => {
        if (!post) return { content: '', readingTime: 1 };
        
        const content = post.content.rendered;
        
        // Calculate estimated reading time (words / 200)
        const plainText = content.replace(/<[^>]*>?/gm, '');
        const wordCount = plainText.split(/\s+/).filter(Boolean).length;
        const readingTime = Math.max(1, Math.ceil(wordCount / 200));

        return { content, readingTime };
    }, [post]);

    // SEO Optimization: Update Title, Meta Description & JSON-LD Schema
    useEffect(() => {
        if (!post) return;

        const plainTitle = post.title.rendered.replace(/<[^>]*>?/gm, '');
        const plainExcerpt = post.excerpt.rendered.replace(/<[^>]*>?/gm, '').trim() || plainTitle;
        const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
            || 'https://bioryth.com/icon.png';
        const pageUrl = window.location.href;

        // Update document title
        document.title = `${plainTitle} | Bioryth Enterprise`;

        // Update Meta Description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', plainExcerpt.substring(0, 160));

        // Inject JSON-LD Structured Data Schema for BlogPosting
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": plainTitle,
            "image": [featuredImg],
            "datePublished": post.date,
            "dateModified": post.date,
            "description": plainExcerpt,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": pageUrl
            },
            "author": {
                "@type": "Organization",
                "name": "Bioryth Enterprise Editorial Team",
                "url": "https://bioryth.com"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Bioryth Enterprise",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://bioryth.com/icon.png"
                }
            }
        };

        const existingScript = document.getElementById('jsonld-blog-post');
        if (existingScript) {
            existingScript.remove();
        }

        const script = document.createElement('script');
        script.id = 'jsonld-blog-post';
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schemaData);
        document.head.appendChild(script);

        return () => {
            const scriptToRemove = document.getElementById('jsonld-blog-post');
            if (scriptToRemove) scriptToRemove.remove();
        };
    }, [post]);

    // Share link handler
    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    if (loading) {
        return (
            <div className="bdp-loading">
                <Loader2 className="bdp-spinner" size={48} />
                <p>Loading post content...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="bdp-error">
                <h1>Article Not Found</h1>
                <p>The requested article could not be located or may have been moved.</p>
                <Link to={backPath} className="bdp-btn-back">
                    Back to {backLabel}
                </Link>
            </div>
        );
    }

    const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
        || 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1200';
    const categoryName = post._embedded?.['wp:term']?.[0]?.[0]?.name || (isBlog ? 'Nutraceutical Insights' : 'Industry News');
    const plainTitle = post.title.rendered.replace(/<[^>]*>?/gm, '');
    const currentUrl = encodeURIComponent(window.location.href);
    const encodedTitle = encodeURIComponent(plainTitle);

    return (
        <article className="bdp-page-wrapper">
            
            {/* ── Hero / Header Area ── */}
            <section className="bdp-hero-section">
                <div className="bdp-container">
                    
                    {/* Breadcrumbs */}
                    <nav className="bdp-breadcrumbs" aria-label="Breadcrumb">
                        <Link to="/">Home</Link>
                        <span className="bdp-separator">/</span>
                        <Link to={backPath}>{backLabel}</Link>
                        <span className="bdp-separator">/</span>
                        <span className="current-crumb">{plainTitle}</span>
                    </nav>

                    <div className="bdp-hero-content">
                        <div className="bdp-hero-tags">
                            <span className="bdp-tag">{categoryName}</span>
                        </div>

                        <h1 
                            className="bdp-title" 
                            dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
                        />

                        <div className="bdp-meta-bar">
                            <div className="bdp-meta-item">
                                <Calendar size={16} />
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </time>
                            </div>
                            <div className="bdp-meta-item">
                                <Clock size={16} />
                                <span>{processed.readingTime} min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Main Section with Content & Sidebar ── */}
            <section className="bdp-main-section">
                <div className="bdp-container">
                    
                    {/* Featured Hero Image */}
                    {featuredImg && (
                        <div className="bdp-featured-wrapper">
                            <img
                                src={featuredImg}
                                alt={plainTitle}
                                className="bdp-featured-img"
                            />
                        </div>
                    )}

                    <div className="bdp-layout-grid">
                        
                        {/* Article Main Body */}
                        <div className="bdp-article-main">
                            <div
                                className="bdp-body"
                                dangerouslySetInnerHTML={{ __html: processed.content }}
                            />

                            {/* CTA Box */}
                            <div className="bdp-article-footer">
                                <div className="bdp-cta-box">
                                    <div className="bdp-cta-text">
                                        <h3>Elevate Your Product Formulations</h3>
                                        <p>Discover Bioryth's premium range of science-backed nutraceutical ingredients.</p>
                                    </div>
                                    <Link to="/products" className="bdp-cta-btn">
                                        Explore Products <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar (Social Sharing) */}
                        <aside className="bdp-sidebar">
                            
                            {/* Share Card */}
                            <div className="bdp-share-card">
                                <div className="bdp-sidebar-heading">
                                    <Share2 size={18} />
                                    <span>Share Article</span>
                                </div>
                                <div className="bdp-share-buttons">
                                    <a
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bdp-share-btn"
                                        title="Share on LinkedIn"
                                        aria-label="Share on LinkedIn"
                                    >
                                        <Linkedin size={18} />
                                    </a>
                                    <a
                                        href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodedTitle}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bdp-share-btn"
                                        title="Share on X (Twitter)"
                                        aria-label="Share on X"
                                    >
                                        <Twitter size={18} />
                                    </a>
                                    <a
                                        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${currentUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bdp-share-btn"
                                        title="Share on WhatsApp"
                                        aria-label="Share on WhatsApp"
                                    >
                                        <MessageCircle size={18} />
                                    </a>
                                    <button
                                        onClick={handleCopyLink}
                                        className={`bdp-share-btn ${copied ? 'copied' : ''}`}
                                        title="Copy Link"
                                        aria-label="Copy Link"
                                    >
                                        {copied ? <Check size={18} /> : <Share2 size={18} />}
                                    </button>
                                </div>
                            </div>
                        </aside>

                    </div>
                </div>
            </section>

            {/* ── Related Articles Section ── */}
            {relatedPosts.length > 0 && (
                <section className="bdp-related-section">
                    <div className="bdp-container">
                        <h2 className="bdp-related-title">Recommended Articles</h2>
                        <div className="bdp-related-grid">
                            {relatedPosts.map((rPost) => {
                                const rImg = rPost._embedded?.['wp:featuredmedia']?.[0]?.source_url
                                    || 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800';
                                return (
                                    <Link 
                                        to={`/blog/${rPost.slug}`} 
                                        key={rPost.id} 
                                        className="bdp-related-card"
                                    >
                                        <div className="bdp-related-img-wrap">
                                            <img src={rImg} alt={rPost.title.rendered} />
                                        </div>
                                        <div className="bdp-related-body">
                                            <div className="bdp-related-date">
                                                <Calendar size={14} />
                                                {new Date(rPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                            <h4 dangerouslySetInnerHTML={{ __html: rPost.title.rendered }} />
                                            <span className="bdp-related-link">
                                                Read Article <ChevronRight size={16} />
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

        </article>
    );
};

export default BlogDetailPage;
