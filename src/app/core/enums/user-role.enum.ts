/**
 * ============================================
 * USER ROLE ENUM
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * An ENUM is a way to define a set of named constants.
 * Think of it as a dropdown list of allowed values.
 *
 * WHY USE ENUMS?
 * - Prevents typos (can't type 'admn' instead of 'admin')
 * - Clear list of all possible values
 * - IDE autocomplete support
 * - Easy to refactor
 *
 * USAGE EXAMPLE:
 * --------------
 * const userRole = UserRole.ADMIN;
 * if (userRole === UserRole.ADMIN) {
 *   // Show admin features
 * }
 */

export enum UserRole {
  // Administrator - has all permissions
  ADMIN = 'ADMIN',

  // Regular user - limited permissions
  USER = 'USER'
}

/**
 * BONUS: Helper function to check if user is admin
 * Shows how enums are used in real code
 */
export function isAdmin(role: UserRole): boolean {
  return role === UserRole.ADMIN;
}
