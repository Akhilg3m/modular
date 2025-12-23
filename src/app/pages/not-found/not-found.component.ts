/**
 * ============================================
 * NOT FOUND PAGE (404)
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * This page shows when a user navigates to a
 * URL that doesn't exist in our app.
 *
 * WILDCARD ROUTE:
 * In routing, we use '**' to match "any path"
 * that hasn't been matched by other routes.
 *
 * { path: '**', component: NotFoundComponent }
 *
 * This page also uses the EMPTY LAYOUT.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  // Get the attempted URL for display
  attemptedUrl: string;

  constructor(private router: Router) {
    // Store the URL user tried to access
    this.attemptedUrl = this.router.url;
  }

  /**
   * Navigate to home page
   */
  goHome(): void {
    this.router.navigate(['/']);
  }

  /**
   * Navigate to vehicles page
   */
  goToVehicles(): void {
    this.router.navigate(['/vehicles']);
  }
}
