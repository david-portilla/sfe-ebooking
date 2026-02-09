import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { UsersPage } from '../../pages/UsersPage';
import { UserDetailPage } from '../../pages/UserDetailPage';
import * as useUserHook from '../../features/users/hooks/useUser';
import * as useUsersHook from '../../features/users/hooks/useUsers';

// Mock the hooks
const useUsersSpy = vi.spyOn(useUsersHook, 'useUsers');
const useUserSpy = vi.spyOn(useUserHook, 'useUser');

const mockUsers = [
  {
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
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server',
      bs: 'harness real-time e-markets',
    },
  },
];

describe('User Flow Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('navigates from list to detail view', async () => {
    // 1. Mock List Data
    useUsersSpy.mockReturnValue({
      isLoading: false,
      data: mockUsers,
      isError: false,
      error: null,
    } as unknown as any);

    // 2. Mock Detail Data
    useUserSpy.mockReturnValue({
      isLoading: false,
      data: mockUsers[0],
      isError: false,
      error: null,
    } as unknown as any);

    // 3. Setup Router with actual routes
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <UsersPage />,
        },
        {
          path: '/users/:userId',
          element: <UserDetailPage />,
        },
      ],
      {
        initialEntries: ['/'],
      },
    );

    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    // 4. Verify List View
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();

    // 5. Navigate to Detail
    // Find the link by its accessible role/name
    const link = screen.getByRole('link', {
      name: /View details for Leanne Graham/i,
    });
    await user.click(link);

    // 6. Verify Detail View
    await waitFor(() => {
      expect(screen.getByText('Romaguera-Crona')).toBeInTheDocument();
      expect(screen.getByText('Address')).toBeInTheDocument();
    });

    // 7. Navigate Back
    const backButton = screen.getByText('← Back to Users');
    await user.click(backButton);

    // 8. Verify List View again
    await waitFor(() => {
      expect(screen.getByText('Users')).toBeInTheDocument();
    });
  });
});
