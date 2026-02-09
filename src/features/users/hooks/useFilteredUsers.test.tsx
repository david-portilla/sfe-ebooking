import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFilteredUsers } from './useFilteredUsers';
import type { ReactNode, ReactElement } from 'react';

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
];

describe('useFilteredUsers', () => {
  let queryClient: QueryClient;
  let wrapper: ({ children }: { children: ReactNode }) => ReactElement;

  beforeEach(() => {
    fetchMock.mockReset();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  });

  it('returns all users when search is empty', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    const { result } = renderHook(() => useFilteredUsers(''), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.users).toHaveLength(2);
  });

  it('filters users by name (case-insensitive)', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    const { result } = renderHook(() => useFilteredUsers('john'), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.users).toHaveLength(1);
    expect(result.current.users[0].name).toBe('John Doe');
  });

  it('filters users by email', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    const { result } = renderHook(() => useFilteredUsers('jane@example.com'), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.users).toHaveLength(1);
    expect(result.current.users[0].email).toBe('jane@example.com');
  });

  it('returns empty array when no users match search', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    const { result } = renderHook(() => useFilteredUsers('nonexistent'), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.users).toEqual([]);
  });

  it('handles loading state', () => {
    fetchMock.mockImplementation(
      () =>
        new Promise(() => {
          /* never resolves */
        }),
    );

    const { result } = renderHook(() => useFilteredUsers(''), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.users).toEqual([]);
  });

  it('handles error state', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    const { result } = renderHook(() => useFilteredUsers(''), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
});
