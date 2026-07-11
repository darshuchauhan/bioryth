import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Calendar, ChevronLeft, Loader2 } from 'lucide-react';
import { fetchPostsBySlug } from '../services/wpService';
import type { WPPost } from '../services/wpService';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

const BlogDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const location = useLocation();
    const isBlog = location.pathname.startsWith('/blog');
    const backPath = isBlog ? '/blog' : '/news';
    const backLabel = isBlog ? 'Back to Blog' : 'Back to News';
    const allLabel = isBlog ? 'View All Blog Posts' : 'View All Posts';
    const [post, setPost] = useState<WPPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPost = async () => {
            if (slug) {
                const data = await fetchPostsBySlug(slug);
                setPost(data);
            }
            setLoading(false);
        };
        getPost();
    }, [slug]);

    const processed = useMemo(() => {
        if (!post) return { content: '', toc: [] as TOCItem[] };
        const toc: TOCItem[] = [];
        const content = post.content.rendered;
        const headingRegex = /<h([23])(.*?)>(.*?)<\/h\1>/gi;
        headingRegex.lastIndex = 0;
        const matches = [...content.matchAll(headingRegex)];
        matches.forEach((match, index) => {
            const level = parseInt(match[1]);
            const rawText = match[3].replace(/<[^>]*>?/gm, '');
            const id = `heading-${index}`;
            toc.push({ id, text: rawText, level });
        });
        let idCounter = 0;
        const modifiedContent = content.replace(/<h([23])(.*?)>(.*?)<\/h\1>/gi, (_match, level, attrs, text) => {
            const id = `heading-${idCounter++}`;
            return `<h${level} id="${id}" ${attrs}>${text}</h${level}>`;
        });
        return { content: modifiedContent, toc };
    }, [post]);

    if (loading) {
        return (
            <div className="bdp-loading">
                <Loader2 className="bdp-spinner" size={48} />
                <p>Loading post details...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="bdp-error">
                <h1>Post not found</h1>
                <p>We couldn't find the blog post you're looking for.</p>
                <Link to={backPath} className="bdp-btn-back">{backLabel}</Link>
            </div>
        );
    }

    const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
        || 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1200';
    const categoryName = post._embedded?.['wp:term']?.[0]?.[0]?.name;
    const plainTitle = post.title.rendered.replace(/<[^>]*>?/gm, '');

    return (
        <div className="bdp-wrapper">

            {/* ── Post Header ── */}
            <section className="bdp-header">
                <div className="bdp-header__inner">
                    <Link to={backPath} className="bdp-back-link">
                        <ChevronLeft size={18} />
                        <span>{backLabel}</span>
                    </Link>
                    <h1 className="bdp-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                    <div className="bdp-meta">
                        <span className="bdp-date-pill">
                            <Calendar size={14} />
                            {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        {categoryName && (
                            <span className="bdp-category-tag">{categoryName}</span>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Content Area ── */}
            <div className="bdp-content-wrap">

                {/* Featured Image */}
                <div className="bdp-featured-wrap">
                    <img
                        src={featuredImg}
                        alt={plainTitle}
                        className="bdp-featured-img"
                    />
                </div>

                {/* Article Wrapper (Centered layout) */}
                <div className="bdp-grid bdp-grid--notoc">
                    <article className="bdp-article">
                        {/* Body Content (WordPress HTML) */}
                        <div
                            className="bdp-body"
                            dangerouslySetInnerHTML={{ __html: processed.content }}
                        />

                        {/* Footer Card */}
                        <div className="bdp-footer-card">
                            <div className="bdp-footer-card__text">
                                <h3>Share this article</h3>
                                <p>Spread the knowledge with your professional network.</p>
                            </div>
                            <Link to={backPath} className="bdp-footer-card__btn">{allLabel}</Link>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailPage;
