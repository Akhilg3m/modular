# AutoMart - Angular Monolithic Application

Angular application demonstrating essential Angular concepts using a vehicle marketplace example.

## Quick Start

```bash
# Install dependencies
npm install

# Development server (shows "AutoMart Dev" in navbar)
ng serve

# Production server (shows "AutoMart" in navbar)
ng serve --configuration=production

# Build for production
ng build
```

Navigate to `http://localhost:4200/`

---

## Folder Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── header/          # Top navigation bar
│   │   ├── footer/          # Bottom footer
│   │   ├── sidebar/         # Side navigation menu
│   │   ├── vehicle-list/    # Vehicle cards grid
│   │   └── vehicle-detail/  # Single vehicle view
│   │
│   ├── pages/               # Full page components
│   │   ├── home/            # Landing page
│   │   ├── about/           # About page (empty layout)
│   │   └── not-found/       # 404 error page
│   │
│   ├── layouts/             # Page layout wrappers
│   │   ├── main-layout/     # Header + Sidebar + Footer
│   │   └── empty-layout/    # Clean, no chrome
│   │
│   ├── services/            # Business logic & API calls
│   │   ├── vehicle.service.ts
│   │   └── storage.service.ts
│   │
│   ├── models/              # TypeScript interfaces
│   │   ├── vehicle.model.ts
│   │   └── user.model.ts
│   │
│   ├── guards/              # Route protection
│   │   └── notify.guard.ts  # CanDeactivate guard
│   │
│   ├── interceptors/        # HTTP request/response handlers
│   │   └── error.interceptor.ts
│   │
│   ├── pipes/               # Data transformation
│   │   └── capitalize.pipe.ts
│   │
│   ├── directives/          # DOM manipulation
│   │   └── highlight.directive.ts
│   │
│   ├── validators/          # Form validation
│   │   └── email.validator.ts
│   │
│   ├── enums/               # Type-safe constants
│   │   └── user-role.enum.ts
│   │
│   ├── constants/           # App-wide constants
│   │   ├── app.constants.ts
│   │   └── route.constants.ts
│   │
│   ├── utils/               # Helper functions
│   │   └── date.util.ts
│   │
│   ├── app.module.ts        # Root module (ONLY module - monolithic)
│   ├── app-routing.module.ts # All routes defined here
│   └── app.component.ts     # Root component
│
├── environments/            # Environment configurations
│   ├── environment.ts       # Development settings
│   └── environment.prod.ts  # Production settings
│
├── styles/                  # Global SCSS
│   ├── _variables.scss      # SCSS variables
│   ├── _mixins.scss         # Reusable SCSS mixins
│   └── theme.scss           # Light/Dark theme CSS variables
│
└── styles.scss              # Main stylesheet entry
```

---

## Angular Concepts Implemented

### 1. Layouts System

Two layouts control the page structure:

| Layout | Components | Used By |
|--------|------------|---------|
| **MainLayout** | Header + Sidebar + Footer | Home, Vehicles, Vehicle Detail |
| **EmptyLayout** | Content only (full screen) | About, 404 Page |

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

### 2. Environment Configuration

Different settings for development vs production:

```typescript
// environment.ts (Development)
export const environment = {
  production: false,
  appName: 'AutoMart Dev',    // Shows in navbar
  apiBaseUrl: 'https://...',
  appVersion: '1.0.0-dev',
  debugMode: true
};

// environment.prod.ts (Production)
export const environment = {
  production: true,
  appName: 'AutoMart',        // Shows in navbar
  apiBaseUrl: 'https://...',
  appVersion: '1.0.0',
  debugMode: false
};
```

**Switch environments:**
```bash
ng serve                              # Uses environment.ts
ng serve --configuration=production   # Uses environment.prod.ts
```

### 3. Services

**VehicleService** - Fetches data from REST API:
```typescript
@Injectable({ providedIn: 'root' })
export class VehicleService {
  getAllVehicles(): Observable<Vehicle[]> { ... }
  getVehicleById(id: string): Observable<Vehicle> { ... }
}
```

**StorageService** - Manages localStorage:
```typescript
@Injectable({ providedIn: 'root' })
export class StorageService {
  saveTheme(theme: string): void { ... }
  isDarkTheme(): boolean { ... }
}
```

### 4. Route Guard (CanDeactivate)

Prompts user before leaving the vehicle detail page:

```typescript
// notify.guard.ts
@Injectable({ providedIn: 'root' })
export class NotifyGuard implements CanDeactivate<VehicleDetailComponent> {
  canDeactivate(component: VehicleDetailComponent): boolean {
    if (component.hasInteracted) {
      return confirm('Leave this page? Changes may not be saved.');
    }
    return true;
  }
}

// app-routing.module.ts
{ path: 'vehicle/:id', component: VehicleDetailComponent, canDeactivate: [NotifyGuard] }
```

### 5. HTTP Interceptor

Catches all HTTP errors globally:

```typescript
// error.interceptor.ts
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error.message);
        return throwError(() => error);
      })
    );
  }
}
```

### 6. Custom Pipe

Transforms text to capitalize:

```typescript
// capitalize.pipe.ts
@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
  transform(value: string, mode: 'first' | 'all' = 'first'): string { ... }
}

// Usage in template
{{ vehicle.color | capitalize }}      // "red" → "Red"
{{ vehicle.name | capitalize:'all' }} // "ford mustang" → "Ford Mustang"
```

### 7. Custom Directive

Highlights elements on hover:

```typescript
// highlight.directive.ts
@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  @Input() appHighlight = '#ffeb3b';

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight);
  }
}

// Usage in template
<div appHighlight="#e3f2fd">Hover me!</div>
```

### 8. Custom Validator

Validates email format in reactive forms:

```typescript
// email.validator.ts
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmail: true };
  };
}

// Usage in component
emailControl = new FormControl('', [Validators.required, emailValidator()]);
```

### 9. Enums

Type-safe user roles:

```typescript
// user-role.enum.ts
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST'
}

export function isAdmin(role: UserRole): boolean {
  return role === UserRole.ADMIN;
}
```

### 10. Theme Switching

Light/Dark theme using CSS variables:

```scss
// theme.scss
.light-theme {
  --bg-primary: #ffffff;
  --text-primary: #0f172a;
  --primary-color: #1a56db;
}

.dark-theme {
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  --primary-color: #3b82f6;
}
```

Toggle in header component saves preference to localStorage.

---

## API

The app uses a mock API for vehicle data:

```
Base URL: https://6128991386a213001729f9df.mockapi.io/test/v1

Endpoints:
GET /jurisdiction          # List all vehicles
GET /jurisdiction/:id      # Get single vehicle
```

---

## Route Summary

| URL | Component | Layout | Guard |
|-----|-----------|--------|-------|
| `/` | HomeComponent | Main | - |
| `/vehicles` | VehicleListComponent | Main | - |
| `/vehicle/:id` | VehicleDetailComponent | Main | NotifyGuard |
| `/about` | AboutComponent | Empty | - |
| `/**` | NotFoundComponent | Empty | - |

---

## Key Files

| File | Purpose |
|------|---------|
| `app.module.ts` | Root module - declares ALL components (monolithic) |
| `app-routing.module.ts` | All route definitions |
| `environment.ts` | Development configuration |
| `environment.prod.ts` | Production configuration |
| `theme.scss` | CSS variables for theming |

---

## Why Monolithic?

This app uses a **single AppModule** (no feature modules) to keep things simple for beginners. In larger apps, you would split into feature modules for:
- Lazy loading
- Better organization
- Team collaboration

---

## Learn More

Each file contains detailed comments explaining the concepts. Start with:

1. `app.module.ts` - See how everything connects
2. `app-routing.module.ts` - Understand routing
3. `vehicle.service.ts` - Learn about services and HTTP
4. `header.component.ts` - See @Input/@Output in action
