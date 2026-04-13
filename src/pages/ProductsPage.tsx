import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Loader2, ArrowRight } from 'lucide-react';
import { fetchProducts, fetchCategories, type WPPost } from '../services/wpService';

interface Category {
    id: string;
    name: string;
    color: string;
}

// Color palette mapping to maintain premium design
const getColorByName = (name: string): string => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('longevity') || lowerName.includes('aging')) return '#8B5CF6'; // Purple
    if (lowerName.includes('collagen') || lowerName.includes('beauty')) return '#EC4899'; // Pink
    if (lowerName.includes('heart') || lowerName.includes('vitality')) return '#EF4444'; // Red
    if (lowerName.includes('cognitive') || lowerName.includes('brain')) return '#3B82F6'; // Blue
    if (lowerName.includes('metabolic') || lowerName.includes('weight')) return '#10B981'; // Green
    if (lowerName.includes('vitamin') || lowerName.includes('essential')) return '#F59E0B'; // Amber
    if (lowerName.includes('amino')) return '#84CC16'; // Lime
    if (lowerName.includes('structural') || lowerName.includes('bone') || lowerName.includes('joint')) return '#6B7280'; // Gray
    return '#4F46E5'; // Default Indigo
};

const ProductsPage: React.FC = () => {
    const [allProducts, setAllProducts] = useState<WPPost[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState<Category | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Fetch dynamic categories from WP
                const wpCats = await fetchCategories();
                const mappedCats: Category[] = wpCats.map(cat => ({
                    id: cat.id.toString(),
                    name: cat.name.toUpperCase(),
                    color: getColorByName(cat.name)
                }));
                
                setCategories(mappedCats);
                if (mappedCats.length > 0) setActiveCategory(mappedCats[0]);

                // Fetch all products
                const data = await fetchProducts();
                setAllProducts(data);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);


    const filteredProducts = allProducts.filter(p => {
        const matchesSearch = p.title.rendered.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Filter by category if we have an active selection
        if (!activeCategory) return matchesSearch;
        const matchesCategory = p.categories && p.categories.includes(parseInt(activeCategory.id));
        
        return matchesSearch && matchesCategory;
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
                <div className="category-tabs reveal" style={{ animationDelay: '0.2s' }}>
                    <div className="category-tabs-inner">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`category-tab ${activeCategory?.id === cat.id ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveCategory(cat);
                                    setSearchTerm('');
                                }}
                                style={{
                                    '--category-color': cat.color
                                } as React.CSSProperties}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                <main className="products-content reveal" style={{ animationDelay: '0.4s' }}>
                    <div className="product-grid-header">
                        <div>
                            {activeCategory ? (
                                <h2 className="category-title" style={{ color: activeCategory.color }}>
                                    {activeCategory.name}
                                </h2>
                            ) : (
                                <h2 className="category-title">All Ingredients</h2>
                            )}
                            <p className="category-subtitle">
                                Browse premium nutraceutical ingredients for targeted support and cellular health.
                            </p>
                        </div>
                        <div className="grid-summary">
                            <span className="product-count-pill" style={{ backgroundColor: activeCategory?.color ?? '#8B5CF6' }}>
                                {loading ? 'Loading…' : `${filteredProducts.length} Products`}
                            </span>
                        </div>
                    </div>

                    <div className="search-box">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
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
                                {filteredProducts.length === 0 && !loading && (
                                    <div className="no-results">
                                        No products found in this category.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </section>
        </div>
    );
};

export default ProductsPage;
