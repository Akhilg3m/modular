/**
 * ============================================
 * APP COMPONENT - ROOT COMPONENT
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * This is the ROOT component of the entire application.
 * Every Angular app starts here!
 *
 * COMPONENT TREE:
 * AppComponent (this)
 *   └── MainLayout or EmptyLayout (based on route)
 *         └── Header, Sidebar, Footer, Page Components
 *
 * The app.component.html just has <router-outlet>
 * which displays the current route's layout.
 */

import { Component, OnInit } from '@angular/core';
import { StorageService } from './core/services/storage.service';
import { LIGHT_THEME } from './core/constants/app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // Application title (used in template if needed)
  title = 'Vehicle Learning App';

  constructor(private storageService: StorageService) { }

  /**
   * Initialize app-wide settings on startup
   */
  ngOnInit(): void {
    // Load and apply saved theme on app start
    this.initializeTheme();
  }

  /**
   * INITIALIZE THEME
   * ----------------
   * Load saved theme from localStorage and apply it.
   * If no theme saved, default to light theme.
   */
  private initializeTheme(): void {
    const savedTheme = this.storageService.getTheme();
    document.body.classList.add(savedTheme || LIGHT_THEME);
  }
}
