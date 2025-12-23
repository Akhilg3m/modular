/**
 * ============================================
 * ENVIRONMENT CONFIGURATION - DEVELOPMENT
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * Environment files store configuration values that change
 * between development and production.
 *
 * WHY USE ENVIRONMENTS?
 * - Development: Use local or test APIs
 * - Production: Use real APIs
 *
 * HOW IT WORKS:
 * - When you run "ng serve" → uses environment.ts (this file)
 * - When you run "ng build --prod" → uses environment.prod.ts
 *
 * Angular automatically swaps the file during build!
 */

export const environment = {
  // Set to false for development mode
  production: false,

  // Name of our application (shown in navbar)
  appName: 'AutoMart Dev',

  // API URL for fetching vehicle data
  // This is our mock API for learning purposes
  apiBaseUrl: 'https://6128991386a213001729f9df.mockapi.io/test/v1',

  // Version of the application
  appVersion: '1.0.0-dev',

  // Enable debug mode in development
  debugMode: true
};
