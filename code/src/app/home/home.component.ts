import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public searchFlightData!: FormGroup;
    myControl = new FormControl();
    options: string[] = ["Bhandup", "Mumbai", "Visakhapatnam", "Coimbatore", "Delhi", "Bangalore", "Pune", "Nagpur", "Lucknow", "Vadodara", "Indore", "Jalalpur", "Bhopal", "Kolkata", "Kanpur", "New Delhi", "Faridabad", "Rajkot", "Ghaziabad", "Chennai", "Meerut", "Agra", "Jaipur", "Jabalpur", "Varanasi", "Allahabad", "Hyderabad", "Noida", "Howrah", "Thane", "Patiala", "Chakan", "Ahmedabad", "Manipala", "Mangalore", "Panvel", "Udupi", "Rishikesh", "Gurgaon", "Mathura", "Shahjahanpur", "Bagpat", "Sriperumbudur", "Chandigarh", "Ludhiana", "Palakkad", "Kalyan", "Valsad", "Ulhasnagar", "Bhiwani", "Shimla", "Dehradun", "Patna", "Unnao", "Tiruvallur", "Kanchipuram", "Jamshedpur", "Gwalior", "Karur", "Erode", "Gorakhpur", "Ooty", "Haldwani", "Bikaner", "Puducherry", "Nalbari", "Bellary", "Vellore", "Naraina", "Mandi", "Rupnagar", "Jodhpur", "Roorkee", "Aligarh", "Indraprast", "Karnal", "Tanda", "Amritsar", "Raipur", "Pilani", "Bilaspur", "Srinagar", "Guntur", "Kakinada", "Warangal", "Tirumala - Tirupati", "Nizamabad", "Kadapa", "Kuppam", "Anantpur", "Nalgonda", "Potti", "Nellore", "Rajahmundry", "Bagalkot", "Kurnool", "Secunderabad", "Mahatma", "Bharuch", "Miraj", "Nanded", "Anand", "Gandhinagar", "Bhavnagar", "Morvi", "Aurangabad", "Modasa", "Patan", "Solapur", "Kolhapur", "Junagadh", "Akola", "Bhuj", "Karad", "Jalgaon Jamod", "Chandrapur", "Maharaj", "Dhule", "Ponda", "Dahod", "Navsari", "Panjim", "Patel", "Nashik", "Amravati", "Somnath", "Ganpat", "Karwar", "Davangere", "Raichur", "Nagara", "Kushalnagar", "Hassan", "Hubli", "Bidar", "Belgaum", "Mysore", "Dharwad", "Kolar", "TumkÅ«r", "Tiruchi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Madurai", "Thalassery", "Kannur", "Karaikudi", "Thanjavur", "Manor", "Idukki", "Thiruvarur", "Alappuzha", "Gandhigram", "Kochi", "Annamalainagar", "Amet", "Kottarakara", "Kottayam", "Tirunelveli", "Mohan", "Salem", "Attingal", "Chitra", "Chengannur", "Guwahati", "Kalam", "Ranchi", "Shillong", "Gangtok", "Srikakulam", "Tezpur", "Bhubaneswar", "Imphal", "Sundargarh", "Arunachal", "Manipur", "Bihar Sharif", "Mandal", "Dibrugarh", "Darbhanga", "Gaya", "Bhagalpur", "Kunwar", "Barddhaman", "Jadabpur", "Kalyani", "Cuttack", "Barpeta", "Jorhat", "Kharagpur", "Medinipur", "Agartala", "Saranga", "Machilipatnam", "Dhanbad", "Silchar", "Dumka", "Kokrajhar", "Bankura", "Jalpaiguri", "Durgapur", "Kalinga", "Palampur", "Jammu", "Dwarka", "Faridkot", "Udaipur", "Raigarh", "Hisar", "Solan"];
    filteredOptions: Observable<string[]>;
    flights: any = [];
    showResult: boolean = false;
    displayedColumns: string[] = ['id', 'flightNumber', 'source', 'destination', 'date', 'fare', 'action'];
    durationInSeconds = 3;

    constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private userAuthService: UserAuthService, public dialog: MatDialog, private _snackBar: MatSnackBar) {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
        );
    }

    ngOnInit(): void {
        this.searchFlightData = this.formBuilder.group({
            'source': [null, Validators.required],
            'destination': [null, Validators.required],
            'date-start': [null, Validators.required],
        })
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    searchFlights() {
        this.flights = [];
        let date = convert(this.searchFlightData.value['date-start'])
        console.log(this.searchFlightData.value + "" + date);
        this.userService.searchFlight(this.searchFlightData.value).subscribe(
            
            (response:any) => {
                console.log(response[0].date + "" + date);
                response.forEach((_element: any) => {
                    if(_element['date'] == date){
                        this.flights.push(_element);
                    }
                });``
            },
            (error) => {
                this.flights = [];
                console.log(error);
            });
        this.showResult = true;
    }

    bookFlight(data: any) {
        if (this.userAuthService.getUserData().username === undefined) {
            this.openSnackBar('Login to continue.');
            this.router.navigate(['/login']);
            return;
        }
        this.dialog.open(DialogContentExampleDialog, { data: data });
    }

    openSnackBar(message: String) {
        this._snackBar.openFromComponent(PizzaPartyComponent, {
            data: { message: message },
            duration: this.durationInSeconds * 1000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

}

@Component({
    selector: 'add-Passenger-Dialog',
    templateUrl: 'addPassengerDialog.html',
})
export class DialogContentExampleDialog {
    public passengerData!: FormGroup;
    passengerDataArray: any = [];
    durationInSeconds = 3;

    constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private userAuthService: UserAuthService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar) {
        this.passengerData = this.formBuilder.group({
            'passengerId': [null],
            'firstName': [null, Validators.required],
            'lastName': [null, Validators.required],
            'gender': [null, Validators.required]
        })
    }

    addPassenger() {
        if (!this.passengerData.valid) {
            return;
        }
        this.passengerDataArray.push(this.passengerData.value);
        this.passengerData.reset();
        Object.keys(this.passengerData.controls).forEach(key => {
            this.passengerData.controls[key].setErrors(null)
        });
        this.openSnackBar('Passenger Added Successfully.');
    }

    deletePassenger(data: any) {
        const index = this.passengerDataArray.indexOf(data);
        this.passengerDataArray.splice(index, 1);
    }

    goToBookingDetails() {
        if (this.passengerDataArray.length === 0) {
            this.openSnackBar('Passengers list cannot be empty.');
            return;
        }
        this.router.navigate(['/booking-details'], { state: { 'flight-details': this.data, 'passenger-details': this.passengerDataArray } });
    }

    openSnackBar(message: String) {
        this._snackBar.openFromComponent(PizzaPartyComponent, {
            data: { message: message },
            duration: this.durationInSeconds * 1000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    convert(str :any) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [day,mnth,date.getFullYear()].join("-");
      }

}

@Component({
    selector: 'snack-bar-component-example-snack',
    templateUrl: '../booking-status/snackBarComponent.html',
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

// function convert(arg0: any) {
//     throw new Error('Function not implemented.');
// }
function convert(str :any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day,mnth,date.getFullYear()].join("-");
  }
