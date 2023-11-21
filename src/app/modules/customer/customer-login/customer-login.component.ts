import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss']
})
export class CustomerLoginComponent {

  email:string='';
  password:string = '';
  isRegisteredCustomer:boolean;

  constructor(private customerService:CustomerService, private router:Router) {}

  onLoginBtnClick() {
    console.log(this.email,this.password)
    this.customerService.isValidCustomer(this.email,this.password).subscribe(
      response => {
        if (response.status) {
          this.router.navigate(['/customer/home','book-ride'])
        }
      },
      errror => {
        this.isRegisteredCustomer = errror.error.status;
        console.log(errror.error)
      }
    );

  }
}
