import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { UserCard } from './UserCard';
import { MemoryRouter } from 'react-router-dom';
import type { User } from '../types';

const mockUser: User = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
};

describe('UserCard', () => {
  it('renders user information correctly', () => {
    render(
      <MemoryRouter>
        <UserCard user={mockUser} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('@Bret')).toBeInTheDocument();
    expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument();
  });

  it('renders initial avatar correctly', () => {
    // Should display 'L' for 'Leanne'
    render(
      <MemoryRouter>
        <UserCard user={mockUser} />
      </MemoryRouter>,
    );
    expect(screen.getByText('L')).toBeInTheDocument();
  });

  it('renders clickable link to user detail page', () => {
    render(
      <MemoryRouter>
        <UserCard user={mockUser} />
      </MemoryRouter>,
    );

    // Check that the link exists with the correct href
    const link = screen.getByRole('link', {
      name: /view details for leanne graham/i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/users/1');
  });

  it('renders View Details text', () => {
    render(
      <MemoryRouter>
        <UserCard user={mockUser} />
      </MemoryRouter>,
    );

    // View Details text should be present
    expect(screen.getByText('View Details')).toBeInTheDocument();
    // Arrow indicator should be present
    expect(screen.getByText('→')).toBeInTheDocument();
  });

  it('renders company information', () => {
    render(
      <MemoryRouter>
        <UserCard user={mockUser} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Romaguera-Crona')).toBeInTheDocument();
  });
});
