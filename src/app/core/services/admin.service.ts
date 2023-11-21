import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Car, Response } from '../models/ObjectModel';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);
  baseUrl: string = '';
  driverApiUrl: string = '';
  rideApiUrl:string = '';
  loggedIn = false;

  constructor() {
    this.baseUrl = environment.adminApiUrl;
    this.driverApiUrl = environment.driverApiUrl;
    this.rideApiUrl = environment.rideApiUrl;
  }

  isValidAdmin(username: string, password: string): Observable<Response> {
    let params = new HttpParams();
    params = params.append('username', username);
    params = params.append('password', password);

    let response = this.http.post<Response>(this.baseUrl + 'login', {}, { params: params });
    response.subscribe(
      data => {
        if (data.status) {
          this.loggedIn = true;
        }
      }
    );
    return response;
  }

  getDrivers(filterTxt: string, pageNo: number, size: number): Observable<Response> {
    let params = new HttpParams();
    params = params.append('filterTxt', filterTxt);
    params = params.append('page', pageNo);
    params = params.append('size', size);

    return this.http.get<Response>(this.driverApiUrl + 'findAll', { params: params });
  }

  saveCarDetails(car: any): Observable<Response> {
    return this.http.post<Response>(this.driverApiUrl + 'register', car);
  }

  updateCarDetails(car:Car): Observable<Response> {
    return this.http.put<Response>(this.driverApiUrl + 'update', car);
  }

  findCarByDriverId(driverId:number) : Observable<Response> {
    return this.http.get<Response>(this.driverApiUrl + 'getCar/'+driverId);
  }

  getTripsAndProfit(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + 'getTripsAndProfit');
  }

  getAllRides(page: number, size: number,fromDate: string, toDate: string): Observable<Response> {
    let params = new HttpParams();
    params = params.append('fromDate', fromDate);
    params = params.append('toDate', toDate);
    params = params.append('page', page);
    params = params.append('size', size);

    return this.http.get<Response>(this.baseUrl + 'getAllRides', { params: params });
  }

  exportRideData(fromDate: string, toDate: string) : Observable<Blob> {

    let params = new HttpParams();
    params = params.append('fromDate', fromDate);
    params = params.append('toDate', toDate);

    return this.http.get(this.rideApiUrl + 'export-ride-data?fromDate='+fromDate+'&toDate='+toDate, {
      responseType: 'blob'
    });
  }

  getDashBoardData(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl+'getDashboardData');
  }

  getTopDrivers() : Observable<Response> {
    return this.http.get<Response>(this.baseUrl+'getTopDrives');
  }

  getGraphData() : Observable<Response> {
    return this.http.get<Response>(this.baseUrl+'getGraphData');
  }
}

