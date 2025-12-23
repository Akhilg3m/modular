/**
 * ============================================
 * APPLICATION CONSTANTS
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * Constants are values that NEVER change during app runtime.
 * We keep them in one file so they're easy to find and update.
 *
 * WHY USE CONSTANTS?
 * - Single source of truth (change once, updates everywhere)
 * - Prevents "magic strings/numbers" in code
 * - Easy to find all configuration values
 *
 * NAMING CONVENTION:
 * - Use UPPER_SNAKE_CASE for constants
 * - Be descriptive with names
 */

// ============================================
// APPLICATION INFORMATION
// ============================================
export const APP_NAME = 'Vehicle Learning App';
export const APP_DESCRIPTION = 'Learn Angular with Vehicles!';

// ============================================
// PAGINATION SETTINGS
// ============================================
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

// ============================================
// THEME CONSTANTS
// ============================================
export const THEME_KEY = 'app-theme';          // Key for localStorage
export const LIGHT_THEME = 'light-theme';      // CSS class name
export const DARK_THEME = 'dark-theme';        // CSS class name

// ============================================
// API ENDPOINTS (relative paths)
// ============================================
export const API_ENDPOINTS = {
  VEHICLES: '/jurisdiction'  // Our vehicle API endpoint
};

// ============================================
// MESSAGE CONSTANTS
// ============================================
export const MESSAGES = {
  LOADING: 'Loading...',
  ERROR: 'Something went wrong. Please try again.',
  NO_DATA: 'No vehicles found.',
  LEAVE_PAGE: 'Are you sure you want to leave this page?'
};
