// utils/helpers.js

/**
 * Get CSS class for adoption status styling
 * @param {string} status - The adoption status
 * @returns {string} CSS class name
 */
export const getStatusColor = (status) => {
  switch(status) {
    case 'Available':
    case 'Available for Adoption':
      return 'status-available';
    case 'Adopted':
      return 'status-adopted';
    case 'Not for Adoption':
      return 'status-not-available';
    default:
      return 'status-default';
  }
};

/**
 * Format timestamp for display
 * @param {string|Date} timestamp - The timestamp to format
 * @returns {string} Formatted timestamp
 */
export const formatTimestamp = (timestamp) => {
  if (typeof timestamp === 'string') {
    return timestamp;
  }
  
  const now = new Date();
  const time = new Date(timestamp);
  const diffInMinutes = Math.floor((now - time) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return time.toLocaleDateString();
};

/**
 * Validate post data before submission
 * @param {Object} postData - The post data to validate
 * @returns {Object} Validation result with isValid boolean and errors array
 */
export const validatePost = (postData) => {
  const errors = [];
  
  if (!postData.petName?.trim()) {
    errors.push('Pet name is required');
  }
  
  if (!postData.story?.trim()) {
    errors.push('Story is required');
  }
  
  if (postData.story?.length > 1000) {
    errors.push('Story must be less than 1000 characters');
  }
  
  if (postData.image && !isValidUrl(postData.image)) {
    errors.push('Invalid image URL');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Check if a string is a valid URL
 * @param {string} string - The string to check
 * @returns {boolean} True if valid URL
 */
const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Generate a unique ID for new posts
 * @returns {number} Unique ID
 */
export const generateId = () => {
  return Date.now() + Math.random();
};