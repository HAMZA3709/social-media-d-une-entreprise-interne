export const API_BASE_URL = 'http://localhost:8080/api';

export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  if (response.status === 204) {
    return null as T;
  }

  return await response.json();
};

