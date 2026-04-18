import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductBySlug, type WPPost } from '../services/wpService';
import { ChevronDown, ChevronUp, ArrowLeft, Mail, MessageCircle, FileText, Info, Star, TrendingUp, ClipboardList, ShieldCheck, Cpu, Layers, Package, HelpCircle } from 'lucide-react';
import './ProductDetailPage.css';
import ProductGrid from '../components/ProductGrid';

const ProductDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<WPPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useEffect(() => {
        const loadProduct = async () => {
            if (slug) {
                const data = await fetchProductBySlug(slug);
                setProduct(data);
            }
            setLoading(false);
        };
        loadProduct();
        // Reset scroll when slug changes
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container section-padding text-center">
                <h2>Product not found</h2>
                <Link to="/products" className="btn btn-primary">Back to Products</Link>
            </div>
        );
    }

    const { acf, title, _embedded } = product;
    const featuredImage = _embedded?.['wp:featuredmedia']?.[0]?.source_url;

    const extractImageFromContent = (html: string) => {
        if (!html) return null;
        const imgMatch = html.match(/<img[^>]+src="([^"]+)"/i);
        return imgMatch ? imgMatch[1] : null;
    };

    const removeFirstImageFromContent = (html: string) => {
        if (!html) return html;

        let cleaned = html.replace(/\[caption[^\]]*\](.*?)\[\/caption\]/gis, (_, content) => {
            const imgMatch = content.match(/<img[^>]*>/i);
            if (!imgMatch) return content;
            const captionText = content.replace(imgMatch[0], '').trim();
            return captionText || '';
        });

        cleaned = cleaned.replace(/<img[^>]*>/i, '');
        return cleaned;
    };

    const sections = [
        { id: 'about', title: 'About', content: acf?.about, icon: <Info size={24} /> },
        { id: 'key_highlights', title: 'Key Product Highlights', content: acf?.['key-highlights'], icon: <Star size={24} /> },
        { id: 'market_insights', title: 'Market Insights', content: acf?.market_insights, icon: <TrendingUp size={24} /> },
        { id: 'specification', title: 'Specification', content: acf?.specification, icon: <ClipboardList size={24} /> },
        { id: 'quality_certification', title: 'Quality & Certifications', content: acf?.['quality_&_certifications'], icon: <ShieldCheck size={24} /> },
        { id: 'technology', title: 'Technology', content: acf?.technology, icon: <Cpu size={24} /> },
        { id: 'applications', title: 'Applications', content: acf?.applications, icon: <Layers size={24} /> },
        { id: 'packaging', title: 'Packaging', content: acf?.packaging, icon: <Package size={24} /> },
        { id: 'faqs', title: 'FAQs', content: acf?.faqs, icon: <HelpCircle size={24} /> },
    ]
        .filter(s => s.content)
        .map(s => {
            const imageUrl = extractImageFromContent(s.content!);
            return {
                ...s,
                imageUrl,
                cleanedContent: imageUrl ? removeFirstImageFromContent(s.content!) : s.content!,
            };
        });

    const processWPContent = (html: string) => {
        if (!html) return '';
        
        // Handle [caption] shortcodes
        // Example: [caption id="..." align="..." width="..."]<img ... /> Caption Text[/caption]
        let processed = html.replace(/\[caption[^\]]*\](.*?)\[\/caption\]/gs, (_, content) => {
            // Extract the img tag and the text outside it
            const imgMatch = content.match(/<img[^>]*>/);
            const imgTag = imgMatch ? imgMatch[0] : '';
            const captionText = content.replace(imgTag, '').trim();
            
            return `
                <figure class="wp-caption">
                    ${imgTag}
                    ${captionText ? `<figcaption class="wp-caption-text">${captionText}</figcaption>` : ''}
                </figure>
            `;
        });

        return processed;
    };

    const renderFormattedContent = (content: string, isSpec: boolean = false) => {
        if (!content) return null;

        const processedContent = processWPContent(content);

        // 1. Check if it's HTML or contains shortcodes
        if (/<[a-z][\s\S]*>/i.test(processedContent)) {
            return <div className="wp-content" dangerouslySetInnerHTML={{ __html: processedContent }} />;
        }

        const lines = processedContent.split('\n').map(l => l.trim()).filter(l => l);

        // 2. Check for Specification Table (Key: Value)
        const colonLines = lines.filter(l => l.includes(':'));
        if (isSpec || (lines.length > 0 && colonLines.length / lines.length > 0.5)) {
            return (
                <div className="table-wrapper">
                    <table className="specification-table">
                        <tbody>
                            {lines.map((line, i) => {
                                const [key, ...values] = line.split(':');
                                if (values.length > 0) {
                                    return (
                                        <tr key={i}>
                                            <th>{key.trim()}</th>
                                            <td>{values.join(':').trim()}</td>
                                        </tr>
                                    );
                                }
                                return (
                                    <tr key={i}>
                                        <td colSpan={2}>{line}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            );
        }

        // 3. Check for Bullet List
        const bulletLines = lines.filter(l => /^[-*•]/.test(l));
        if (lines.length > 0 && bulletLines.length / lines.length > 0.4) {
            return (
                <ul className="premium-list">
                    {lines.map((line, i) => (
                        <li key={i}>{line.replace(/^[-*•]\s*/, '')}</li>
                    ))}
                </ul>
            );
        }

        // 4. Default: Paragraphs
        return (
            <div className="wp-content">
                {lines.map((line, i) => (
                    <p key={i}>{line}</p>
                ))}
            </div>
        );
    };

    const parseFaqs = (faqText: string) => {
        if (/<[a-z][\s\S]*>/i.test(faqText)) {
            return [{ q: 'Frequently Asked Questions', a: faqText, isHtml: true }];
        }

        const lines = faqText.split('\n').filter(line => line.trim());
        const faqs: { q: string, a: string, isHtml?: boolean }[] = [];
        let currentFaq: { q: string, a: string } | null = null;

        lines.forEach(line => {
            const l = line.trim();
            if (l.toLowerCase().startsWith('q:') || l.toLowerCase().startsWith('question:')) {
                if (currentFaq) faqs.push(currentFaq);
                currentFaq = { q: l.replace(/^(q:|question:)\s*/i, ''), a: '' };
            } else if (l.toLowerCase().startsWith('a:') || l.toLowerCase().startsWith('answer:')) {
                if (currentFaq) currentFaq.a = l.replace(/^(a:|answer:)\s*/i, '');
            } else if (currentFaq) {
                currentFaq.a += (currentFaq.a ? '\n' : '') + l;
            }
        });
        if (currentFaq) faqs.push(currentFaq);
        
        if (faqs.length === 0) return [{ q: 'Information', a: faqText, isHtml: true }];
        return faqs;
    };

    return (
        <div className="product-detail-page">
            <div className="detail-hero">
                <div className="hero-bg-accent"></div>
                <div className="container">
                    <Link to="/products" className="back-link reveal">
                        <ArrowLeft size={18} /> Back to Ingredients
                    </Link>
                    <div className="hero-grid">
                        <div className="hero-content reveal">
                            <div className="hero-badge">Nutraceutical Grade</div>
                            <h1>{title.rendered}</h1>
                            {acf?.short_description && (
                                <p className="hero-short-desc">{acf.short_description}</p>
                            )}
                            <div className="tags">
                                <span className="tag">{title.rendered}</span>
                                <span className="tag">Premium Quality</span>
                                <span className="tag">Certified</span>
                            </div>
                            <div className="cta-group">
                                <Link to="/contact" className="btn btn-primary">Request Specification</Link>
                                <a href="https://wa.me/919104133333" className="btn btn-whatsapp">
                                    <MessageCircle size={18} /> WhatsApp Inquiry
                                </a>
                            </div>
                        </div>
                        <div className="hero-image reveal" style={{ animationDelay: '0.2s' }}>
                            <div className="image-card">
                                {featuredImage ? (
                                    <img src={featuredImage} alt={title.rendered} />
                                ) : (
                                    <div className="placeholder-image">
                                        <FileText size={64} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="detail-nav sticky">
                <div className="container">
                    <ul className="nav-list">
                        {sections.map(s => (
                            <li key={s.id}>
                                <a href={`#${s.id}`}>{s.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            <div className="detail-sections container">
                {sections.map((section, index) => (
                    <section id={section.id} key={section.id} className="detail-section reveal">
                        <div className="section-header-compact">
                            <div className="section-icon">{section.icon}</div>
                            <h2 className="section-title">{section.title}</h2>
                        </div>

                        {section.id === 'faqs' ? (
                            <div className="section-body section-body-static">
                                <div className="faq-accordion">
                                    {parseFaqs(section.content!).map((faq, i) => (
                                        <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                                            <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                                <span className="q-text">{faq.q}</span>
                                                <div className="faq-icon-toggle">
                                                    {openFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                                </div>
                                            </button>
                                            <div className="faq-answer">
                                                {faq.isHtml ? (
                                                    renderFormattedContent(faq.a)
                                                ) : (
                                                    <p>{faq.a}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className={`section-body ${section.imageUrl ? (index % 2 === 1 ? 'reverse' : '') : 'full'}`}>
                                <div className="section-text">
                                    {renderFormattedContent(section.cleanedContent, section.id === 'specification')}
                                </div>
                                {section.imageUrl && (
                                    <div className="section-side-image">
                                        <div className="image-panel">
                                            <img src={section.imageUrl} alt={`${title.rendered} ${section.title}`} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {index < sections.length - 1 && <div className="section-separator" />}
                    </section>
                ))}
            </div>

            <section className="related-products-section section-padding-lg">
                <div className="container">
                    <div className="section-header-centered">
                        <h2>Explore Related Ingredients</h2>
                        <div className="header-line"></div>
                    </div>
                    <ProductGrid limit={4} excludeId={product.id} />
                </div>
            </section>

            <section className="inquiry-footer section-padding-lg">
                <div className="container">
                    <div className="footer-glass-card reveal">
                        <div className="footer-content">
                            <h2>Elevate Your Product with {title.rendered}</h2>
                            <p>Connect with our technical team today for samples, documentation, and expert guidance.</p>
                            <div className="footer-ctas">
                                <Link to="/contact" className="btn btn-primary btn-lg">
                                    <Mail size={18} /> Send Inquiry
                                </Link>
                                <a href="https://wa.me/919104133333" className="btn btn-glass btn-lg">
                                    <MessageCircle size={18} /> Chat on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetailPage;
