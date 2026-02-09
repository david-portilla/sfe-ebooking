import { useQuery } from '@tanstack/react-query';
import { fetchUser, ApiError } from '../api';
import type { User } from '../types';

/**
 * Hook to fetch a single user by ID.
 * @param {string} id - The user ID.
 * @returns The query result containing the user or error.
 */
export function useUser(id: string | undefined) {
  return useQuery<User, ApiError>({
    queryKey: ['user', id],
    queryFn: () => {
      if (!id) throw new Error('User ID is required');
      return fetchUser(id);
    },
    enabled: !!id,
  });
}
