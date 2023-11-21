import { Component, OnInit } from '@angular/core';
import { Car, Driver } from 'src/app/core/models/ObjectModel';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {

  drivers: Driver[];
  filterTxt = '';
  pageNo: number = 0;
  size: number = 5;
  totalPage = 0;
  currentPageNo = 1;
  pageNoArray:number[] = [];

  car : Car;
  isEditBtnClick = false;

  carSavingErrorMsg = false;
  responseErrors: string[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getDriversData();
  }

  getDriversData() {
    this.adminService.getDrivers(this.filterTxt, this.pageNo, this.size).subscribe(
      response => {
        this.drivers = response.responseData;
        this.totalPage = response.pageable;
        this.pageNoArray = [];
        for(let i = 1; i <= this.totalPage; i++) {
          this.pageNoArray.push(i);
        }
        console.log(response);
      }
    );
  }

  onSerachBtnClick() {
    this.getDriversData();
  }

  onSortBtnClick(sortOrder: string, sortColumn: keyof Driver) {
    this.drivers.sort((a, b) => {
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

  onPageNoClick(pageNo:number) {
    this.pageNo = pageNo;
    this.getDriversData();
    this.currentPageNo = pageNo+1;
  }

  onCloseBtnClick(){
    this.isEditBtnClick = false;
  }

  onEditBtnClick(driverId:number) {
    this.adminService.findCarByDriverId(driverId).subscribe(
      response => {
        if (response.status) {
          this.car = response.responseData;
          this.isEditBtnClick = true;
        }
      }
    );
  }

  onSaveBtnClick() {
    this.adminService.updateCarDetails(this.car).subscribe(
      response => {
        if (response.status) {
          this.carSavingErrorMsg = false;
          alert("Details saved successfully");
          this.responseErrors = [];
        }
      },
      error => {
        console.log(error);
        this.carSavingErrorMsg = true;
        this.responseErrors = error.error.errorMessages;
      }
    );
  }
}
