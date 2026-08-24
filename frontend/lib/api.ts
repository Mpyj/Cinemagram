import axios from 'axios';
import { Content, Genre, Episode, Comment, LoginRequest, RegisterRequest, TokenResponse, User } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const getContent = async (params?: Record<string, string | number | undefined>) => {
  const response = await api.get('/content', { params });
  return response.data as Content[];
};

export const getContentBySlug = async (slug: string) => {
  const response = await api.get(`/content/slug/${slug}`);
  return response.data as Content;
};

export const getContentById = async (id: number) => {
  const response = await api.get(`/content/${id}`);
  return response.data as Content;
};

export const getEpisodes = async (contentId: number) => {
  const response = await api.get('/episodes', {
    params: { content_id: contentId },
  });
  return response.data as Episode[];
};

export const getGenres = async () => {
  const response = await api.get('/genres');
  return response.data as Genre[];
};

export const getComments = async (contentId: number) => {
  const response = await api.get(`/comments/content/${contentId}`);
  return response.data as Comment[];
};

export const addComment = async (comment: { content_id: number; body: string; parent_id?: number }) => {
  const response = await api.post('/comments', comment);
  return response.data as Comment;
};

export const login = async (data: LoginRequest) => {
  const response = await api.post('/auth/login', data);
  return response.data as TokenResponse;
};

export const register = async (data: RegisterRequest) => {
  const response = await api.post('/auth/register', data);
  return response.data as User;
};

export const getMyProfile = async () => {
  const response = await api.get('/users/me');
  return response.data as User;
};

export const getMyComments = async () => {
  const response = await api.get('/users/me/comments');
  return response.data as Comment[];
};

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/users/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

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