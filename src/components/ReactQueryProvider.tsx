'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useRef } from 'react';

export default function ReactQueryProvider({ children }: { children: ReactNode }) {
  // useRef ensures the QueryClient is only created once per app session
  const queryClientRef = useRef<QueryClient>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return <QueryClientProvider client={queryClientRef.current}>{children}</QueryClientProvider>;
} 