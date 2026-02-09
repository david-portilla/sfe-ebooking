import { useMemo } from 'react';
import { useUsers } from './useUsers';

/**
 * Hook to fetch and filter users based on a search query.
 * @param search - The search query to filter users by name or email.
 * @returns Query result with filtered users.
 */
export function useFilteredUsers(search: string) {
  const { data: users, isLoading, isError, error } = useUsers();

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    if (!search) return users;

    const lowerSearch = search.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerSearch) ||
        user.email.toLowerCase().includes(lowerSearch),
    );
  }, [users, search]);

  return {
    users: filteredUsers,
    isLoading,
    isError,
    error,
  };
}
