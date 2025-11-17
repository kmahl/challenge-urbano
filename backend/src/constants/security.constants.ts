/**
 * Security-related constants used across the application
 */

/**
 * Number of rounds for bcrypt password hashing
 * Higher = more secure but slower
 * 10 is a good balance for production
 */
export const BCRYPT_ROUNDS = 10;

/**
 * JWT token expiration times
 */
export const JWT_ACCESS_TOKEN_EXPIRATION = '15m';
export const JWT_REFRESH_TOKEN_EXPIRATION = '7d';
