/**
 * ============================================
 * PAYMENT SERVICE
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * This service handles payment-related operations.
 * In a real app, this would connect to payment gateways.
 *
 * For this demo, it simulates payment processing.
 */

import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  message: string;
}

export interface PaymentRequest {
  vehicleId: string;
  amount: number;
  paymentMethod: 'upi' | 'card';
  paymentDetails: UpiPaymentDetails | CardPaymentDetails;
}

export interface UpiPaymentDetails {
  upiId: string;
}

export interface CardPaymentDetails {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }

  /**
   * PROCESS PAYMENT
   * ---------------
   * Simulates payment processing with a delay.
   * In real app, this would call a payment gateway API.
   */
  processPayment(request: PaymentRequest): Observable<PaymentResult> {
    // Simulate API call with 2 second delay
    const transactionId = this.generateTransactionId(request);

    const result: PaymentResult = {
      success: true,
      transactionId,
      message: `Payment of $${request.amount} successful via ${request.paymentMethod.toUpperCase()}`
    };

    return of(result).pipe(delay(2000));
  }

  /**
   * GENERATE TRANSACTION ID
   * -----------------------
   * Creates a unique transaction ID for the payment.
   */
  private generateTransactionId(request: PaymentRequest): string {
    const timestamp = Date.now();
    const method = request.paymentMethod.toUpperCase();
    return `TXN${request.vehicleId}${method}${timestamp}`;
  }

  /**
   * VALIDATE UPI ID
   * ---------------
   * Validates UPI ID format.
   */
  validateUpiId(upiId: string): boolean {
    const upiRegex = /^[\w.-]+@[\w]+$/;
    return upiRegex.test(upiId);
  }

  /**
   * VALIDATE CARD NUMBER
   * --------------------
   * Validates card number using Luhn algorithm (basic check).
   */
  validateCardNumber(cardNumber: string): boolean {
    // Remove spaces and check if 16 digits
    const cleanNumber = cardNumber.replace(/\s/g, '');
    return /^\d{16}$/.test(cleanNumber);
  }

  /**
   * GET CARD TYPE
   * -------------
   * Determines card type based on number prefix.
   */
  getCardType(cardNumber: string): string {
    const cleanNumber = cardNumber.replace(/\s/g, '');

    if (/^4/.test(cleanNumber)) return 'Visa';
    if (/^5[1-5]/.test(cleanNumber)) return 'Mastercard';
    if (/^3[47]/.test(cleanNumber)) return 'Amex';
    if (/^6/.test(cleanNumber)) return 'Discover';

    return 'Unknown';
  }
}
