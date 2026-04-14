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
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const wpCats = await fetchCategories();
                const mappedCats: Category[] = wpCats.map(cat => ({
                    id: cat.id.toString(),
                    name: cat.name.toUpperCase(),
                    color: getColorByName(cat.name)
                }));

                setCategories(mappedCats);

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

    const searchQuery = searchTerm.trim().toLowerCase();

    const categorySections = categories.map((category) => {
        const products = allProducts.filter((product) => {
            const hasCategory = product.categories?.includes(parseInt(category.id, 10));
            const matchesSearch = searchQuery === '' || product.title.rendered.toLowerCase().includes(searchQuery);
            return hasCategory && matchesSearch;
        });

        return {
            category,
            products,
        };
    });

    const totalProducts = categorySections.reduce((sum, section) => sum + section.products.length, 0);

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
                <main className="products-content reveal" style={{ animationDelay: '0.4s' }}>
                    <div className="product-grid-header">
                        <div>
                            <h2 className="category-title">Explore by Category</h2>
                            <p className="category-subtitle">
                                Scroll through our ingredient categories to find the products that match your formulation goals.
                            </p>
                        </div>
                        <div className="grid-summary">
                            <span className="product-count-pill" style={{ backgroundColor: '#8B5CF6' }}>
                                {loading ? 'Loading…' : `${totalProducts} Products`}
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

                    {loading ? (
                        <div className="loading-state">
                            <Loader2 className="animate-spin" size={32} />
                            <p>Loading ingredients...</p>
                        </div>
                    ) : (
                        <>
                            {categorySections.length > 0 ? (
                                categorySections.map((section, sectionIndex) => (
                                    <section
                                        key={section.category.id}
                                        className="category-section reveal"
                                        style={{ animationDelay: `${sectionIndex * 0.08}s` }}
                                    >
                                        <div className="category-header">
                                            <div>
                                                <h2 style={{ color: section.category.color }}>
                                                    {section.category.name}
                                                </h2>
                                                <p className="category-subtitle">
                                                    {section.products.length > 0
                                                        ? `${section.products.length} premium product${section.products.length > 1 ? 's' : ''} in this category.`
                                                        : 'No products available in this category yet.'}
                                                </p>
                                            </div>
                                            <span className="product-count">{section.products.length} items</span>
                                        </div>

                                        {section.products.length > 0 ? (
                                            <div className="products-grid">
                                                {section.products.map((product, index) => {
                                                    const featuredImage = product._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                                                    return (
                                                        <Link
                                                            to={`/products/${product.slug}`}
                                                            key={product.id}
                                                            className="product-card"
                                                            style={{ animationDelay: `${index * 0.04}s` }}
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
                                        ) : (
                                            <div className="empty-category-message">
                                                No ingredients found for this category.
                                            </div>
                                        )}
                                    </section>
                                ))
                            ) : (
                                <div className="no-results">
                                    No products found. Try a different search term or select another category.
                                </div>
                            )}
                        </>
                    )}
                </main>
            </section>
        </div>
    );
};

export default ProductsPage;
