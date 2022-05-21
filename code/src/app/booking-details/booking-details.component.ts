import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-booking-details',
    templateUrl: './booking-details.component.html',
    styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
    data: any;

    constructor(private location: Location, private router: Router) {
        this.data = this.location.getState();
        if (Object.keys(this.data).length === 1) {
            this.router.navigate(['']);
        }
    }

    ngOnInit(): void {
    }

    deletePassenge(p: any) {
        const index = this.data['passenger-details'].indexOf(p);
        this.data['passenger-details'].splice(index, 1);
    }

    goToPayments() {
        if (this.data["passenger-details"].length === 0) {
            alert('No passenger details provided. Cannot proceed further');
        }
        this.router.navigate(['payment-gateway'], { state: { ...this.data } })
    }

}
