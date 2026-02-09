import type { User } from '../types';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

interface UserCardProps {
  user: User;
}

/**
 * Displays user information in a card layout.
 * @param {UserCardProps} props - The component props.
 * @returns {JSX.Element} The rendered user card.
 */
export function UserCard({ user }: UserCardProps) {
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <Card className="flex flex-col p-6 h-full hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
          {initial}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {user.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-1">@{user.username}</p>
        </div>
      </div>

      <div className="flex-1 space-y-2 text-sm text-gray-600 mb-6">
        <div className="flex items-center gap-2">
          <span role="img" aria-label="Email">
            📧
          </span>
          <span className="truncate" title={user.email}>
            {user.email}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span role="img" aria-label="Company">
            🏢
          </span>
          <span className="truncate" title={user.company.name}>
            {user.company.name}
          </span>
        </div>
      </div>

      <Button variant="outline" className="w-full mt-auto">
        View Details
      </Button>
    </Card>
  );
}
