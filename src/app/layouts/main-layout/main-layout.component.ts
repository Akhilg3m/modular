/**
 * ============================================
 * MAIN LAYOUT COMPONENT
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * A LAYOUT is a wrapper component that defines the structure
 * of a page. It contains common elements like:
 * - Header (top navigation)
 * - Sidebar (side navigation)
 * - Footer (bottom section)
 * - Content area (where pages are displayed)
 *
 * HOW IT WORKS:
 * 1. Layout has <router-outlet> for content
 * 2. Different pages are loaded INTO the layout
 * 3. Header/Sidebar/Footer stay the same
 *
 * VISUAL:
 * ┌──────────────────────────────┐
 * │         HEADER               │
 * ├─────────┬────────────────────┤
 * │         │                    │
 * │ SIDEBAR │   <router-outlet>  │
 * │         │   (Page content)   │
 * │         │                    │
 * ├─────────┴────────────────────┤
 * │         FOOTER               │
 * └──────────────────────────────┘
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  // Track sidebar state (open/closed)
  isSidebarOpen = true;

  /**
   * Toggle sidebar visibility
   * Called when hamburger menu is clicked
   */
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
