import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { UsersPage } from './UsersPage';

// Mock the API
const fetchMock = vi.fn();
vi.stubGlobal('fetch', fetchMock);

const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    address: {
      street: 'Main St',
      suite: 'Apt 1',
      city: 'New York',
      zipcode: '10001',
      geo: { lat: '0', lng: '0' },
    },
    phone: '123-456-7890',
    website: 'john.com',
    company: {
      name: 'Acme Corp',
      catchPhrase: 'Innovation',
      bs: 'business',
    },
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    address: {
      street: 'Oak St',
      suite: 'Suite 2',
      city: 'Boston',
      zipcode: '02101',
      geo: { lat: '0', lng: '0' },
    },
    phone: '098-765-4321',
    website: 'jane.com',
    company: {
      name: 'Tech Inc',
      catchPhrase: 'Technology',
      bs: 'tech',
    },
  },
  {
    id: 3,
    name: 'Bob Johnson',
    username: 'bobjohnson',
    email: 'bob@example.com',
    address: {
      street: 'Elm St',
      suite: 'Unit 3',
      city: 'Chicago',
      zipcode: '60601',
      geo: { lat: '0', lng: '0' },
    },
    phone: '555-123-4567',
    website: 'bob.com',
    company: {
      name: 'Dev Co',
      catchPhrase: 'Development',
      bs: 'dev',
    },
  },
];

describe('UsersPage Integration', () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  const renderPage = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UsersPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  };

  it('displays loading state initially', () => {
    fetchMock.mockImplementation(
      () =>
        new Promise(() => {
          /* never resolves */
        }),
    );

    renderPage();

    // Check for loading spinner by class
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('displays users after loading', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    renderPage();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('displays error message when API fails', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Error loading users')).toBeInTheDocument();
    });

    expect(
      screen.getByText(/Failed to fetch users: Internal Server Error/i),
    ).toBeInTheDocument();
  });

  it('filters users when searching by name', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    const user = userEvent.setup();
    renderPage();

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // All users should be visible initially
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();

    // Type in search
    const input = screen.getByPlaceholderText('Search by name or email...');
    await user.type(input, 'john');

    // Wait for debounce (300ms) + filter
    await waitFor(
      () => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
      },
      { timeout: 500 },
    );

    expect(screen.getByText('Bob Johnson')).toBeInTheDocument(); // Bob Johnson also matches
  });

  it('filters users when searching by email', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    const user = userEvent.setup();
    renderPage();

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Clear and type in search
    const input = screen.getByPlaceholderText('Search by name or email...');
    await user.clear(input);
    await user.type(input, 'jane@example');

    // Wait for debounce + filter (increased timeout for debounce delay)
    await waitFor(
      () => {
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it('shows all users when search is cleared', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    });

    const user = userEvent.setup();
    renderPage();

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Type in search to filter
    const input = screen.getByPlaceholderText('Search by name or email...');
    await user.type(input, 'jane');

    // Wait for filter to apply
    await waitFor(
      () => {
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      },
      { timeout: 500 },
    );

    // Clear the search
    await user.clear(input);

    // Wait for all users to show again
    await waitFor(
      () => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
      },
      { timeout: 500 },
    );
  });

  it('shows no results message when search has no matches', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    });

    const user = userEvent.setup();
    renderPage();

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Clear and type search with no matches
    const input = screen.getByPlaceholderText('Search by name or email...');
    await user.clear(input);
    await user.type(input, 'nonexistent');

    // Wait for filter to apply (increased timeout)
    await waitFor(
      () => {
        expect(screen.getByText('No users found.')).toBeInTheDocument();
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });
});
