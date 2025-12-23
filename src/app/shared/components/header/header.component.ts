/**
 * ============================================
 * HEADER COMPONENT
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * The header is the top navigation bar.
 * It contains:
 * - Logo/App name
 * - Menu toggle button
 * - Theme switcher
 * - Navigation links
 *
 * KEY CONCEPTS SHOWN:
 * - @Output() - Emitting events to parent
 * - Theme switching logic
 * - Using services (StorageService)
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StorageService } from '../../../core/services/storage.service';
import { DARK_THEME, LIGHT_THEME } from '../../../core/constants/app.constants';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /**
   * OUTPUT PROPERTY
   * ---------------
   * @Output() creates an event that parent can listen to.
   *
   * USAGE IN PARENT:
   * <app-header (toggleSidebar)="handleToggle()"></app-header>
   *
   * When we call toggleSidebar.emit(), parent's handleToggle() runs!
   */
  @Output() toggleSidebar = new EventEmitter<void>();

  // App name from environment
  appName = environment.appName;

  // Track current theme
  isDarkTheme = false;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    // Load saved theme preference
    this.isDarkTheme = this.storageService.isDarkTheme();
    this.applyTheme();
  }

  /**
   * EMIT TOGGLE EVENT
   * -----------------
   * Called when hamburger menu is clicked.
   * Notifies parent (MainLayout) to toggle sidebar.
   */
  onMenuClick(): void {
    this.toggleSidebar.emit();
  }

  /**
   * TOGGLE THEME
   * ------------
   * Switch between light and dark themes.
   *
   * HOW IT WORKS:
   * 1. Toggle the isDarkTheme boolean
   * 2. Apply the theme to <body>
   * 3. Save preference to localStorage
   */
  onThemeToggle(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
    // Save preference
    const theme = this.isDarkTheme ? DARK_THEME : LIGHT_THEME;
    this.storageService.saveTheme(theme);
  }

  /**
   * APPLY THEME TO BODY
   * -------------------
   * Adds/removes CSS classes on <body> element.
   * The theme.scss file defines these classes!
   */
  private applyTheme(): void {
    const body = document.body;
    if (this.isDarkTheme) {
      body.classList.remove(LIGHT_THEME);
      body.classList.add(DARK_THEME);
    } else {
      body.classList.remove(DARK_THEME);
      body.classList.add(LIGHT_THEME);
    }
  }
}
