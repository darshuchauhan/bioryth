import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    color: string;
    products: string[];
}

const categories: Category[] = [
    {
        id: 'longevity',
        name: 'HEALTHY AGING + LONGEVITY',
        color: '#8B5CF6', // Violet
        products: [
            'Apigenin', 'Calcium Alpha-Ketoglutarate (Ca-AKG)', 'Ergothioneine', 'Fisetin', 'NAD+', 'NMN', 'NMN Uthever®', 'PQQ', 'Pterostilbene', 'Quercetin 98%', 'Red Wine Extract', 'Resveratrol', 'Spermidine 3HCL', 'Trigonelline', 'Urolithin A'
        ]
    },
    {
        id: 'collagen',
        name: 'COLLAGEN & BEAUTY SCIENCE',
        color: '#EC4899', // Pink
        products: [
            'Astaxanthin', 'Collagen Peptide (Bovine / Marine / Chicken)', 'Collagen Tripeptide', 'Collagen Type V', 'Egg Shell Membrane', 'Grapeseed Extract', 'Hyaluronic Acid', 'L-Glutathione', 'S-Acetyl Glutathione', 'Saffron Extract', 'Sodium Hyaluronate', 'Veg Collagen'
        ]
    },
    {
        id: 'heart',
        name: 'HEART HEALTH & VITALITY',
        color: '#EF4444', // Red
        products: [
            'Coenzyme Q10', 'Omega-3', 'Rutin', 'DHA-10%', 'Astaxanthin', 'Resveratrol'
        ]
    },
    {
        id: 'cognitive',
        name: 'COGNITIVE PERFORMANCE & BRAIN',
        color: '#3B82F6', // Blue
        products: [
            'Ashwagandha', '5-HTP', 'Agmatine Sulfate', 'Alpha GPC', 'L-Theanine', 'Magnesium 7 Salt Complex', 'SAMe', 'Ginkgo Biloba Extract'
        ]
    },
    {
        id: 'metabolic',
        name: 'METABOLIC & WEIGHT',
        color: '#10B981', // Emerald
        products: [
            'Alpha Lipoic Acid', 'Apple Cider Vinegar', 'Beta-Sitosterol', 'D-Chiro Inositol', 'D-Mannose', 'Fiber Complex', 'Inositol', 'Matcha', 'Myo Inositol', 'White Kidney Bean'
        ]
    },
    {
        id: 'vitamin',
        name: 'VITAMINS & ESSENTIALS',
        color: '#F59E0B', // Amber
        products: [
            'Vitamin B12 (Methylcobalamin)', 'Vitamin C (Ascorbic Acid)', 'Vitamin D3 (Cholecalciferol)', 'Vitamin E Acetate', 'Vitamin K2', 'L-5MTHF', 'Beta Carotene', 'Lutein Ester', 'Lycopene', 'Milk Thistle', 'Piperine', 'Spirulina'
        ]
    },
    {
        id: 'amino',
        name: 'AMINO ACIDS',
        color: '#84CC16', // Lime
        products: [
            'L-Alanine', 'L-Taurine', 'LCLT', 'N-Acetyl L-Cysteine'
        ]
    },
    {
        id: 'structural',
        name: 'BONE, JOINT & STRUCTURAL',
        color: '#6B7280', // Gray
        products: [
            'Calcium HMB', 'Chondroitin', 'Glucosamine', 'Undenatured Collagen Type II', 'Coral Calcium'
        ]
    }
];

const ProductsPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<Category>(categories[0]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = activeCategory.products.filter(p =>
        p.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            <span className="product-count">{filteredProducts.length} Products</span>
                        </div>

                        <div className="table-responsive">
                            <table className="products-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Ingredient Name</th>
                                        <th>Category</th>
                                        <th className="text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product, index) => (
                                        <tr key={index}>
                                            <td>{String(index + 1).padStart(2, '0')}</td>
                                            <td className="product-name">{product}</td>
                                            <td>
                                                <span className="category-badge" style={{ backgroundColor: activeCategory.color + '20', color: activeCategory.color }}>
                                                    {activeCategory.id.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="text-right">
                                                <Link to="/contact" className="btn-table">Inquire</Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredProducts.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="no-results">
                                                No products found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </section>
        </div>
    );
};

export default ProductsPage;
