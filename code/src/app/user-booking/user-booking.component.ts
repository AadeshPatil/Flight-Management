import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css']
})
export class UserBookingComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private userService: UserService,private _snackBar: MatSnackBar){}
    
  displayedColumns: string[] = ['id', 'flightNumber', 'source', 'destination', 'date','noOfPassenger', 'fare','status','cancle','viewticket'];
  userData =  JSON.parse(localStorage.getItem('userData') || "{}");
 
 
  dataSource:any = [];
  bookingDataList :any = [];
  public bookingData!: FormGroup;
  selectedFlight :any;
  openSnackBar: any;
  showTickets:boolean = true;

  selectedTicket :any = {
    from :'',
    where :'',
    bookingDate:'',
    fare :''

  };

  ngOnInit(): void {
    var userId = this.userData.username;  
    this.loadBaseData(userId);

  }


  loadBaseData(userId :any){
    this.userService.getBooking(userId).subscribe(
      (response: any) => {
          this.dataSource = response;
          this.dataSource.reverse();
          this.uppdateData();
      });
      
  }
 

  uppdateData(){
    this.dataSource.forEach((element:any) => {
      var date = element['bookingDate'].replace('-','/');

      const today = new Date();
      const day = new Date(date);
      var result =  day < today;

      console.log(result);
      if(result &&  element['currentStatus'] == "upComming" ){
        element['currentStatus'] = "Complted"
        this.userService.cancleBooking(element).subscribe(
          (response: any) => {
              
          },
          (error: any) => {
              console.log(error.error.text);
          }
      );
      }
      
    });
  }



  cancleFlight(element :any){
    if (confirm("Are You Sure you Want to Cancelled your Ticket!")) {
      element['currentStatus'] = "Cancelled"
      this.userService.cancleBooking(element).subscribe(
        (response: any) => {
            this.ngOnInit();
        },
        (error: any) => {
            console.log(error.error.text);
        }
    );
      }

  }


  viewTicket(element :any){
    console.log(element);
    this.selectedTicket = element;
  }
}
