# AutoMart - Angular Modular Application

Angular application demonstrating modular architecture with eager and lazy loading using a vehicle marketplace example.

## Quick Start

```bash
# Install dependencies
npm install

# Development server
ng serve

# Production build
ng build
```

Navigate to `http://localhost:4200/`

---

## Modular Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        AppModule                            │
│                     (Root Module)                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐                          │
│  │ CoreModule  │  │SharedModule │  ← Eager Loaded          │
│  │ (Singleton) │  │ (Reusable)  │                          │
│  └─────────────┘  └─────────────┘                          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ VehiclesModule  │  │ PaymentsModule  │  ← Lazy Loaded   │
│  │   (97.63 kB)    │  │   (89.03 kB)    │                  │
│  └─────────────────┘  └─────────────────┘                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Folder Structure

```
src/app/
├── core/                          # Singleton services (EAGER)
│   ├── services/
│   │   ├── vehicle.service.ts     # API calls for vehicles
│   │   ├── storage.service.ts     # LocalStorage wrapper
│   │   └── payment.service.ts     # Payment processing
│   │
│   ├── guards/
│   │   └── notify.guard.ts        # CanDeactivate guard
│   │
│   ├── interceptors/
│   │   └── error.interceptor.ts   # Global HTTP error handler
│   │
│   ├── constants/
│   │   ├── app.constants.ts       # App-wide constants
│   │   └── route.constants.ts     # Route path constants
│   │
│   ├── enums/
│   │   └── user-role.enum.ts      # User role enum
│   │
│   └── core.module.ts             # CoreModule definition
│
├── shared/                        # Reusable UI (EAGER)
│   ├── components/
│   │   ├── header/                # Top navigation bar
│   │   ├── footer/                # Bottom footer
│   │   └── sidebar/               # Side navigation
│   │
│   ├── directives/
│   │   └── highlight.directive.ts # Hover highlight
│   │
│   ├── pipes/
│   │   └── capitalize.pipe.ts     # Text capitalization
│   │
│   ├── validators/
│   │   └── email.validator.ts     # Email validation
│   │
│   └── shared.module.ts           # SharedModule definition
│
├── features/                      # Business features (LAZY)
│   ├── vehicles/
│   │   ├── components/
│   │   │   ├── vehicle-list/      # Vehicle cards grid
│   │   │   └── vehicle-detail/    # Single vehicle view
│   │   ├── pages/
│   │   │   └── vehicles-page/     # Container page
│   │   ├── models/
│   │   │   └── vehicle.model.ts   # Vehicle interface
│   │   ├── vehicles-routing.module.ts
│   │   └── vehicles.module.ts
│   │
│   └── payments/
│       ├── components/
│       │   ├── payment-list/      # Payment method selection
│       │   └── payment-summary/   # UPI/Card payment forms
│       ├── pages/
│       │   └── payments-page/     # Container page
│       ├── models/
│       │   └── payment.model.ts   # Payment interfaces
│       ├── payments-routing.module.ts
│       └── payments.module.ts
│
├── layouts/                       # Page layout wrappers
│   ├── main-layout/               # Header + Sidebar + Footer
│   └── empty-layout/              # Clean, no chrome
│
├── pages/                         # App-level pages (EAGER)
│   ├── home/                      # Landing page
│   ├── about/                     # About page
│   └── not-found/                 # 404 error page
│
├── app-routing.module.ts          # Root routing with lazy loading
├── app.module.ts                  # Root module
└── app.component.ts               # Root component
```

---

## Module Types

### 1. CoreModule (Eager Loaded)

Contains singleton services used throughout the app. Imported **once** in AppModule.

```typescript
@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class CoreModule {
  // Prevents multiple imports
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule already loaded!');
    }
  }
}
```

### 2. SharedModule (Eager Loaded)

Contains reusable components, directives, and pipes. Can be imported by any module.

```typescript
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CapitalizePipe,
    HighlightDirective
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    // Re-export for convenience
    CommonModule, RouterModule, ReactiveFormsModule,
    // Export shared components
    HeaderComponent, FooterComponent, SidebarComponent,
    CapitalizePipe, HighlightDirective
  ]
})
export class SharedModule { }
```

### 3. Feature Modules (Lazy Loaded)

Load on-demand when the route is accessed.

```typescript
// app-routing.module.ts
{
  path: 'vehicles',
  loadChildren: () => import('./features/vehicles/vehicles.module')
    .then(m => m.VehiclesModule)
}

{
  path: 'payment/:vehicleId',
  loadChildren: () => import('./features/payments/payments.module')
    .then(m => m.PaymentsModule)
}
```

---

## Route Summary

| URL | Module/Component | Layout | Loading |
|-----|------------------|--------|---------|
| `/` | HomeComponent | Main | Eager |
| `/vehicles` | VehiclesModule | Main | **Lazy** |
| `/vehicles/:id` | VehicleDetailComponent | Main | **Lazy** |
| `/about` | AboutComponent | Empty | Eager |
| `/payment/:vehicleId` | PaymentsModule | Empty | **Lazy** |
| `/payment/:vehicleId/upi` | PaymentSummaryComponent | Empty | **Lazy** |
| `/payment/:vehicleId/card` | PaymentSummaryComponent | Empty | **Lazy** |
| `/**` | NotFoundComponent | Empty | Eager |

---

## Layouts

```
Main Layout:                    Empty Layout:
┌─────────────────────┐         ┌─────────────────────┐
│      HEADER         │         │                     │
├───────┬─────────────┤         │                     │
│       │             │         │   FULL PAGE         │
│SIDEBAR│   CONTENT   │         │   CONTENT           │
│       │             │         │                     │
├───────┴─────────────┤         │                     │
│      FOOTER         │         │                     │
└─────────────────────┘         └─────────────────────┘
```

---

## Payment Flow

1. User views vehicle detail at `/vehicles/:id`
2. Clicks "Buy Now" button
3. **PaymentsModule lazy loads** (89.03 kB)
4. User selects payment method (UPI or Card)
5. Fills dummy form and submits
6. Shows success message with transaction ID

---

## Angular Concepts Demonstrated

| Concept | Location |
|---------|----------|
| Lazy Loading | `app-routing.module.ts` |
| Eager Loading | `app.module.ts` imports |
| Singleton Pattern | `core.module.ts` |
| Shared Module | `shared.module.ts` |
| Route Guards | `core/guards/notify.guard.ts` |
| HTTP Interceptors | `core/interceptors/error.interceptor.ts` |
| Custom Pipes | `shared/pipes/capitalize.pipe.ts` |
| Custom Directives | `shared/directives/highlight.directive.ts` |
| Custom Validators | `shared/validators/email.validator.ts` |
| Reactive Forms | `PaymentSummaryComponent` |
| Environment Config | `environments/` |
| Theme Switching | Header component + CSS variables |

---

## Build Output

```
Initial Chunk Files                             | Size
------------------------------------------------|--------
vendor.js                                       | 2.21 MB
main.js                                         | 220.63 kB
polyfills.js                                    | 106.31 kB

Lazy Chunk Files                                | Size
------------------------------------------------|--------
features-vehicles-vehicles-module               | 97.63 kB
features-payments-payments-module               | 89.03 kB
```

---

## API

```
Base URL: https://6128991386a213001729f9df.mockapi.io/test/v1

Endpoints:
GET /jurisdiction          # List all vehicles
GET /jurisdiction/:id      # Get single vehicle
```

---

## Learn More

Each file contains detailed comments explaining the concepts. Start with:

1. `app.module.ts` - Root module structure
2. `core/core.module.ts` - Singleton pattern
3. `shared/shared.module.ts` - Reusable components
4. `features/vehicles/vehicles.module.ts` - Lazy loaded feature
5. `app-routing.module.ts` - Lazy loading configuration
