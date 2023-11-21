import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/core/models/ObjectModel';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {

  @HostBinding('@.disabled')
  public animationsDisabled = true;

  customer: Customer;
  customerUpdateErrorMsg = false;
  responseErrors: string[];

  oldPassword: string;
  newPassword: string;
  passwordUpdateErrorMsg = false;

  constructor(private customerService: CustomerService, private router : Router) { }

  ngOnInit(): void {
    this.customer = this.customerService.loggedInCustomer;
    console.log(this.customer);

    // this.customerService.isValidCustomer('palissensie@leaf.com', '1234').subscribe(
    //   data => {
    //     this.customer = this.customerService.loggedInCustomer;
    //   }
    // );
  }

  onSaveBtnClick() {
    this.customerService.updateCustomer(this.customer).subscribe(
      response => {
        if (response.status) {
          this.customerUpdateErrorMsg = false;
          alert("Details saved successfully");
          this.responseErrors = [];
        }
      },
      error => {
        console.log(error);
        this.customerUpdateErrorMsg = true;
        this.responseErrors = error.error.errorMessages;
      }
    );
  }

  onChangePasswordBtnClick() {
    this.customerService.updatePassword(this.oldPassword, this.newPassword).subscribe(
      response => {
        console.log(response);
        if (response.status) {
          this.customerUpdateErrorMsg = false;
          alert("Details saved successfully");
          this.oldPassword = '';
          this.newPassword = '';
          this.responseErrors = [];
        }
        else {
          this.passwordUpdateErrorMsg = true;
          this.responseErrors = response.errorMessages;
        }
      },
      error => {
        console.log(error.error.errorMessages);
        this.passwordUpdateErrorMsg = true;
        this.responseErrors = error.error.errorMessages;
      }
    );
  }

  onDeleteBtnClick() {
    this.customerService.deleteCustomerAccount().subscribe(
      response => {
        if (response.status) {
          alert('Your account has been deleted!')
          this.router.navigate(['']);
        }
      }
    );
  }
}
