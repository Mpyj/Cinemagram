// ===== User Types =====

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'owner' | 'admin' | 'user';
  avatar_url?: string | null;
  bio?: string | null;
  is_active: boolean;
  is_banned: boolean;
  ban_until?: string | null;
  mute_until?: string | null;
  created_at: string;
}

// ===== Genre Types =====

export interface Genre {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

// ===== Content Types =====

export interface Content {
  id: number;
  title: string;
  title_en?: string;
  slug: string;
  description?: string;
  type: 'movie' | 'series' | 'anime';
  status: 'published' | 'draft' | 'archived';
  release_year?: number | null;
  rating?: number | null;
  country?: string | null;
  language?: string | null;
  poster_url?: string | null;
  backdrop_url?: string | null;
  trailer_url?: string | null;
  video_url?: string | null;
  download_url?: string | null;
  views_count: number;
  genres: Genre[];
  created_at: string;
}

// ===== Episode Types =====

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

// ===== Comment Types =====

export interface Comment {
  id: number;
  user_id: number;
  content_id: number;
  parent_id?: number | null;
  body: string;
  is_approved: boolean;
  is_hidden: boolean;
  created_at: string;
  username?: string | null;
  replies?: Comment[] | null;
}

// ===== Auth Types =====

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

// ===== Watchlist Types =====

export interface WatchlistItem {
  id: number;
  user_id: number;
  content_id: number;
  status: 'watching' | 'completed' | 'plan_to_watch' | 'dropped';
  added_at: string;
  content?: Content;
}

// ===== API Response Types =====

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}