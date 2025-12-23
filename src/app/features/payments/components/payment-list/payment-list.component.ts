/**
 * ============================================
 * PAYMENT LIST COMPONENT
 * ============================================
 *
 * Displays payment method options (UPI or Card).
 * This is the main selection screen for payments.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../../../core/services/vehicle.service';
import { Vehicle } from '../../../vehicles/models/vehicle.model';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  vehicleId: string | null = null;
  vehicle: Vehicle | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.paramMap.get('vehicleId');
    if (this.vehicleId) {
      this.loadVehicle();
    } else {
      this.errorMessage = 'No vehicle selected';
      this.isLoading = false;
    }
  }

  loadVehicle(): void {
    if (!this.vehicleId) return;

    this.vehicleService.getVehicleById(this.vehicleId).subscribe({
      next: (data: Vehicle) => {
        this.vehicle = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load vehicle details';
        this.isLoading = false;
      }
    });
  }

  selectUPI(): void {
    this.router.navigate(['upi'], { relativeTo: this.route });
  }

  selectCard(): void {
    this.router.navigate(['card'], { relativeTo: this.route });
  }

  goBack(): void {
    if (this.vehicleId) {
      this.router.navigate(['/vehicles', this.vehicleId]);
    } else {
      this.router.navigate(['/vehicles']);
    }
  }
}
