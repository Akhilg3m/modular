/**
 * ============================================
 * ERROR INTERCEPTOR
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * An INTERCEPTOR is like a middleware for HTTP requests.
 * It can modify requests BEFORE they're sent and
 * modify responses BEFORE they reach your code.
 *
 * USE CASES:
 * - Add authentication tokens to all requests
 * - Log all API calls
 * - Handle errors globally (this one!)
 * - Show loading spinners
 *
 * HOW IT WORKS:
 * Component → Interceptor → HTTP Request → Server
 *                ↑                           ↓
 *            Interceptor ← HTTP Response ←--┘
 *
 * This interceptor catches ALL HTTP errors in one place!
 */

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  /**
   * INTERCEPT METHOD
   * ----------------
   * Called for EVERY HTTP request in the app.
   *
   * @param request - The outgoing HTTP request
   * @param next - The next handler in the chain
   * @returns Observable of the HTTP event
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // Log request in debug mode
    if (environment.debugMode) {
      console.log('HTTP Request:', request.method, request.url);
    }

    // Pass the request to the next handler and catch errors
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  /**
   * HANDLE ERROR
   * ------------
   * Process different types of HTTP errors.
   *
   * Common HTTP Status Codes:
   * - 400: Bad Request (invalid data sent)
   * - 401: Unauthorized (not logged in)
   * - 403: Forbidden (no permission)
   * - 404: Not Found (resource doesn't exist)
   * - 500: Server Error (backend problem)
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    // Check if it's a client-side error
    if (error.error instanceof ErrorEvent) {
      // Client-side error (network issue, etc.)
      errorMessage = `Network Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 0:
          errorMessage = 'Cannot connect to server. Please check your internet connection.';
          break;
        case 400:
          errorMessage = 'Bad Request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please log in again.';
          break;
        case 403:
          errorMessage = 'Forbidden. You do not have permission.';
          break;
        case 404:
          errorMessage = 'Not Found. The requested resource does not exist.';
          break;
        case 500:
          errorMessage = 'Server Error. Please try again later.';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }

    // Log error in debug mode
    if (environment.debugMode) {
      console.error('HTTP Error:', errorMessage, error);
    }

    // Show alert to user
    alert(errorMessage);

    // Re-throw the error so components can also handle it if needed
    return throwError(() => new Error(errorMessage));
  }
}

/**
 * ============================================
 * HOW TO REGISTER THIS INTERCEPTOR
 * ============================================
 *
 * In core.module.ts, add to providers:
 *
 * import { HTTP_INTERCEPTORS } from '@angular/common/http';
 * import { ErrorInterceptor } from './interceptors/error.interceptor';
 *
 * providers: [
 *   {
 *     provide: HTTP_INTERCEPTORS,
 *     useClass: ErrorInterceptor,
 *     multi: true  // Allows multiple interceptors
 *   }
 * ]
 */
