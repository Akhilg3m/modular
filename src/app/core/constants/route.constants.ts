/**
 * ============================================
 * ROUTE CONSTANTS
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * We store route paths as constants to avoid typos.
 * If a route changes, we update it in ONE place.
 *
 * EXAMPLE:
 * --------
 * Instead of: this.router.navigate(['/vehicles'])
 * We write:   this.router.navigate([ROUTES.VEHICLES])
 *
 * This prevents errors like '/vehicls' (typo!)
 */

export const ROUTES = {
  // Home page route
  HOME: '',

  // Vehicle routes
  VEHICLES: 'vehicles',
  VEHICLE_DETAIL: 'vehicles',  // Used as: /vehicles/:id

  // Payment routes
  PAYMENT: 'payment',

  // Other pages
  ABOUT: 'about',

  // Wildcard for 404
  NOT_FOUND: '**'
};

/**
 * HELPER: Build full route paths
 * Usage: getVehicleDetailRoute('123') → '/vehicles/123'
 */
export function getVehicleDetailRoute(id: string): string {
  return `/${ROUTES.VEHICLE_DETAIL}/${id}`;
}

/**
 * HELPER: Build payment route
 * Usage: getPaymentRoute('123') → '/payment/123'
 */
export function getPaymentRoute(vehicleId: string): string {
  return `/${ROUTES.PAYMENT}/${vehicleId}`;
}
