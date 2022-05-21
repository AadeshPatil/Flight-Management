import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    PATH_OF_API = 'http://localhost:9090';
    PATH_OF_USER_SERVICE_API = ''
    PATH_OF_FLIGHT_DETAILS_API = 'http://localhost:8080/flights/'
    PATH_OF_PASSENGER_DETAILS_API = 'http://localhost:8081/passengers/'
    PATH_OF_BOOKING_API = 'http://localhost:8000/booking/'
    PATH_OF_AIRPORT_API = 'http://localhost:9000/airport/'

    requestHeader = new HttpHeaders({ 'No-Auth': 'True', responseType: 'text' });
    constructor(
        private httpclient: HttpClient,
        private userAuthService: UserAuthService
    ) { }

    public login(loginData: any) {
        return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
            headers: this.requestHeader,
        });
    }

    public forUser() {
        return this.httpclient.get(this.PATH_OF_API + '/forUser', {
            responseType: 'text',
        });
    }


    public forAdmin() {
        return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
            responseType: 'text',
        });
    }

    public roleMatch(allowedRoles: string | any[]) {
        let isMatch = false;
        const userRoles: any = this.userAuthService.getRoles();
        if (userRoles != null && userRoles) {
            for (let i = 0; i < userRoles.length; i++) {
                for (let j = 0; j < allowedRoles.length; j++) {
                    if (userRoles[i].roleName === allowedRoles[j]) {
                        isMatch = true;
                    }
                }
            }
        }
        return isMatch;
    }

    public addUser(userData: any) {
        return this.httpclient.post(this.PATH_OF_API + '/registerNewUser', userData, {
            headers: this.requestHeader,
        });
    }

    public getFlights() {
        return this.httpclient.get(this.PATH_OF_FLIGHT_DETAILS_API, {
            headers: this.requestHeader
        });
    }

    public addFlight(flightData: any) {
        return this.httpclient.post(this.PATH_OF_FLIGHT_DETAILS_API, flightData, {
            headers: this.requestHeader
        });
    }

    public deleteFlight(data: String) {
        return this.httpclient.delete(this.PATH_OF_FLIGHT_DETAILS_API + 'delete/' + data, {
            headers: this.requestHeader
        });
    }

    public getAirports() {
        return this.httpclient.get(this.PATH_OF_AIRPORT_API + 'allAirport', {
            headers: this.requestHeader
        });
    }

    public deleteAirport(data: String) {
        return this.httpclient.delete(this.PATH_OF_AIRPORT_API + 'deleteAirport/' + data, {
            headers: this.requestHeader
        });
    }

    public addPassenger(passengerData: any) {
        return this.httpclient.post(this.PATH_OF_PASSENGER_DETAILS_API, passengerData, {
            headers: this.requestHeader
        });
    }

    public addNewBooking(bookingData: any) {
        return this.httpclient.post(this.PATH_OF_BOOKING_API + 'createBooking', bookingData, {
            headers: this.requestHeader
        });
    }

    public searchFlight(flightData: any) {
        let params = new HttpParams()
            .set('source', flightData.source)
            .set('destination', flightData.destination);
        return this.httpclient.get(this.PATH_OF_FLIGHT_DETAILS_API + 'std', { params: params });
    }
}
