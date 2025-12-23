/**
 * ============================================
 * CAPITALIZE PIPE
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * A PIPE transforms data for display in templates.
 * Angular has built-in pipes like: date, currency, uppercase
 *
 * CUSTOM PIPES let you create your own transformations!
 *
 * HOW PIPES WORK:
 * Template: {{ "hello world" | capitalize }}
 * Output:   "Hello World"
 *
 * PIPE ANATOMY:
 * @Pipe({ name: 'capitalize' }) - The name used in templates
 * transform() - The function that does the work
 *
 * PURE vs IMPURE PIPES:
 * - pure: true (default) = Only runs when input CHANGES
 * - pure: false = Runs on every change detection cycle (slower)
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',  // Use as: {{ value | capitalize }}
  pure: true           // Only recalculate when input changes
})
export class CapitalizePipe implements PipeTransform {

  /**
   * TRANSFORM METHOD
   * ----------------
   * This is called automatically when the pipe is used.
   *
   * @param value - The input string
   * @param mode - Optional: 'first' = first letter only, 'all' = all words
   * @returns Capitalized string
   *
   * USAGE EXAMPLES:
   * {{ "hello" | capitalize }}         → "Hello"
   * {{ "hello world" | capitalize:'all' }} → "Hello World"
   */
  transform(value: string, mode: 'first' | 'all' = 'first'): string {
    // Handle null/undefined values
    if (!value) {
      return '';
    }

    // Ensure we're working with a string
    const str = String(value);

    if (mode === 'all') {
      // Capitalize first letter of EACH word
      return str
        .split(' ')
        .map(word => this.capitalizeWord(word))
        .join(' ');
    }

    // Default: Capitalize only the first letter
    return this.capitalizeWord(str);
  }

  /**
   * HELPER: Capitalize a single word
   */
  private capitalizeWord(word: string): string {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
}
