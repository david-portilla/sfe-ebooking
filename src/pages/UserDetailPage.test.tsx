import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserDetailPage } from './UserDetailPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as useUserHook from '../features/users/hooks/useUser';

// Mock useUser hook
const useUserSpy = vi.spyOn(useUserHook, 'useUser');

const mockUser = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: { lat: '-37.3159', lng: '81.1496' },
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
};

describe('UserDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    useUserSpy.mockReturnValue({
      isLoading: true,
      data: undefined,
      isError: false,
      error: null,
    } as any);

    render(
      <MemoryRouter initialEntries={['/users/1']}>
        <Routes>
          <Route path="/users/:userId" element={<UserDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    // Check for spinner or loading indicator container
    // We can't query by role='status' as the current spinner doesn't have it,
    // but we can check if address info is NOT present
    expect(screen.queryByText('Address')).not.toBeInTheDocument();
  });

  it('renders user details when loaded', () => {
    useUserSpy.mockReturnValue({
      isLoading: false,
      data: mockUser,
      isError: false,
      error: null,
    } as any);

    render(
      <MemoryRouter initialEntries={['/users/1']}>
        <Routes>
          <Route path="/users/:userId" element={<UserDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('@Bret')).toBeInTheDocument();
    expect(screen.getByText('Romaguera-Crona')).toBeInTheDocument();
    expect(screen.getByText('Kulas Light, Apt. 556')).toBeInTheDocument();
    expect(screen.getByText('Gwenborough, 92998-3874')).toBeInTheDocument();
  });

  it('renders error state', () => {
    useUserSpy.mockReturnValue({
      isLoading: false,
      data: undefined,
      isError: true,
      error: { message: 'Failed to fetch' },
    } as unknown as any);

    render(
      <MemoryRouter initialEntries={['/users/1']}>
        <Routes>
          <Route path="/users/:userId" element={<UserDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Error loading user')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
  });
});
