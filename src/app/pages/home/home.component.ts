/**
 * ============================================
 * HOME PAGE COMPONENT
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * The Home page is the landing page of our app.
 * It shows:
 * - Welcome message
 * - Featured vehicles
 * - Quick navigation
 *
 * This demonstrates:
 * - Using enums in components
 * - Form with custom validator
 * - Simple component interaction
 */

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from '../../core/services/vehicle.service';
import { Vehicle } from '../../features/vehicles/models/vehicle.model';
import { UserRole, isAdmin } from '../../core/enums/user-role.enum';
import { emailValidator } from '../../shared/validators/email.validator';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // App info
  appName = environment.appName;

  // Featured vehicles (first 3 from API)
  featuredVehicles: Vehicle[] = [];
  isLoading = true;

  // Demo: Using Enum
  // We'll show different content based on user role
  currentUserRole: UserRole = UserRole.USER;
  userRoleEnum = UserRole; // Make enum available in template

  // Demo: Form with custom email validator
  emailControl = new FormControl('', [
    Validators.required,
    emailValidator() // Our custom validator!
  ]);

  constructor(
    private vehicleService: VehicleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFeaturedVehicles();
  }

  /**
   * Load first 3 vehicles as featured
   */
  loadFeaturedVehicles(): void {
    this.vehicleService.getAllVehicles().subscribe({
      next: (vehicles) => {
        this.featuredVehicles = vehicles.slice(0, 3);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  /**
   * Navigate to vehicles list
   */
  viewAllVehicles(): void {
    this.router.navigate(['/vehicles']);
  }

  /**
   * Navigate to vehicle detail
   */
  viewVehicle(id: string): void {
    this.router.navigate(['/vehicles', id]);
  }

  /**
   * Demo: Toggle user role to show enum usage
   */
  toggleRole(): void {
    this.currentUserRole = this.currentUserRole === UserRole.USER
      ? UserRole.ADMIN
      : UserRole.USER;
  }

  /**
   * Demo: Check if current user is admin
   * Uses our helper function from the enum file
   */
  get isAdminUser(): boolean {
    return isAdmin(this.currentUserRole);
  }

  /**
   * Demo: Handle newsletter subscription
   * Shows form validation
   */
  onSubscribe(): void {
    if (this.emailControl.valid) {
      alert(`Subscribed with: ${this.emailControl.value}`);
      this.emailControl.reset();
    }
  }
}
