import type { User } from '../types';
import { UserCard } from './UserCard';
import { Grid } from '../../../components/ui/layout';

interface UserGridProps {
  users: User[];
}

/**
 * Displays a responsive grid of user cards.
 * @param {UserGridProps} props - The component props.
 * @returns {JSX.Element} The rendered grid or empty state message.
 */
export function UserGrid({ users }: UserGridProps) {
  if (users.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">No users found.</div>
    );
  }

  return (
    <Grid>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </Grid>
  );
}
