const WP_API_URL = 'https://blog.bioryth.com/wp-json/wp/v2';

export interface WPPost {
    id: number;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    date: string;
    featured_media: number;
    acf?: {
        about?: string;
        why?: string;
        market_insights?: string;
        technology?: string;
        marketing_support?: string;
        faqs?: string;
        short_description?: string;
        'key-highlights'?: string;
        specification?: string;
        'quality_&_certifications'?: string;
        technology_advantages?: string;
        applications?: string;
        packaging?: string;
    };
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
        }>;
        'wp:term'?: Array<Array<{
            id: number;
            name: string;
            slug: string;
            taxonomy: string;
        }>>;
    };
}

export const fetchPosts = async (excludeCategories: number[] = []): Promise<WPPost[]> => {
    try {
        let url = `${WP_API_URL}/posts?_embed&per_page=10`;
        if (excludeCategories.length > 0) {
            url += `&categories_exclude=${excludeCategories.join(',')}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch posts');
        return await response.json();
    } catch (error) {
        console.error('Error fetching WP posts:', error);
        return [];
    }
};

export const fetchProducts = async (): Promise<WPPost[]> => {
    try {
        // Try products first (plural)
        const response = await fetch(`${WP_API_URL}/products?_embed&per_page=100`);
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) return data;
        }
        
        // Fallback to product (singular) which is common for CPTs
        const altResponse = await fetch(`${WP_API_URL}/product?_embed&per_page=100`);
        if (altResponse.ok) {
            const altData = await altResponse.json();
            if (Array.isArray(altData)) return altData;
        }

        // Final fallback: try posts with a category named 'products' if all else fails
        console.warn('Failed to fetch from /products or /product, trying fallback...');
        return [];
    } catch (error) {
        console.error('Error fetching WP products:', error);
        return [];
    }
};

export const fetchProductBySlug = async (slug: string): Promise<WPPost | null> => {
    try {
        const response = await fetch(`${WP_API_URL}/products?slug=${slug}&_embed`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) return data[0];
        }

        const altResponse = await fetch(`${WP_API_URL}/product?slug=${slug}&_embed`);
        if (altResponse.ok) {
            const altData = await altResponse.json();
            return altData.length > 0 ? altData[0] : null;
        }

        return null;
    } catch (error) {
        console.error('Error fetching WP product by slug:', error);
        return null;
    }
};

export const fetchPostById = async (id: string): Promise<WPPost | null> => {
    try {
        const response = await fetch(`${WP_API_URL}/posts/${id}?_embed`);
        if (!response.ok) throw new Error('Failed to fetch post');
        return await response.json();
    } catch (error) {
        console.error('Error fetching WP post:', error);
        return null;
    }
};

export const fetchPostsBySlug = async (slug: string): Promise<WPPost | null> => {
    try {
        const response = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`);
        if (!response.ok) throw new Error('Failed to fetch post by slug');
        const posts = await response.json();
        return posts.length > 0 ? posts[0] : null;
    } catch (error) {
        console.error('Error fetching WP post by slug:', error);
        return null;
    }
};

export const fetchCategoryBySlug = async (slug: string): Promise<number | null> => {
    try {
        const response = await fetch(`${WP_API_URL}/categories?slug=${slug}`);
        if (!response.ok) throw new Error('Failed to fetch category');
        const categories = await response.json();
        return categories.length > 0 ? categories[0].id : null;
    } catch (error) {
        console.error('Error fetching category:', error);
        return null;
    }
};

export const fetchPostsByCategory = async (categoryId: number): Promise<WPPost[]> => {
    try {
        const response = await fetch(`${WP_API_URL}/posts?categories=${categoryId}&_embed&per_page=10`);
        if (!response.ok) throw new Error('Failed to fetch posts by category');
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts by category:', error);
        return [];
    }
};
