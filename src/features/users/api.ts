import type { User } from './types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Custom error class for API requests.
 */
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Fetches the list of users from the API.
 * @returns {Promise<User[]>} A promise that resolves to an array of users.
 * @throws {ApiError} If the response is not ok, network error, or JSON parsing fails.
 */
export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `Failed to fetch users: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Re-throw ApiError instances
    if (error instanceof ApiError) {
      throw error;
    }
    // Handle network errors or JSON parsing errors
    throw new ApiError(
      0,
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

/**
 * Fetches a single user by ID.
 * @param {string} id - The user ID.
 * @returns {Promise<User>} A promise that resolves to the user.
 * @throws {ApiError} If the response is not ok.
 */
export async function fetchUser(id: string): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `Failed to fetch user: ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      0,
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}
