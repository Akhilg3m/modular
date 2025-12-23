/**
 * ============================================
 * STORAGE SERVICE
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * This service handles browser localStorage operations.
 *
 * WHAT IS LOCALSTORAGE?
 * - Browser's way to store data permanently
 * - Data persists even after closing browser
 * - Stored as key-value pairs (like a dictionary)
 *
 * USAGE:
 * - Save user preferences (theme, language)
 * - Cache data for offline use
 * - Store tokens (be careful with sensitive data!)
 *
 * WHY WRAP IT IN A SERVICE?
 * - Centralized storage logic
 * - Easy to add error handling
 * - Can mock for testing
 */

import { Injectable } from '@angular/core';
import { THEME_KEY, DARK_THEME, LIGHT_THEME } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // ============================================
  // GENERIC STORAGE METHODS
  // ============================================

  /**
   * SAVE DATA TO LOCALSTORAGE
   * @param key - The key to store under
   * @param value - Any value (will be converted to JSON)
   */
  setItem(key: string, value: any): void {
    try {
      // Convert objects/arrays to JSON string
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * GET DATA FROM LOCALSTORAGE
   * @param key - The key to retrieve
   * @returns The stored value, or null if not found
   */
  getItem<T>(key: string): T | null {
    try {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue) {
        return JSON.parse(jsonValue) as T;
      }
      return null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  /**
   * REMOVE ITEM FROM LOCALSTORAGE
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * CLEAR ALL LOCALSTORAGE
   * Use with caution!
   */
  clear(): void {
    localStorage.clear();
  }

  // ============================================
  // THEME-SPECIFIC METHODS
  // ============================================

  /**
   * SAVE CURRENT THEME
   */
  saveTheme(theme: string): void {
    this.setItem(THEME_KEY, theme);
  }

  /**
   * GET SAVED THEME
   * Returns light theme as default if none saved
   */
  getTheme(): string {
    return this.getItem<string>(THEME_KEY) || LIGHT_THEME;
  }

  /**
   * CHECK IF DARK THEME IS ACTIVE
   */
  isDarkTheme(): boolean {
    return this.getTheme() === DARK_THEME;
  }
}
