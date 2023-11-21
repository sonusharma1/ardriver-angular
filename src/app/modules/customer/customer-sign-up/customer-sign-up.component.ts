import { Component,inject } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, Response } from 'src/app/core/models/ObjectModel';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-customer-sign-up',
  templateUrl: './customer-sign-up.component.html',
  styleUrls: ['./customer-sign-up.component.scss']
})
export class CustomerSignUpComponent {

  private customerService=inject(CustomerService);
  private router=inject(Router);
  customer:Customer = new Customer();
  response:Response;

  onCreateAccountBtnClick(): void {

    if (this.customer?.customerName === undefined || this.customer?.email === undefined || this.customer?.mobileNo === undefined || this.customer?.password === undefined) {
      this.response = {
        status: false,
        errorMessages: ["All fields are required!!"],
        responseData: [],
        pageable:0
      };
      console.log("ERORRRRRRRRRR");
    }
    else {
      console.log(this.customer);
      this.customerService.registerCustomer(this.customer).subscribe(
        response => {
          this.response = response;
          if (response.status) {
            this.router.navigate(['/customer/login']);
          }
        },
        error => {
          this.response = error.error;
          console.log(this.response);
        }
      );
      // this.customer = new Customer();
    }

    setTimeout(
      () => {
        this.response = {
          status: true,
          errorMessages: [],
          responseData: [],
          pageable:0
        };
      }
      , 5000
    );
  }
}
