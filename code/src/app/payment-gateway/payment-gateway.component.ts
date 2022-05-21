import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-payment-gateway',
    templateUrl: './payment-gateway.component.html',
    styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {
    paymentMethod: any = 'Net Banking';
    paymentOptions: string[] = ['Add Debit/Credit/ATM cards', 'Net Banking', 'Other UPI Apps', 'EMI']
    data: any;
    constructor(private location: Location, private router: Router) {
        this.data = this.location.getState();
        if (Object.keys(this.data).length === 1) {
            this.router.navigate(['']);
        }
    }

    ngOnInit(): void {
    }

    confirmBooking() {
        this.router.navigate(['booking-status'], {
            state: {
                ...this.data, 'paymentMethod': this.paymentMethod, 'fare': this.data["flight-details"].fare *
                    this.data["passenger-details"].length
            }
        });
    }

}
