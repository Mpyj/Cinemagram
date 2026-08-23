'use client';

import { AuthProvider as AuthProviderWrapper } from './AuthContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthProviderWrapper>{children}</AuthProviderWrapper>;
}