import { fetcher } from '@/apis';
import { API_BASE_URL_VERSIONED } from '@/constants';
import { create } from 'zustand';

// متا دیتا برای پست
export interface PostMeta {
  id: string;
  key: string;
  value: string;
}

// تصویر شاخص پست
export interface FeaturedImage {
  id: string;
  url: string;
}

// ساختار هر پست
export interface Post {
  id: string;
  title: string;
  meta: PostMeta[];
  featuredImage: FeaturedImage;
}

// پاسخ API برای لیست پست‌ها
interface PostListResponse {
  data: Post[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface PostState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;

  setPosts: (posts: Post[]) => void;
  fetchPosts: (page?: number, limit?: number, search?: string) => Promise<void>;
  audioUrls: () => string[];
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,

  setPosts: (posts) => set({ posts }),

  fetchPosts: async (page = 1, limit = 10, search = '') => {
    set({ isLoading: true, error: null });
    try {
      const url = `${API_BASE_URL_VERSIONED}/post?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`;
      const response = await fetcher<PostListResponse>(url, { method: 'GET' });
      set({ posts: response.data });
    } catch (err: any) {
      set({ error: err.message ?? 'خطا در دریافت پست‌ها' });
    } finally {
      set({ isLoading: false });
    }
  },

  audioUrls: () =>
    get()
      .posts.map((p) => p.meta.find((m) => m.key === 'audio_url')?.value)
      .filter((v): v is string => Boolean(v)),
}));
