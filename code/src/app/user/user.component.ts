import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    data: any;
    message: any;
    constructor(private userService: UserService, private userAuthService: UserAuthService) {
        this.data = this.userAuthService.getUserData();
    }

    ngOnInit(): void { }
    changePic(){
        alert("Function yet to impliment");
    }
}
