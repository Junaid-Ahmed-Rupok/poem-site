// API client wrapper
import axios, { AxiosInstance, AxiosError } from 'axios';

class ApiClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests if available
    this.client.interceptors.request.use((config) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
      }
    );
  }

  // Poems
  async getPoems(params?: { page?: number; limit?: number; category?: string; tag?: string }) {
    return this.client.get('/api/poems', { params });
  }

  async getPoemBySlug(slug: string) {
    return this.client.get(`/api/poems/${slug}`);
  }

  // Authentication
  async register(username: string, email: string, password: string) {
    return this.client.post('/api/auth/register', { username, email, password });
  }

  async login(email: string, password: string) {
    return this.client.post('/api/auth/login', { email, password });
  }

  // File Upload
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.client.post('/api/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  async uploadAudio(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.client.post('/api/upload/audio', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  async createPoem(data: FormData) {
    return this.client.post('/api/poems', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  async updatePoem(id: string, data: FormData) {
    return this.client.put(`/api/poems/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  async deletePoem(id: string) {
    return this.client.delete(`/api/poems/${id}`);
  }

  // Stories
  async getStories(params?: { page?: number; limit?: number; category?: string }) {
    return this.client.get('/api/stories', { params });
  }

  async getStoryBySlug(slug: string) {
    return this.client.get(`/api/stories/${slug}`);
  }

  async createStory(data: FormData) {
    return this.client.post('/api/stories', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  async updateStory(id: string, data: FormData) {
    return this.client.put(`/api/stories/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  // Novels
  async getNovels(params?: { page?: number; limit?: number }) {
    return this.client.get('/api/novels', { params });
  }

  async getNovelBySlug(slug: string) {
    return this.client.get(`/api/novels/${slug}`);
  }

  async getNovelChapters(novelId: string) {
    return this.client.get(`/api/novels/${novelId}/chapters`);
  }

  async getNovelChapter(novelId: string, chapterNumber: number) {
    return this.client.get(`/api/novels/${novelId}/chapters/${chapterNumber}`);
  }

  // Music
  async getMusicTracks(params?: { page?: number; limit?: number; album?: string }) {
    return this.client.get('/api/music', { params });
  }

  async getMusicTrackBySlug(slug: string) {
    return this.client.get(`/api/music/${slug}`);
  }

  async getMusicAlbums() {
    return this.client.get('/api/music/albums');
  }

  async createMusicTrack(data: FormData) {
    return this.client.post('/api/music', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  // Analytics
  async trackEvent(event: any) {
    return this.client.post('/api/analytics', event);
  }

  // Admin endpoints
  async getDashboardStats() {
    return this.client.get('/api/admin/stats');
  }

  async getAdPlacements() {
    return this.client.get('/api/admin/ads');
  }

  async updateAdPlacement(id: string, data: any) {
    return this.client.put(`/api/admin/ads/${id}`, data);
  }

  // Categories
  async getCategories(type: 'poem' | 'story' | 'music') {
    return this.client.get('/api/categories', { params: { type } });
  }

  // Tags
  async getTags(type: 'poem' | 'story' | 'music') {
    return this.client.get('/api/tags', { params: { type } });
  }
}

export const apiClient = new ApiClient();
