import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchUsers, ApiError } from './api';

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
