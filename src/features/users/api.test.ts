import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchUsers, fetchUser, ApiError } from './api';

const fetchMock = vi.fn();
// Stub global fetch to prevent network calls
vi.stubGlobal('fetch', fetchMock);

describe('fetchUsers', () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches users successfully', async () => {
    const mockUsers = [{ id: 1, name: 'Test User' }];

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    const users = await fetchUsers();
    expect(users).toEqual(mockUsers);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users',
    );
  });

  it('throws ApiError on HTTP error', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(fetchUsers()).rejects.toThrow(
      'Failed to fetch users: Not Found',
    );
  });

  it('handles network errors', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Network failed'));

    await expect(fetchUsers()).rejects.toThrow(ApiError);

    fetchMock.mockRejectedValueOnce(new Error('Network failed'));
    await expect(fetchUsers()).rejects.toThrow('Network error: Network failed');
  });

  it('handles invalid JSON response', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON');
      },
    });

    await expect(fetchUsers()).rejects.toThrow(ApiError);

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON');
      },
    });
    await expect(fetchUsers()).rejects.toThrow('Network error: Invalid JSON');
  });

  it('returns empty array when no users', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const users = await fetchUsers();
    expect(users).toEqual([]);
  });

  it('preserves ApiError properties', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    try {
      await fetchUsers();
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect((error as ApiError).status).toBe(500);
      expect((error as ApiError).name).toBe('ApiError');
    }
  });
});

describe('fetchUser', () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches a single user by ID successfully', async () => {
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

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const user = await fetchUser('1');
    expect(user).toEqual(mockUser);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users/1',
    );
  });

  it('throws ApiError for 404 Not Found', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(fetchUser('999')).rejects.toThrow(
      'Failed to fetch user: Not Found',
    );
  });

  it('throws ApiError for 500 Internal Server Error', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    try {
      await fetchUser('1');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect((error as ApiError).status).toBe(500);
      expect((error as ApiError).message).toBe(
        'Failed to fetch user: Internal Server Error',
      );
    }
  });

  it('handles network errors', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Network connection failed'));

    await expect(fetchUser('1')).rejects.toThrow(ApiError);

    fetchMock.mockRejectedValueOnce(new Error('Network connection failed'));
    await expect(fetchUser('1')).rejects.toThrow(
      'Network error: Network connection failed',
    );
  });

  it('handles invalid JSON response', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Unexpected token in JSON');
      },
    });

    await expect(fetchUser('1')).rejects.toThrow(ApiError);

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Unexpected token in JSON');
      },
    });
    await expect(fetchUser('1')).rejects.toThrow(
      'Network error: Unexpected token in JSON',
    );
  });

  it('works with different user IDs', async () => {
    const mockUser = { id: 5, name: 'Test User' };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    await fetchUser('5');
    expect(fetchMock).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users/5',
    );
  });
});
