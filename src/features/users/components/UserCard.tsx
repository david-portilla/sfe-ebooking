import type { User } from '../types';
import { Card } from '../../../components/ui/card';
import { Link } from 'react-router-dom';

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
    <Card className="flex flex-col p-6 h-full hover:shadow-md transition-shadow relative group">
      <Link to={`/users/${user.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View details for {user.name}</span>
      </Link>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
          {initial}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
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

      <div className="w-full mt-auto relative z-20 pointer-events-none">
        <div className="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-transparent px-4 py-2 text-base font-medium transition-colors group-hover:bg-blue-50 group-hover:border-blue-300 group-hover:text-blue-700">
          <span>View Details</span>
          <span aria-hidden="true">→</span>
        </div>
      </div>
    </Card>
  );
}
