import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StripePaymentService } from '../../services/stripe-payment.service';
import { Stripe, StripeElements, StripeElement } from '@stripe/stripe-js';

@Component({
  selector: 'app-stripe-payment',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="stripe-payment-container">
      <div class="payment-form">
        <h2>Secure Payment</h2>
        
        <div class="amount-display">
          <span>Total Amount:</span>
          <span class="amount">${{ amount | number:'1.2-2' }}</span>
        </div>

        <div class="card-element-container">
          <div id="card-element"></div>
          <div id="card-errors" class="error-message" *ngIf="error">{{ error }}</div>
        </div>

        <button 
          class="pay-button" 
          (click)="handlePayment()"
          [disabled]="loading || !cardComplete">
          <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
          <span *ngIf="!loading">Pay Now</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .stripe-payment-container {
      max-width: 500px;
      margin: 2rem auto;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      background: white;
    }

    h2 {
      margin-bottom: 1.5rem;
      color: #32325d;
      text-align: center;
    }

    .amount-display {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 4px;
    }

    .amount {
      font-weight: bold;
      color: #5469d4;
    }

    .card-element-container {
      margin-bottom: 1.5rem;
    }

    #card-element {
      padding: 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      background: white;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .pay-button {
      width: 100%;
      padding: 0.875rem;
      background: #5469d4;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      transition: background-color 0.2s ease;
    }

    .pay-button:disabled {
      background: #a8b1ce;
      cursor: not-allowed;
    }

    .pay-button:hover:not(:disabled) {
      background: #4a5fc1;
    }

    mat-spinner {
      display: inline-block;
    }
  `]
})
export class StripePaymentComponent implements OnInit, OnDestroy {
  @Input() amount!: number;
  @Input() orderId!: string;

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeElement | null = null;
  error: string | null = null;
  loading = false;
  cardComplete = false;

  constructor(
    private paymentService: StripePaymentService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    try {
      this.stripe = await this.paymentService.getStripe();
      
      if (!this.stripe) {
        throw new Error('Failed to load Stripe');
      }

      this.elements = this.stripe.elements();
      this.card = this.elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#32325d',
            '::placeholder': {
              color: '#aab7c4'
            }
          },
          invalid: {
            color: '#dc3545',
            iconColor: '#dc3545'
          }
        }
      });

      this.card.mount('#card-element');

      this.card.on('change', (event) => {
        this.cardComplete = event.complete;
        this.error = event.error ? event.error.message : null;
      });
    } catch (error) {
      this.error = 'Failed to initialize payment system';
      this.snackBar.open('Payment system initialization failed', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    }
  }

  async handlePayment() {
    if (!this.stripe || !this.card) {
      this.error = 'Payment system not initialized';
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      const { clientSecret } = await this.paymentService
        .createPaymentIntent(this.amount, this.orderId)
        .toPromise();

      const { error, paymentIntent } = await this.stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: this.card,
          }
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === 'succeeded') {
        this.snackBar.open('Payment successful!', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        // Navigate to success page or handle success case
      }
    } catch (error) {
      this.error = error.message || 'Payment failed';
      this.snackBar.open('Payment failed', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    } finally {
      this.loading = false;
    }
  }

  ngOnDestroy() {
    if (this.card) {
      this.card.destroy();
    }
  }
}
