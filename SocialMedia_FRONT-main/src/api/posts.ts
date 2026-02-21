import { apiRequest } from './config';
import type { Post } from './types';

export const getFeed = async (currentUserId: number): Promise<Post[]> => {
  return apiRequest<Post[]>(`/posts/feed?currentUserId=${currentUserId}`, {
    method: 'GET',
  });
};

export const getUserPosts = async (userId: number, currentUserId: number): Promise<Post[]> => {
  return apiRequest<Post[]>(`/posts/user/${userId}?currentUserId=${currentUserId}`, {
    method: 'GET',
  });
};

export const likePost = async (postId: number, currentUserId: number): Promise<void> => {
  return apiRequest<void>(`/posts/${postId}/like?currentUserId=${currentUserId}`, {
    method: 'POST',
  });
};

export const unlikePost = async (postId: number, currentUserId: number): Promise<void> => {
  return apiRequest<void>(`/posts/${postId}/like?currentUserId=${currentUserId}`, {
    method: 'DELETE',
  });
};

export const createPost = async (content: string, userId: number): Promise<Post> => {
  return apiRequest<Post>('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
      user_db_Id: userId,
      imageUrl: null,
    }),
  });
};

