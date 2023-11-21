import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/core/models/ObjectModel';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  totalTrips: number;
  totalCustomer: number;
  driverPercentage: number;
  customerPercentage: number;
  tripsPercentage: number;
  revenuePercentage: number;
  totalDrivers: number;
  totalCurrentYearRevenue: number;

  drivers : Driver[];
  topDrivers : any[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {

    this.adminService.getDashBoardData().subscribe(
      response => {
        this.totalTrips = response.responseData.totalTrips;
        this.totalCustomer = response.responseData.totalCustomer;
        this.driverPercentage = response.responseData.driverPercentage;
        this.customerPercentage = response.responseData.customerPercentage;
        this.tripsPercentage = response.responseData.tripsPercentage;
        this.revenuePercentage = response.responseData.revenuePercentage;
        this.totalDrivers = response.responseData.totalDrivers;
        this.totalCurrentYearRevenue = response.responseData.totalCurrentYearRevenue;
      }
    );

    this.adminService.getTopDrivers().subscribe(
      response => {
        // console.log(response);
        this.topDrivers = response.responseData;
        console.log(this.topDrivers);
      }
    );
  }
}
