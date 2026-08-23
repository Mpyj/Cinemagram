'use client';

import { useState, useEffect } from 'react';
import { Content } from '@/lib/types';
import { getContent } from '@/lib/api';

export function useContent(category?: string) {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const params = category && category !== 'all' ? { type: category } : {};
        const data = await getContent(params);
        setContents(data);
        setError(null);
      } catch (err) {
        setError('خطا در دریافت داده‌ها');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [category]);

  return { contents, loading, error };
}