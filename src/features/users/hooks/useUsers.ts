import { useQuery } from '@tanstack/react-query';
import { fetchUsers, ApiError } from '../api';
import type { User } from '../types';

/**
 * Hook to fetch users using TanStack Query.
 * @returns The query result containing the list of users or error.
 */
export function useUsers() {
  return useQuery<User[], ApiError>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
}
