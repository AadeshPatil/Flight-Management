import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    public loginForm!: FormGroup;

    constructor(
        private userService: UserService,
        private userAuthService: UserAuthService,
        private router: Router,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {

        this.loginForm = this.formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        })

    }


    login() {
        this.userService.login(this.loginForm.value).subscribe(
            (response: any) => {
                this.userAuthService.setUserData(response.user);
                this.userAuthService.setRoles(response.user.roles);
                this.userAuthService.setToken(response.jwtToken);

                const role = response.user.roles[0].roleName;
                if (role === 'Admin') {
                    this.router.navigate([''], { skipLocationChange: true });
                } else {
                    this.router.navigate([''], { skipLocationChange: true });
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
