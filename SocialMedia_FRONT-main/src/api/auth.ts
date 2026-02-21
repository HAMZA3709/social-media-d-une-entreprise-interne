import { API_BASE_URL, apiRequest } from './config';
import type { LoginResponse, RegisterFormData, User } from './types';

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
};

export const register = async (formData: RegisterFormData): Promise<User> => {
  const data = new FormData();
  data.append('username', formData.username);
  data.append('email', formData.email);
  data.append('password', formData.password);
  data.append('fullName', formData.fullName);
  data.append('position', formData.position);
  data.append('department', formData.department);

  if (formData.profilePicture) {
    data.append('profilePicture', formData.profilePicture);
  }

  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: 'POST',
    body: data,
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return await response.json();
};

