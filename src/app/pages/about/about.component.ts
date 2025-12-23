/**
 * ============================================
 * ABOUT PAGE COMPONENT
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * The About page uses the EMPTY LAYOUT.
 * This means no header, sidebar, or footer!
 *
 * This is useful for:
 * - Landing pages
 * - Login/Register pages
 * - Full-screen content
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  appName = environment.appName;
  appVersion = environment.appVersion;

  // Features list for display
  features = [
    {
      icon: '📦',
      title: 'Services',
      description: 'Learn how to create and inject services for API calls'
    },
    {
      icon: '🛣️',
      title: 'Routing',
      description: 'Multiple layouts, route parameters, and guards'
    },
    {
      icon: '🎨',
      title: 'Theming',
      description: 'CSS variables and SCSS for light/dark themes'
    },
    {
      icon: '🔒',
      title: 'Guards',
      description: 'CanDeactivate guard with confirmation dialog'
    },
    {
      icon: '🔌',
      title: 'Interceptors',
      description: 'Global HTTP error handling'
    },
    {
      icon: '📋',
      title: 'Forms',
      description: 'Custom validators for form inputs'
    }
  ];

  constructor(private router: Router) { }

  /**
   * Navigate back to home
   */
  goHome(): void {
    this.router.navigate(['/']);
  }

  /**
   * Navigate to vehicles
   */
  goToVehicles(): void {
    this.router.navigate(['/vehicles']);
  }
}
