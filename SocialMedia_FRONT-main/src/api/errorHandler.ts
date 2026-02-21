import type { ApiError } from './types';

export const getErrorMessage = (error: ApiError): string => {
  switch (error.errorCode) {
    // Authentication Errors
    case 'AUTH_UNAUTHORIZED':
      return 'You are not logged in. Please login to continue.';
    case 'AUTH_TOKEN_EXPIRED':
      return 'Your session has expired. Please login again.';
    case 'AUTH_TOKEN_INVALID':
      return 'Invalid session. Please login again.';
    case 'AUTH_INVALID_CREDENTIALS':
      return 'Invalid username or password.';
    case 'AUTH_FORBIDDEN':
      return 'You do not have permission to perform this action.';

    // User Errors
    case 'USER_NOT_FOUND':
      return 'User not found.';
    case 'USER_ALREADY_EXISTS':
      return 'User already exists.';
    case 'USER_EMAIL_ALREADY_EXISTS':
      return 'This email is already registered.';
    case 'USER_USERNAME_ALREADY_EXISTS':
      return 'This username is already taken.';

    // Post Errors
    case 'POST_NOT_FOUND':
      return 'Post not found.';
    case 'POST_CONTENT_EMPTY':
      return 'Post content cannot be empty.';
    case 'POST_UPDATE_NOT_ALLOWED':
      return 'You are not authorized to update this post.';
    case 'POST_DELETE_NOT_ALLOWED':
      return 'You are not authorized to delete this post.';

    // Comment Errors
    case 'COMMENT_NOT_FOUND':
      return 'Comment not found.';
    case 'COMMENT_CONTENT_EMPTY':
      return 'Comment content cannot be empty.';
    case 'COMMENT_DELETE_NOT_ALLOWED':
      return 'You are not authorized to delete this comment.';

    // Like Errors
    case 'LIKE_ALREADY_EXISTS':
      return 'You have already liked this post.';
    case 'LIKE_NOT_FOUND':
      return 'Like not found.';

    // Follow Errors
    case 'FOLLOW_ALREADY_EXISTS':
      return 'You are already following this user.';
    case 'FOLLOW_SELF_NOT_ALLOWED':
      return 'You cannot follow yourself.';

    // General Errors
    case 'VALIDATION_ERROR':
      return error.message || 'Validation failed. Please check your input.';
    case 'INVALID_REQUEST':
      return 'Invalid request. Please try again.';
    case 'RESOURCE_NOT_FOUND':
      return 'The requested resource was not found.';
    case 'OPERATION_NOT_ALLOWED':
      return 'This operation is not allowed.';
    case 'INVALID_IMAGE':
      return 'Invalid image file. Please upload a valid image.';
    case 'IMAGE_UPLOAD_ERROR':
      return 'Failed to upload image. Please try again.';
    case 'INTERNAL_SERVER_ERROR':
      return 'An unexpected error occurred. Please try again later.';

    default:
      return error.message || 'An unexpected error occurred.';
  }
};

export const isAuthError = (error: ApiError): boolean => {
  return ['AUTH_UNAUTHORIZED', 'AUTH_TOKEN_EXPIRED', 'AUTH_TOKEN_INVALID'].includes(error.errorCode);
};

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'errorCode' in error &&
    'message' in error
  );
};

