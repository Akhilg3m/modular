/**
 * ============================================
 * ENVIRONMENT CONFIGURATION - PRODUCTION
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * This file is used when building for production.
 * It contains settings optimized for live/real users.
 *
 * DIFFERENCES FROM DEVELOPMENT:
 * - production: true (enables optimizations)
 * - debugMode: false (no console logs)
 * - Could have different API URL if needed
 */

export const environment = {
  // Set to true for production mode
  production: true,

  // Name of our application (shown in navbar)
  appName: 'AutoMart',

  // API URL - same API but could be different in real apps
  apiBaseUrl: 'https://6128991386a213001729f9df.mockapi.io/test/v1',

  // Version of the application
  appVersion: '1.0.0',

  // Disable debug mode in production
  debugMode: false
};
