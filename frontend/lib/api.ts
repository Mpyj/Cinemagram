import axios from 'axios';
import { Content, Genre, Episode, Comment, LoginRequest, RegisterRequest, TokenResponse, User } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ===== Content APIs =====
export const getContent = async (params?: any) => {
  const response = await api.get('/content', { params });
  return response.data as Content[];
};

export const getContentById = async (id: number) => {
  const response = await api.get(`/content/${id}`);
  return response.data as Content;
};

export const getEpisodes = async (contentId: number) => {
  const response = await api.get(`/content/${contentId}/episodes`);
  return response.data as Episode[];
};

// ===== Genre APIs =====
export const getGenres = async () => {
  const response = await api.get('/genres');
  return response.data as Genre[];
};

// ===== Comment APIs =====
export const getComments = async (contentId: number) => {
  const response = await api.get(`/comments/content/${contentId}`);
  return response.data as Comment[];
};

export const addComment = async (comment: { content_id: number; body: string; parent_id?: number }) => {
  const response = await api.post('/comments', comment);
  return response.data as Comment;
};

// ===== Auth APIs =====
export const login = async (data: LoginRequest) => {
  const response = await api.post('/auth/login', data);
  return response.data as TokenResponse;
};

export const register = async (data: RegisterRequest) => {
  const response = await api.post('/auth/register', data);
  return response.data as User;
};

// ===== Watchlist APIs =====
export const getWatchlist = async () => {
  const response = await api.get('/watchlist');
  return response.data as Content[];
};

export const addToWatchlist = async (contentId: number) => {
  const response = await api.post(`/watchlist/${contentId}`);
  return response.data;
};

export const removeFromWatchlist = async (contentId: number) => {
  const response = await api.delete(`/watchlist/${contentId}`);
  return response.data;
};

export default api;