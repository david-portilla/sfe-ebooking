import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFilteredUsers } from '../features/users/hooks/useFilteredUsers';
import { UserGrid } from '../features/users/components/UserGrid';
import { UserFilters } from '../features/users/components/UserFilters';
import { Container } from '../components/ui/layout';
import { useDebounce } from '../hooks/useDebounce';

/**
 * The main page component for displaying the users list.
 * Handles loading, error, success states, and filtering.
 * @returns {JSX.Element} The rendered page.
 */
export function UsersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(initialSearch);
  const debouncedSearch = useDebounce(search, 300);

  const { users, isLoading, isError, error } =
    useFilteredUsers(debouncedSearch);

  // Sync search state with URL
  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    const newSearch = debouncedSearch.trim();

    // Only update URL if the value actually changed
    if (currentSearch !== newSearch) {
      if (newSearch) {
        setSearchParams({ search: newSearch }, { replace: true });
      } else {
        setSearchParams({}, { replace: true });
      }
    }
  }, [debouncedSearch, searchParams, setSearchParams]);

  if (isLoading) {
    return (
      <Container className="py-10">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="py-10">
        <div className="rounded-md bg-red-50 p-4 text-center">
          <h3 className="text-lg font-medium text-red-800">
            Error loading users
          </h3>
          <p className="mt-2 text-sm text-red-700">{error?.message}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="mt-2 text-gray-600">
          Manage your team members and their account permissions here.
        </p>
      </div>

      <UserFilters search={search} onSearchChange={setSearch} />

      <UserGrid users={users} />
    </Container>
  );
}
