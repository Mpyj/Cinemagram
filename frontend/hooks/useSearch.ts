'use client';

import { useState, useEffect } from 'react';
import { Content } from '@/lib/types';
import { getContent } from '@/lib/api';

export function useSearch(query: string) {
  const [results, setResults] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await getContent({ search: query });
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return { results, loading };
}