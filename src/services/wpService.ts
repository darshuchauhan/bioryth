const WP_API_URL = 'https://public-api.wordpress.com/wp/v2/sites/discover.wordpress.com';

export interface WPPost {
    id: number;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    date: string;
    featured_media: number;
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
        }>;
    };
}

export const fetchPosts = async (): Promise<WPPost[]> => {
    try {
        const response = await fetch(`${WP_API_URL}/posts?_embed&per_page=6`);
        if (!response.ok) throw new Error('Failed to fetch posts');
        return await response.json();
    } catch (error) {
        console.error('Error fetching WP posts:', error);
        return [];
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
