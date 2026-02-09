import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserFilters } from './UserFilters';

describe('UserFilters', () => {
  it('renders search input with correct value', () => {
    const onSearchChange = vi.fn();
    render(<UserFilters search="test query" onSearchChange={onSearchChange} />);

    const input = screen.getByPlaceholderText('Search by name or email...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test query');
  });

  it('calls onSearchChange when input changes', () => {
    const onSearchChange = vi.fn();
    render(<UserFilters search="" onSearchChange={onSearchChange} />);

    const input = screen.getByPlaceholderText('Search by name or email...');
    fireEvent.change(input, { target: { value: 'new query' } });

    expect(onSearchChange).toHaveBeenCalledWith('new query');
  });
});
