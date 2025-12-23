/**
 * ============================================
 * APP ROUTING MODULE
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * This file defines ALL the routes (URLs) in our app.
 * When user types a URL, Angular looks here to know
 * which component to display.
 *
 * MODULAR ROUTING:
 * - Eager loaded: Pages that load immediately
 * - Lazy loaded: Feature modules that load on demand
 *
 * LAYOUTS WITH CHILDREN:
 * We use layouts as parent routes with children.
 * All children share the same layout!
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Layouts
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';

// Pages (Eager loaded)
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

/**
 * ROUTES CONFIGURATION
 * --------------------
 * Order matters! Angular checks routes from top to bottom.
 * Put specific routes before wildcards.
 */
const routes: Routes = [
  // ============================================
  // ROUTES WITH MAIN LAYOUT
  // (Header + Sidebar + Footer)
  // ============================================
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // Home page (default route)
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
      // Vehicles feature - LAZY LOADED
      {
        path: 'vehicles',
        loadChildren: () => import('./features/vehicles/vehicles.module')
          .then(m => m.VehiclesModule)
      }
    ]
  },

  // ============================================
  // ROUTES WITH EMPTY LAYOUT
  // (No Header/Sidebar/Footer)
  // ============================================
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      // About page
      {
        path: 'about',
        component: AboutComponent
      },
      // Payment feature - LAZY LOADED
      {
        path: 'payment/:vehicleId',
        loadChildren: () => import('./features/payments/payments.module')
          .then(m => m.PaymentsModule)
      },
      // 404 Not Found page
      // ** is a WILDCARD - matches any path not matched above
      // IMPORTANT: This must be LAST!
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/**
 * ============================================
 * ROUTE SUMMARY
 * ============================================
 *
 * URL                       | Module/Component     | Layout | Loading
 * --------------------------|---------------------|--------|--------
 * /                         | HomeComponent        | Main   | Eager
 * /vehicles                 | VehiclesModule       | Main   | Lazy
 * /vehicles/:id             | VehicleDetail        | Main   | Lazy
 * /about                    | AboutComponent       | Empty  | Eager
 * /payment/:vehicleId       | PaymentsModule       | Empty  | Lazy
 * /payment/:vehicleId/upi   | PaymentSummary       | Empty  | Lazy
 * /payment/:vehicleId/card  | PaymentSummary       | Empty  | Lazy
 * /**                       | NotFoundComponent    | Empty  | Eager
 */
