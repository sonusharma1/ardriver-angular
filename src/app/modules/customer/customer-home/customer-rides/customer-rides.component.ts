import { Component, OnInit } from '@angular/core';
import { Customer, Response, Ride } from 'src/app/core/models/ObjectModel';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-customer-rides',
  templateUrl: './customer-rides.component.html',
  styleUrls: ['./customer-rides.component.scss']
})
export class CustomerRidesComponent implements OnInit {

  customer: Customer;
  rides: Ride[];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {

    // this.customerService.isValidCustomer('palissensie@leaf.com', '1234').subscribe(
    //   data => {
    //     this.customer = this.customerService.loggedInCustomer;
    //     this.customerService.getCustomerRides(this.customerService.loggedInCustomer.customerId).subscribe(
    //       response => {
    //         this.rides = response;
    //         console.log('response', response);
    //       },
    //       errror => {
    //         console.log(errror);
    //       }
    //     );
    //   }
    // );

    this.customer = this.customerService.loggedInCustomer;
    this.customerService.getCustomerRides(this.customerService.loggedInCustomer.customerId).subscribe(
      response => {
        this.rides = response;
        console.log('response', response);
      },
      errror => {
        console.log(errror);
      }
    );
  }

}
