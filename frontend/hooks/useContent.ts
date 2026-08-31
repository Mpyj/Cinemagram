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
        setError(null);

        const params =
          category && category !== 'all'
            ? { type: category }
            : {};

        const data = await getContent(params);

        console.log('CONTENT DATA:', data);

        if (data && Array.isArray(data.items)) {
          setContents(data.items);
        } else {
          console.error('Invalid content response format:', data);
          setContents([]);
          setError('فرمت اطلاعات دریافتی صحیح نیست');
        }
      } catch (err: any) {
        console.error('CONTENT ERROR:', err);
        console.error('ERROR RESPONSE:', err?.response);
        console.error('ERROR MESSAGE:', err?.message);

        setError('خطا در دریافت داده‌ها');
        setContents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [category]);

  return {
    contents,
    loading,
    error,
  };
}