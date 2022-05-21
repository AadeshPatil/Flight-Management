import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
    selector: 'app-airport-details',
    templateUrl: './airport-details.component.html',
    styleUrls: ['./airport-details.component.css']
})
export class AirportDetailsComponent implements OnInit {
    displayedColumns: string[] = ['id', 'flightNumber', 'source'];
    dataSource: any = [];

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getAirports().subscribe(
            (response: any) => {
                this.dataSource = response;
            },
            (error: any) => {
                console.log(error.error.text);
            }
        );
    }

}
