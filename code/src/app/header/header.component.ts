import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    userData: any;

    constructor(
        private userAuthService: UserAuthService,
        private router: Router,
        public userService: UserService
    ) {
        this.userData = this.userAuthService.getUserData();
    }

    ngOnInit(): void { }

    public isLoggedIn() {
        let status = this.userAuthService.isLoggedIn();
        if (status) {
            this.userData = this.userAuthService.getUserData();
        }
        return status
    }

    public logout() {
        if(confirm("Are you sure you want to logout ")) {
            this.userAuthService.clear();
            this.router.navigate(['']);
          }

    }
}
