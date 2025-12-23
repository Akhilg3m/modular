/**
 * ============================================
 * FOOTER COMPONENT
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * The footer is at the bottom of the page.
 * It usually contains:
 * - Copyright information
 * - Quick links
 * - Contact information
 *
 * This is a simple component - sometimes called
 * a "dumb" or "presentational" component because
 * it just displays data without complex logic.
 */

import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  // Get current year dynamically
  currentYear = new Date().getFullYear();

  // App info from environment
  appName = environment.appName;
  appVersion = environment.appVersion;
}
