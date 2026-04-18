import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, type WPPost } from '../services/wpService';
import { ArrowRight, Loader2 } from 'lucide-react';
import './ProductGrid.css';

interface ProductGridProps {
    title?: string;
    limit?: number;
    excludeId?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, limit = 4, excludeId }) => {
    const [products, setProducts] = useState<WPPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts();
            let filtered = data;
            if (excludeId) {
                filtered = filtered.filter(p => p.id !== excludeId);
            }
            setProducts(filtered.slice(0, limit));
            setLoading(false);
        };
        loadProducts();
    }, [limit, excludeId]);

    if (loading) {
        return (
            <div className="grid-loading">
                <Loader2 className="animate-spin" size={32} />
            </div>
        );
    }

    if (products.length === 0) return null;

    return (
        <section className="product-grid-section">
            <div className="container">
                {title && <h2 className="grid-title">{title}</h2>}
                <div className="product-grid">
                    {products.map((product) => {
                        const featuredImage = product._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                        return (
                            <Link 
                                to={`/products/${product.slug}`} 
                                key={product.id} 
                                className="product-card"
                            >
                                <div className="card-image">
                                    {featuredImage ? (
                                        <img src={featuredImage} alt={product.title.rendered} />
                                    ) : (
                                        <div className="image-placeholder">No Image</div>
                                    )}
                                    <div className="card-overlay">
                                        <span className="learn-more">LEARN MORE</span>
                                    </div>
                                </div>
                                <div className="card-info">
                                    <h3>{product.title.rendered}</h3>
                                    <ArrowRight size={18} className="card-arrow" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
