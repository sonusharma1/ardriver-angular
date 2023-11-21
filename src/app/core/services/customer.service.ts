import { Injectable, inject } from '@angular/core';
import { Customer, Response, Ride } from '../models/ObjectModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private http = inject(HttpClient);
  baseUrl : string = '';
  response :Response;
  loggedInCustomer :Customer;

  constructor(private storageService:LocalStorageService) {
    this.baseUrl = environment.customerApiUrl;
   }

  registerCustomer(customer : Customer) : Observable<Response> {
    return this.http.post<Response>(this.baseUrl+'register',customer);
  }

  isValidCustomer(email:string, password:string) : Observable<Response> {
    let params = new HttpParams();
    params = params.append('email',email);
    params = params.append('password',password);
    let response = this.http.post<Response>(this.baseUrl+'login',{},{params:params});
    response.subscribe(
      data => {
        this.response = data
        if (this.response.status) {
          this.loggedInCustomer = this.response.responseData;
          this.storageService.storeItem('customer',JSON.stringify(this.response.responseData))
        }
      }
    );
    return response;
  }

  getCustomerRides(customerId:number) : Observable<Ride[]> {
    return this.http.get<Ride[]>(this.baseUrl+'rides/'+customerId);
  }

  updateCustomer(customer:Customer) : Observable<Response> {
    return this.http.put<Response>(this.baseUrl+'update', customer);
  }

  updatePassword(oldPassword:string, newPassword:string) : Observable<Response>{
    // let loggedCustomer = JSON.parse(this.storageService.getItem('customer'));
    const passwordData = {
      'customerId' : this.loggedInCustomer.customerId,
      'oldPassword' : oldPassword,
      'newPassword' : newPassword,
    };
    return this.http.post<Response>(this.baseUrl+'updatePassword',passwordData);
  }

  deleteCustomerAccount() {
    return this.http.delete<Response>(this.baseUrl+'delete/'+this.loggedInCustomer.customerId);
  }
}
