/**
 * ============================================
 * NOTIFY GUARD (CanDeactivate)
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * GUARDS are like security checkpoints for routes.
 *
 * TYPES OF GUARDS:
 * 1. CanActivate - Can user ACCESS this route?
 * 2. CanDeactivate - Can user LEAVE this route?
 * 3. CanLoad - Can this module be loaded?
 * 4. Resolve - Fetch data BEFORE route loads
 *
 * THIS GUARD (CanDeactivate):
 * - Runs when user tries to LEAVE a page
 * - Shows confirmation dialog
 * - Prevents accidental navigation away
 *
 * USE CASES:
 * - Form has unsaved changes
 * - User is in middle of a process
 * - Prevent accidental back button clicks
 */

import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { MESSAGES } from '../constants/app.constants';

/**
 * INTERFACE: CanComponentDeactivate
 * ---------------------------------
 * Any component that uses this guard should implement this interface.
 * This allows the component to control when leaving is allowed.
 */
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean> | Promise<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class NotifyGuard implements CanDeactivate<CanComponentDeactivate> {

  /**
   * CAN DEACTIVATE METHOD
   * ---------------------
   * Called automatically when user tries to leave the route.
   *
   * @param component - The component being deactivated
   * @returns true = allow navigation, false = block navigation
   *
   * HOW IT WORKS:
   * 1. Check if component has canDeactivate method
   * 2. If yes, ask the component
   * 3. If no, show browser confirm dialog
   */
  canDeactivate(
    component: CanComponentDeactivate
  ): boolean | Observable<boolean> | Promise<boolean> {

    // If component has its own canDeactivate method, use it
    if (component && component.canDeactivate) {
      return component.canDeactivate();
    }

    // Default: Show browser confirmation dialog
    // window.confirm returns true if user clicks OK, false if Cancel
    return window.confirm(MESSAGES.LEAVE_PAGE);
  }
}

/**
 * ============================================
 * HOW TO USE THIS GUARD
 * ============================================
 *
 * STEP 1: In your routing module:
 * {
 *   path: 'vehicle/:id',
 *   component: VehicleDetailComponent,
 *   canDeactivate: [NotifyGuard]  // Add the guard here
 * }
 *
 * STEP 2 (Optional): Implement in component:
 * export class VehicleDetailComponent implements CanComponentDeactivate {
 *   hasUnsavedChanges = false;
 *
 *   canDeactivate(): boolean {
 *     if (this.hasUnsavedChanges) {
 *       return confirm('You have unsaved changes. Leave anyway?');
 *     }
 *     return true;
 *   }
 * }
 */
