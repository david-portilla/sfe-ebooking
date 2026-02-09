import { Input } from '../../../components/ui/input';

interface UserFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

/**
 * Component for filtering users.
 * @param {UserFiltersProps} props - The component props.
 * @returns {JSX.Element} The rendered filters.
 */
export function UserFilters({ search, onSearchChange }: UserFiltersProps) {
  return (
    <div className="mb-6">
      <Input
        label="Search Users"
        placeholder="Search by name or email..."
        value={search}
        onChange={onSearchChange}
        className="max-w-md"
      />
    </div>
  );
}
