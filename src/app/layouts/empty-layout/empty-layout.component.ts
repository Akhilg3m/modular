/**
 * ============================================
 * EMPTY LAYOUT COMPONENT
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * This is a minimal layout with NO header, sidebar, or footer.
 *
 * WHY USE AN EMPTY LAYOUT?
 * - Login/Register pages (clean, focused experience)
 * - Error pages (404 Not Found)
 * - Landing pages
 * - Pages that need full screen space
 *
 * VISUAL:
 * ┌──────────────────────────────┐
 * │                              │
 * │     <router-outlet>          │
 * │     (Full page content)      │
 * │                              │
 * └──────────────────────────────┘
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-empty-layout',
  templateUrl: './empty-layout.component.html',
  styleUrls: ['./empty-layout.component.scss']
})
export class EmptyLayoutComponent {
  // This layout is simple - no logic needed!
}
