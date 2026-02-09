import { useUsers } from '../features/users/hooks/useUsers';
import { UserGrid } from '../features/users/components/UserGrid';
import { Container } from '../components/ui/layout';

/**
 * The main page component for displaying the users list.
 * Handles loading, error, and success states.
 * @returns {JSX.Element} The rendered page.
 */
export function UsersPage() {
  const { data: users, isLoading, isError, error } = useUsers();

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

      {users && <UserGrid users={users} />}
    </Container>
  );
}
