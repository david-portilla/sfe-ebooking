import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/query-client';
import '../lib/i18n'; // Initialize i18n

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
