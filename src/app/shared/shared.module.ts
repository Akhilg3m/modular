/**
 * ============================================
 * SHARED MODULE (EAGER LOADED)
 * ============================================
 *
 * Contains reusable UI components, directives, pipes,
 * and common imports that are used across multiple modules.
 *
 * This module is imported by AppModule and feature modules
 * that need these shared utilities.
 *
 * STRUCTURE:
 * shared/
 * ├── components/
 * │   ├── header/
 * │   ├── footer/
 * │   └── sidebar/
 * │
 * ├── directives/
 * │   └── highlight.directive.ts
 * │
 * ├── pipes/
 * │   └── capitalize.pipe.ts
 * │
 * ├── validators/
 * │   └── email.validator.ts
 * │
 * └── shared.module.ts
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

// Pipes
import { CapitalizePipe } from './pipes/capitalize.pipe';

// Directives
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    // Components
    HeaderComponent,
    FooterComponent,
    SidebarComponent,

    // Pipes
    CapitalizePipe,

    // Directives
    HighlightDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    // Re-export common modules for convenience
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    // Export components
    HeaderComponent,
    FooterComponent,
    SidebarComponent,

    // Export pipes and directives
    CapitalizePipe,
    HighlightDirective
  ]
})
export class SharedModule { }
