import { Component, OnInit } from '@angular/core';
import { Ride } from 'src/app/core/models/ObjectModel';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {
  // totalTrips = 500;
  currentMonthTrips = 220;
  preMonthTrips = 200;
  tripsPercentage = (this.currentMonthTrips - this.preMonthTrips) * 100 / this.preMonthTrips;

  // totalProfit = 7844554;
  currentMonthProfit = 45000;
  prevMonthProfit = 200000;
  profitPercentage = (this.currentMonthProfit - this.prevMonthProfit) * 100 / this.prevMonthProfit;

  rides: Ride[];

  pageNo: number = 0;
  size: number = 5;
  totalPage = 0;
  currentPageNo = 1;
  pageNoArray: number[] = [];

  startDate: Date;
  endDate: Date;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {

    this.adminService.getTripsAndProfit().subscribe(
      response => {
        console.log(response);
        this.currentMonthTrips = response.responseData.currentMonthTrips;
        this.preMonthTrips = response.responseData.preMonthTrips;
        this.currentMonthProfit = response.responseData.currentMonthProfit;
        this.prevMonthProfit = response.responseData.prevMonthProfit;
        this.tripsPercentage = (this.currentMonthTrips - this.preMonthTrips) * 100 / this.preMonthTrips;
        this.profitPercentage = (this.currentMonthProfit - this.prevMonthProfit) * 100 / this.prevMonthProfit;

      }
    );

    this.getRidesData();
  }

  onSortBtnClick(sortOrder: string, sortColumn: keyof Ride) {
    this.rides.sort((a, b) => {
      const fieldA = a[sortColumn];
      const fieldB = b[sortColumn];

      if (fieldA < fieldB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  getRidesData() {
    this.adminService.getAllRides(
      this.pageNo,
      this.size,
      this.formatDate(new Date(this.startDate).toLocaleDateString()),
      this.formatDate(new Date(this.endDate).toLocaleDateString())
    ).subscribe(
      response => {
        console.log(response);
        this.rides = response.responseData;
        this.totalPage = response.pageable;
        this.pageNoArray = [];
        for (let i = 1; i <= this.totalPage; i++) {
          this.pageNoArray.push(i);
        }
      }
    );
  }

  onPageNoClick(pageNo: number) {
    this.pageNo = pageNo;
    this.getRidesData();
    this.currentPageNo = pageNo + 1;
  }

  onSearchBtnClick() {
    console.log(this.formatDate(new Date(this.startDate).toLocaleDateString()), this.endDate);
    this.getRidesData();
  }

  exportRidesData() {
    let fromDate = this.formatDate(new Date(this.startDate).toLocaleDateString());
    let toDate = this.formatDate(new Date(this.endDate).toLocaleDateString());
    if (fromDate != '' && toDate != '') {
      this.adminService.exportRideData(fromDate, toDate).subscribe((data: Blob) => {
        console.log(data);
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ride-data.xlsx';
        a.click();
      });
    }
    else
      console.error("Invalid Date format");
  }

  formatDate(inputDate: string): string {
    // Split the input date string into components
    const dateComponents = inputDate.split('/');

    // Check if we have three components (month/day/year)
    if (dateComponents.length === 3) {
      const year = dateComponents[2];
      const month = dateComponents[0].padStart(2, '0'); // Ensure zero-padding for single-digit months
      const day = dateComponents[1].padStart(2, '0');   // Ensure zero-padding for single-digit days
      return `${year}-${month}-${day}`;
    } else {
      // console.error('Invalid date format. Expected MM/DD/YYYY.');
      return ''; // Return an empty string or handle the error as needed
    }
  }
}
