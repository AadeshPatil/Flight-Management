import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Inject } from '@angular/core';

@Component({
    selector: 'app-booking-status',
    templateUrl: './booking-status.component.html',
    styleUrls: ['./booking-status.component.css']
})
export class BookingStatusComponent implements OnInit {
    data: any;
    userData: any;
    color: ThemePalette = 'primary';
    mode: ProgressBarMode = 'determinate';
    value = 50;
    bufferValue = 75;
    message = '';
    showLoading = true;
    finalBookingId: any;
    durationInSeconds = 3;

    constructor(private location: Location, private router: Router, private userService: UserService, private userAuthService: UserAuthService, private _snackBar: MatSnackBar) {
        this.data = this.location.getState();
        this.userData = this.userAuthService.getUserData();
        if (Object.keys(this.data).length === 1) {
            this.router.navigate(['']);
        }
        let d = new Date();
        this.finalBookingId = '' + d.getDate() + d.getMonth() + d.getFullYear() + d.getHours() + d.getMinutes();

        this.completeBookingProcess();
    }

    ngOnInit(): void {
    }

    async completeBookingProcess() {
        this.message = 'Finalising the payment by ' + this.data.paymentMethod + ' method.'
        setTimeout(() => {
            this.message = 'Saving the passenger details.'
            setTimeout(() => {
                this.data['passenger-details'].forEach((p: any, index: Number) => {
                    p.passengerId = Number(this.finalBookingId + String(index))
                    this.savePassengerDetails(p);
                })
                this.message = 'Completing the booking Process';
                setTimeout(() => {
                    this.userData = this.userAuthService.getUserData();
                    let d = new Date();
                    let body = {
                        "bookingId": Number(this.finalBookingId),
                        "bookingDate": d.getMonth() + '-' + ((d.getMonth() + 1) < 10) ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1) + '-' + d.getFullYear(),
                        "noOfPassengers": this.data['passenger-details'].length,
                        "bookingUsername": this.userData['username'],
                        "flightNumber": this.data['flight-details'].flightNumber
                    };
                    this.bookFlight(body);
                }, 3000);
            }, 3000);
        }, 4000);
    }

    async savePassengerDetails(data: any) {
        await this.userService.addPassenger(data).subscribe(response => {
            console.log(response)
        }, error => {
            console.log(error);
        })
    }

    async bookFlight(data: any) {
        await this.userService.addNewBooking(data).subscribe(response => {
            console.log(response)
        }, error => {
            console.log(error);
        })
        setTimeout(() => {
            // this.openSnackBar(String(response))
        }, 3000)
        this.showLoading = false;
    }

    openSnackBar(message: String) {
        this._snackBar.openFromComponent(PizzaPartyComponent, {
            data: { message: message },
            duration: this.durationInSeconds * 1000,
        });
    }

    goToHome() {
        this.router.navigate(['']);
    }

}

@Component({
    selector: 'snack-bar-component-example-snack',
    templateUrl: './snackBarComponent.html',
    styles: [
        `
    .example-pizza-party {
      color: hotpink;
    }
  `,
    ],
})
export class PizzaPartyComponent {
    message = this.data.message;
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
