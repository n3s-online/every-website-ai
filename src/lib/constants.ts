// Rate limiting constants - single source of truth

// User rate limiting
export const USER_RATE_LIMIT = 3; // 3 pages per hour per user
export const USER_WINDOW = 60 * 60; // 1 hour in seconds

// Global rate limiting
export const GLOBAL_RATE_LIMIT = 100; // 100 pages per day globally
export const GLOBAL_WINDOW = 24 * 60 * 60; // 24 hours in seconds

// Stats API rate limiting
export const STATS_API_RATE_LIMIT = 10; // 10 requests per minute per IP
export const STATS_API_WINDOW = 60; // 1 minute in seconds
