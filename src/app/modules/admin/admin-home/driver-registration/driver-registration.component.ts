import { Component } from '@angular/core';
import { Car } from 'src/app/core/models/ObjectModel';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-driver-registration',
  templateUrl: './driver-registration.component.html',
  styleUrls: ['./driver-registration.component.scss']
})
export class DriverRegistrationComponent {

  car = {
    licenseNumberPlate: '',
    carType: '',
    latitude: 0,
    longitude: 0,
    driver: {
      driverName: '',
      licenceNo: '',
      email: '',
      mobileNo: '',
      password: ''
    }
  };

  carSavingErrorMsg = false;
  responseErrors: string[];

  constructor(private adminService:AdminService) {
  }

  onSaveBtnClick() {
    this.adminService.saveCarDetails(this.car).subscribe(
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
