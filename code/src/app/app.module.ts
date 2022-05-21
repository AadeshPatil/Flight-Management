import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { DialogContentExampleDialog } from './home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { RegisterComponent } from './register/register.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { BookingStatusComponent } from './booking-status/booking-status.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { AirportDetailsComponent } from './airport-details/airport-details.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AdminComponent,
        UserComponent,
        LoginComponent,
        HeaderComponent,
        ForbiddenComponent,
        FlightDetailsComponent,
        RegisterComponent,
        DialogContentExampleDialog,
        BookingDetailsComponent,
        PaymentGatewayComponent,
        BookingStatusComponent,
        AirportDetailsComponent,
        AboutUsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatTableModule,
        MatCardModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatGridListModule,
        MatDialogModule,
        MatSelectModule,
        MatIconModule,
        MatRadioModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatMenuModule
    ],
    providers: [
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

