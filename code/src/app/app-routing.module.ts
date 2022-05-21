import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { RegisterComponent } from './register/register.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { BookingStatusComponent } from './booking-status/booking-status.component';
import { AirportDetailsComponent } from './airport-details/airport-details.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'flight-details', component: FlightDetailsComponent },
    { path: 'booking-details', component: BookingDetailsComponent, canActivate: [AuthGuard], data: { roles: ['User', 'Admin'] } },
    { path: 'booking-status', component: BookingStatusComponent, canActivate: [AuthGuard], data: { roles: ['User', 'Admin'] } },
    { path: 'payment-gateway', component: PaymentGatewayComponent, canActivate: [AuthGuard], data: { roles: ['User', 'Admin'] } },
    { path: 'airport-details', component: AirportDetailsComponent, canActivate: [AuthGuard], data: { roles: ['User', 'Admin'] } },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'aboutUs', component: AboutUsComponent },
    { path: 'forbidden', component: ForbiddenComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }