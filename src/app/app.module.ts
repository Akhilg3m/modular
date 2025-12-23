/**
 * ============================================
 * APP MODULE - THE ROOT MODULE
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * This is the MAIN MODULE of our Angular application.
 * Every Angular app needs at least one module.
 *
 * MODULAR ARCHITECTURE:
 * - CoreModule: Singleton services, interceptors, guards
 * - SharedModule: Reusable components, directives, pipes
 * - Feature Modules: Business features (lazy-loaded)
 *
 * MODULE LOADING:
 * - Eager: CoreModule, SharedModule (load at startup)
 * - Lazy: VehiclesModule, PaymentsModule (load on demand)
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Feature Modules (Eager Loaded)
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// Root Component
import { AppComponent } from './app.component';

// Layouts
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';

// Pages (Eager loaded)
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  /**
   * DECLARATIONS
   * ------------
   * Components that belong to AppModule only.
   * Feature components are declared in their own modules.
   */
  declarations: [
    // Root
    AppComponent,

    // Layouts
    MainLayoutComponent,
    EmptyLayoutComponent,

    // Pages (Eager loaded)
    HomeComponent,
    AboutComponent,
    NotFoundComponent
  ],

  /**
   * IMPORTS
   * -------
   * Modules that AppModule depends on.
   */
  imports: [
    // Angular Core
    BrowserModule,
    HttpClientModule,

    // Routing
    AppRoutingModule,

    // Feature Modules (Eager)
    CoreModule,    // Singleton services, interceptors
    SharedModule   // Reusable components, directives, pipes

    // Note: VehiclesModule and PaymentsModule are lazy-loaded
    // via app-routing.module.ts, not imported here
  ],

  /**
   * PROVIDERS
   * ---------
   * Services are now registered in CoreModule.
   * Services with providedIn: 'root' are auto-provided.
   */
  providers: [],

  /**
   * BOOTSTRAP
   * ---------
   * The component that Angular loads first.
   */
  bootstrap: [AppComponent]
})
export class AppModule { }

/**
 * ============================================
 * MODULAR ARCHITECTURE OVERVIEW
 * ============================================
 *
 * src/app/
 * ├── core/                    # Singleton services (Eager)
 * │   ├── services/
 * │   ├── guards/
 * │   ├── interceptors/
 * │   ├── constants/
 * │   ├── enums/
 * │   └── core.module.ts
 * │
 * ├── shared/                  # Reusable UI (Eager)
 * │   ├── components/
 * │   ├── directives/
 * │   ├── pipes/
 * │   ├── validators/
 * │   └── shared.module.ts
 * │
 * ├── features/                # Business features (Lazy)
 * │   ├── vehicles/
 * │   └── payments/
 * │
 * ├── layouts/                 # Page layouts
 * ├── pages/                   # App-level pages
 * │
 * ├── app-routing.module.ts
 * ├── app.component.ts
 * └── app.module.ts
 */
