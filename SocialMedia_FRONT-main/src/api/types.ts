export interface User {
  id: number;
  username: string;
  fullName: string;
  profilePicture: string | null;
  position: string;
  department: string;
  isFollowing?: boolean;
  mutualConnectionsCount?: number;
}

export interface ApiError {
  message: string;
  errorCode: string;
  timestamp: string;
}

export interface UserProfile {
  id: number;
  username: string;
  fullName: string;
  profilePicture: string | null;
  position: string;
  department: string;
  createdAt: string;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
}

export interface Post {
  id: number;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  author: User;
  likeCount: number;
  commentCount: number;
  isLikedByCurrentUser: boolean;
  comments: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: User;
  isCommentOwner: boolean;
}

export interface FollowerItem {
  user: User;
  followedAt: string;
  isFollowingBack: boolean;
}

export interface FollowingItem {
  user: User;
  followingSince: string;
  isFollower: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  userId: number;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  fullName: string;
  position: string;
  department: string;
  profilePicture?: File;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const POSITIONS = [
  'JUNIOR',
  'SENIOR',
  'MANAGER',
  'DIRECTOR',
  'VP',
  'CEO',
  'CTO',
  'CFO',
  'COO',
];

export const DEPARTMENTS = [
  'ENGINEERING',
  'MARKETING',
  'SALES',
  'HR',
  'FINANCE',
  'OPERATIONS',
  'LEGAL',
  'IT',
  'CUSTOMER_SUPPORT',
  'PRODUCT',
];

