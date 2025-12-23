/**
 * ============================================
 * CORE MODULE (EAGER LOADED)
 * ============================================
 *
 * Contains app-wide singleton logic:
 * - Services (providedIn: 'root', so auto-singleton)
 * - Guards
 * - Interceptors
 * - Constants
 * - Enums
 *
 * This module should only be imported ONCE in AppModule.
 */

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Interceptors
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  providers: [
    // Register HTTP Error Interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
    // Services use providedIn: 'root' so they're auto-provided:
    // - VehicleService
    // - StorageService
    // - PaymentService
    // Guards also use providedIn: 'root':
    // - NotifyGuard
  ]
})
export class CoreModule {
  /**
   * SINGLETON GUARD
   * ----------------
   * Prevents CoreModule from being imported multiple times.
   * It should only be imported in AppModule.
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it only in AppModule.'
      );
    }
  }
}

/**
 * ============================================
 * CORE MODULE STRUCTURE
 * ============================================
 *
 * core/
 * ├── services/
 * │   ├── vehicle.service.ts
 * │   ├── storage.service.ts
 * │   └── payment.service.ts
 * │
 * ├── guards/
 * │   └── notify.guard.ts
 * │
 * ├── interceptors/
 * │   └── error.interceptor.ts
 * │
 * ├── constants/
 * │   ├── app.constants.ts
 * │   └── route.constants.ts
 * │
 * ├── enums/
 * │   └── user-role.enum.ts
 * │
 * └── core.module.ts
 */
