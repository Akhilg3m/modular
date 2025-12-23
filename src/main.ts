/**
 * ============================================
 * MAIN.TS - APPLICATION ENTRY POINT
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * This is where the Angular application STARTS!
 * It's the first TypeScript file that runs.
 *
 * WHAT HAPPENS HERE:
 * 1. Import the bootstrap function
 * 2. Import our root AppModule
 * 3. Bootstrap (start) the application
 *
 * BOOTSTRAP PROCESS:
 * 1. main.ts runs
 * 2. AppModule is loaded
 * 3. AppComponent is created
 * 4. <app-root> in index.html is replaced
 * 5. Application is running!
 */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

/**
 * BOOTSTRAP THE APPLICATION
 * -------------------------
 * platformBrowserDynamic() creates a platform for running
 * Angular in a web browser.
 *
 * bootstrapModule(AppModule) tells Angular to start
 * with our AppModule as the root module.
 *
 * .catch() handles any errors during startup.
 */
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error('Application failed to start:', err));

/**
 * ============================================
 * ADVANCED: ENABLE PRODUCTION MODE
 * ============================================
 *
 * In production builds, Angular CLI automatically
 * adds enableProdMode() before bootstrapping.
 *
 * Production mode disables:
 * - Development-only checks
 * - Extra logging
 * - Debug information
 *
 * This happens automatically with:
 * ng build --configuration production
 */
