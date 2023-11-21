import { Injectable, inject } from '@angular/core';
import { CustomerService } from './customer.service';
import { Observable } from 'rxjs';
import { Response } from '../models/ObjectModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  private http = inject(HttpClient);
  baseUrl : string = '';

  constructor(private customerService : CustomerService) {
    this.baseUrl = environment.rideApiUrl;
  }

  getAllCabPrices(srcLocation:string, destLocation:string) : Observable<Response>{
    let params = new HttpParams();
    params = params.append('srcLocation',srcLocation);
    params = params.append('destLocation',destLocation);
    return this.http.get<Response>(this.baseUrl+'getPrices',{params:params});
  }

  bookRide(srcLocation:string, destLocation:string, cabPreference?:string) : Observable<Response>{
    const rideBookingData = {
      'customerId' : this.customerService.loggedInCustomer.customerId,
      'srcLocation' : srcLocation,
      'destLocation' : destLocation,
      'cabPreference':cabPreference
    };
    return this.http.post<Response>(this.baseUrl+'book',rideBookingData);
  }

  sendRideBookingEmail(rideId:number){
    return this.http.post(this.baseUrl+'sendRideBookedEmail/'+rideId,{}).subscribe();
  }
}
