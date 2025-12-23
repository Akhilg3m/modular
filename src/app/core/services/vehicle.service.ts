/**
 * ============================================
 * VEHICLE SERVICE
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * A SERVICE is a class that handles BUSINESS LOGIC.
 * Services are used for:
 * - Fetching data from APIs
 * - Sharing data between components
 * - Complex calculations
 *
 * WHY USE SERVICES?
 * - Separation of concerns (components focus on UI)
 * - Code reusability (multiple components use same service)
 * - Easier testing
 *
 * @Injectable DECORATOR:
 * - Tells Angular this class can be "injected" into components
 * - providedIn: 'root' = Available everywhere in the app
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../constants/app.constants';
import { Vehicle } from '../../features/vehicles/models/vehicle.model';

@Injectable({
  providedIn: 'root'  // Makes service available app-wide
})
export class VehicleService {

  // Build the full API URL using environment config
  private apiUrl = `${environment.apiBaseUrl}${API_ENDPOINTS.VEHICLES}`;

  /**
   * CONSTRUCTOR - Dependency Injection
   * ----------------------------------
   * HttpClient is "injected" here by Angular.
   * We don't create it ourselves - Angular provides it!
   */
  constructor(private http: HttpClient) {
    // Log in debug mode to help with learning
    if (environment.debugMode) {
      console.log('VehicleService initialized');
      console.log('API URL:', this.apiUrl);
    }
  }

  /**
   * GET ALL VEHICLES
   * ----------------
   * Fetches all vehicles from the API.
   *
   * WHAT'S AN OBSERVABLE?
   * - It's like a Promise, but more powerful
   * - Can emit multiple values over time
   * - Must be "subscribed" to get the data
   *
   * USAGE IN COMPONENT:
   * vehicleService.getAllVehicles().subscribe(vehicles => {
   *   this.vehicles = vehicles;
   * });
   */
  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }

  /**
   * GET SINGLE VEHICLE BY ID
   * ------------------------
   * Fetches one vehicle using its ID.
   *
   * @param id - The vehicle ID (string)
   * @returns Observable with single Vehicle object
   */
  getVehicleById(id: string): Observable<Vehicle> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Vehicle>(url);
  }

  /**
   * SEARCH VEHICLES
   * ---------------
   * Search vehicles by manufacturer name.
   * MockAPI supports query parameters.
   *
   * @param manufacturer - Manufacturer name to search
   */
  searchByManufacturer(manufacturer: string): Observable<Vehicle[]> {
    const url = `${this.apiUrl}?manufacturer=${manufacturer}`;
    return this.http.get<Vehicle[]>(url);
  }
}
