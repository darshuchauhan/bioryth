import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Loader2, ArrowRight } from 'lucide-react';
import { fetchProducts, type WPPost } from '../services/wpService';

interface Category {
    id: string;
    name: string;
    color: string;
}

const categories: Category[] = [
    { id: 'longevity', name: 'HEALTHY AGING + LONGEVITY', color: '#8B5CF6' },
    { id: 'collagen', name: 'COLLAGEN & BEAUTY SCIENCE', color: '#EC4899' },
    { id: 'heart', name: 'HEART HEALTH & VITALITY', color: '#EF4444' },
    { id: 'cognitive', name: 'COGNITIVE PERFORMANCE & BRAIN', color: '#3B82F6' },
    { id: 'metabolic', name: 'METABOLIC & WEIGHT', color: '#10B981' },
    { id: 'vitamin', name: 'VITAMINS & ESSENTIALS', color: '#F59E0B' },
    { id: 'amino', name: 'AMINO ACIDS', color: '#84CC16' },
    { id: 'structural', name: 'BONE, JOINT & STRUCTURAL', color: '#6B7280' }
];

const ProductsPage: React.FC = () => {
    const [allProducts, setAllProducts] = useState<WPPost[]>([]);
    const [activeCategory, setActiveCategory] = useState<Category>(categories[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts();
            setAllProducts(data);
            setLoading(false);
        };
        loadProducts();
    }, []);


    const filteredProducts = allProducts.filter(p => {
        const matchesSearch = p.title.rendered.toLowerCase().includes(searchTerm.toLowerCase());
        // Simple filter logic: if we had categories in WP, we'd filter by those.
        // For now, we'll show all or use a placeholder logic.
        return matchesSearch;
    });

    return (
        <div className="products-page">
            <section className="page-header section-padding">
                <div className="container">
                    <h1 className="reveal">Our Ingredients</h1>
                    <p className="reveal" style={{ animationDelay: '0.2s' }}>
                        A comprehensive catalog of high-performance nutraceutical ingredients.
                    </p>
                </div>
            </section>

            <section className="products-container container">
                <div className="products-layout">
                    {/* Sidebar */}
                    <aside className="products-sidebar reveal">
                        <div className="search-box">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <nav className="category-list">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    className={`category-item ${activeCategory.id === cat.id ? 'active' : ''}`}
                                    onClick={() => {
                                        setActiveCategory(cat);
                                        setSearchTerm('');
                                    }}
                                    style={{
                                        '--category-color': cat.color
                                    } as React.CSSProperties}
                                >
                                    <span className="color-dot" style={{ backgroundColor: cat.color }}></span>
                                    {cat.name}
                                    <ChevronRight size={16} className="arrow" />
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="products-content reveal" style={{ animationDelay: '0.4s' }}>
                        <div className="category-header" style={{ borderColor: activeCategory.color }}>
                            <h2 style={{ color: activeCategory.color }}>{activeCategory.name}</h2>
                            <span className="product-count">{loading ? '...' : filteredProducts.length} Products</span>
                        </div>

                        <div className="products-grid-container">
                            {loading ? (
                                <div className="loading-state">
                                    <Loader2 className="animate-spin" size={32} />
                                    <p>Loading ingredients...</p>
                                </div>
                            ) : (
                                <div className="products-grid">
                                    {filteredProducts.map((product, index) => {
                                        const featuredImage = product._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                                        return (
                                            <Link 
                                                to={`/products/${product.slug}`} 
                                                key={product.id} 
                                                className="product-card"
                                                style={{ animationDelay: `${index * 0.05}s` }}
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
                                    {filteredProducts.length === 0 && (
                                        <div className="no-results">
                                            No products found matching your search.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </section>
        </div>
    );
};

export default ProductsPage;
