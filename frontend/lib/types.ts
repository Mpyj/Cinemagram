// Types for API responses

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'owner' | 'admin' | 'user';
  avatar_url?: string;
  bio?: string;
  is_active: boolean;
  is_banned: boolean;
  created_at: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface Content {
  id: number;
  title: string;
  title_en?: string;
  slug: string;
  description?: string;
  type: 'movie' | 'series' | 'anime';
  status: 'published' | 'draft' | 'archived';
  release_year?: number;
  rating?: number;
  country?: string;
  language?: string;
  poster_url?: string;
  backdrop_url?: string;
  trailer_url?: string;
  video_url?: string;
  download_url?: string;
  views_count: number;
  genres: Genre[];
  created_at: string;
}

export interface Episode {
  id: number;
  content_id: number;
  season_number: number;
  episode_number: number;
  title?: string;
  description?: string;
  video_url?: string;
  download_url?: string;
  thumbnail_url?: string;
  duration_minutes?: number;
}

export interface Comment {
  id: number;
  user_id: number;
  content_id: number;
  parent_id?: number;
  body: string;
  is_approved: boolean;
  is_hidden: boolean;
  created_at: string;
  replies?: Comment[];
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}