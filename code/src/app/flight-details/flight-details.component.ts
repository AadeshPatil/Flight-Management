import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../_services/user.service';

@Component({
    selector: 'app-flight-details',
    templateUrl: './flight-details.component.html',
    styleUrls: ['./flight-details.component.css']
})



export class FlightDetailsComponent implements OnInit {
    displayedColumns: string[] = ['id', 'flightNumber', 'source', 'destination', 'date', 'fare','action','delete'];
    dataSource: any = [];
    public updateFlightData!: FormGroup;
    selectedFlight :any;
    openSnackBar: any;
    
    constructor(private formBuilder: FormBuilder, private userService: UserService,private _snackBar: MatSnackBar){}
    
    ngOnInit(): void {
       this.loadFlightData();

        this.updateFlightData = this.formBuilder.group({
                'id': ['', Validators.required],
                'flightNumber': ['', Validators.required],
                'source': ['', Validators.required],
                'destination': ['', Validators.required],
                'date': ['', Validators.required],
                'fare': ['', Validators.required]
        })
    }

    selectedFlightsave(flight:any){
        this.selectedFlight = flight;
        this.updateFlightData = this.formBuilder.group({
            'id':flight.id,
            'flightNumber':flight.flightNumber,
            'source':flight.source,
            'destination':flight.destination,
            'date':flight.date,
            'fare':flight.fare
    })
    }

    updateFlight(){
        let body = this.updateFlightData.value;
        this.userService.addFlight(body).subscribe(
            (response: any) => {
                alert("Flight Updated");
                this.loadFlightData();
                
            },
            (error) => {
                alert(error.error.text);
            }
        );
        
    }


    deleteFlight(flightNumber :any) {
        if(confirm("Are you sure you want to Delete this flight ")) {
        this.userService.deleteFlight(flightNumber).subscribe(
            (response: any) => {
                alert('Flight Deleted Successfully');
                this.loadFlightData();
            },
            (error) => {
                alert(error.error.text);
            }
        );
        }
    }


    loadFlightData(){
        this.userService.getFlights().subscribe(
            (response: any) => {
                this.dataSource = response;
            },
            (error: any) => {
                console.log(error.error.text);
            }
        );
    }

}
