/**
 * ============================================
 * CUSTOM EMAIL VALIDATOR
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * Angular has built-in validators (required, minLength, etc.)
 * But sometimes we need CUSTOM validators for special rules.
 *
 * HOW VALIDATORS WORK:
 * - A validator is a function that checks a form control
 * - Returns NULL if valid (no error)
 * - Returns an ERROR OBJECT if invalid
 *
 * ERROR OBJECT FORMAT:
 * { errorName: true } or { errorName: { details } }
 *
 * USAGE IN TEMPLATE:
 * <input [formControl]="emailControl">
 * <div *ngIf="emailControl.errors?.['invalidEmail']">
 *   Please enter a valid email
 * </div>
 */

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * SIMPLE EMAIL VALIDATOR
 * ----------------------
 * Checks if the value is a valid email format.
 *
 * WHY NOT USE BUILT-IN EMAIL VALIDATOR?
 * - This is for learning purposes
 * - You can customize the regex pattern
 * - You can add custom error messages
 */
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Get the value from the form control
    const value = control.value;

    // If empty, let 'required' validator handle it
    if (!value) {
      return null;
    }

    // Email regex pattern (simple version)
    // Matches: text@text.text
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Test the value against the pattern
    const isValid = emailPattern.test(value);

    // Return null if valid, error object if invalid
    return isValid ? null : { invalidEmail: true };
  };
}

/**
 * COMPANY EMAIL VALIDATOR
 * -----------------------
 * Checks if email belongs to a specific domain.
 *
 * USAGE:
 * new FormControl('', [companyEmailValidator('company.com')])
 *
 * @param domain - The required email domain
 */
export function companyEmailValidator(domain: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    // Check if email ends with the required domain
    const isCompanyEmail = value.toLowerCase().endsWith(`@${domain.toLowerCase()}`);

    return isCompanyEmail ? null : {
      companyEmail: {
        requiredDomain: domain,
        actualValue: value
      }
    };
  };
}

/**
 * HELPER: Check email validity (can be used anywhere)
 */
export function isValidEmail(email: string): boolean {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}
