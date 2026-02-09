import { useParams, Link } from 'react-router-dom';
import { useUser } from '../features/users/hooks/useUser';
import { Container } from '../components/ui/layout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

/**
 * Page component to display detailed information about a user.
 * Reads the userId from the URL parameters.
 */
export function UserDetailPage() {
  const { userId } = useParams<{ userId: string }>();
  const { data: user, isLoading, isError, error } = useUser(userId);

  if (isLoading) {
    return (
      <Container className="py-10">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Container>
    );
  }

  if (isError || !user) {
    return (
      <Container className="py-10">
        <div className="rounded-md bg-red-50 p-4 text-center">
          <h3 className="text-lg font-medium text-red-800">
            Error loading user
          </h3>
          <p className="mt-2 text-sm text-red-700">
            {error?.message || 'User not found'}
          </p>
          <div className="mt-4">
            <Link to="/">
              <Button variant="outline">Back to Users</Button>
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" className="pl-0 gap-2">
            ← Back to Users
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <p className="text-gray-500">@{user.username}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="text-gray-900">{user.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Website</h3>
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {user.website}
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Company
            </h2>
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900">
                {user.company.name}
              </p>
              <p className="text-gray-600 italic">
                "{user.company.catchPhrase}"
              </p>
              <p className="text-sm text-gray-500 bg-gray-50 p-2 rounded mt-2">
                {user.company.bs}
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 h-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Address
            </h2>
            <div className="space-y-1 text-gray-700">
              <p>
                {user.address.street}, {user.address.suite}
              </p>
              <p>
                {user.address.city}, {user.address.zipcode}
              </p>
            </div>

            <div className="mt-6 aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              {/* Placeholder for a map component */}
              <div className="text-center">
                <p className="font-medium">Map View</p>
                <p className="text-sm">
                  Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}
