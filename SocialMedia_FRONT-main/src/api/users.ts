import { apiRequest } from './config';
import type { User, UserProfile, FollowerItem, FollowingItem } from './types';

export const getUserProfile = async (userId: number, currentUserId: number): Promise<UserProfile> => {
  return apiRequest<UserProfile>(`/users/${userId}/profile?currentUserId=${currentUserId}`, {
    method: 'GET',
  });
};

export const getUser = async (userId: number): Promise<User> => {
  return apiRequest<User>(`/users/${userId}`, {
    method: 'GET',
  });
};

export const getUserFollowers = async (userId: number): Promise<FollowerItem[]> => {
  return apiRequest<FollowerItem[]>(`/connections/${userId}/followers`, {
    method: 'GET',
  });
};

export const getUserFollowing = async (userId: number): Promise<FollowingItem[]> => {
  return apiRequest<FollowingItem[]>(`/connections/${userId}/following`, {
    method: 'GET',
  });
};

export const followUser = async (followerId: number, followingId: number): Promise<void> => {
  return apiRequest<void>(`/connections/follow?followerId=${followerId}&followingId=${followingId}`, {
    method: 'POST',
  });
};

export const unfollowUser = async (followerId: number, followingId: number): Promise<void> => {
  return apiRequest<void>(`/connections/unfollow?followerId=${followerId}&followingId=${followingId}`, {
    method: 'DELETE',
  });
};

