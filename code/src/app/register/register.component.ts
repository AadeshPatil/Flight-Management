import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public addUserForm!: FormGroup;
    constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.addUserForm = this.formBuilder.group({
            'firstName': ['', Validators.required],
            'lastName': ['', Validators.required],
            'username': ['', Validators.required],
            'mobile': ['', Validators.required],
            'password': ['', Validators.required],
            'emailId': ['', Validators.required]
        })
    }

    addUser() {
        if(this.addUserForm.valid){
        this.userService.addUser(this.addUserForm.value).subscribe(
            (response: any) => {
                this.openSnackBar('Registration Successful!! Login to continue.');
                this.router.navigate(['login']);
            },
            (error) => {
                console.log(error);
            }
        );
    }else{
        alert("please fill all the details")
    }
    }

    durationInSeconds = 3;
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
