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
  updated_at?: string;
}

// ===== Genre Types =====
export interface Genre {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
}

// ===== Content Types =====
export type ContentType = 'movie' | 'series' | 'anime';
export type ContentStatus = 'published' | 'draft' | 'archived';

export interface Content {
  id: number;
  title: string;
  title_en?: string | null;
  slug: string;
  description?: string | null;
  type: ContentType;
  status: ContentStatus;
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
  updated_at?: string;
}

// ===== Episode Types =====
export interface Episode {
  id: number;
  content_id: number;
  season_number: number;
  episode_number: number;
  title?: string | null;
  description?: string | null;
  video_url?: string | null;
  download_url?: string | null;
  thumbnail_url?: string | null;
  duration_minutes?: number | null;
  air_date?: string | null;
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
  updated_at?: string;
  replies?: Comment[] | null;
}

// ===== Rating Types =====
export interface Rating {
  id: number;
  user_id: number;
  content_id: number;
  rating: number;
  review_text?: string | null;
  created_at: string;
}

// ===== Watchlist Types =====
export type WatchlistStatus = 'watching' | 'completed' | 'plan_to_watch' | 'dropped';

export interface Watchlist {
  id: number;
  user_id: number;
  content_id: number;
  status: WatchlistStatus;
  added_at: string;
}

// ===== Auth Types =====
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

// ===== API Response Types =====
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
}

// ===== Form Types =====
export interface ContentFormData {
  title: string;
  title_en?: string;
  slug: string;
  description?: string;
  type: ContentType;
  release_year?: number;
  rating?: number;
  country?: string;
  language?: string;
  poster_url?: string;
  trailer_url?: string;
  genre_ids: number[];
}

export interface UserFormData {
  username: string;
  email: string;
  bio?: string;
}