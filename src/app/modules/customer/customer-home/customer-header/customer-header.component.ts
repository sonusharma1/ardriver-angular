import { Component } from '@angular/core';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss']
})
export class CustomerHeaderComponent {

  constructor(private customerService:CustomerService){}

  profileBtnToggle = false;
  onToggleBtnClick(){
    this.profileBtnToggle = !this.profileBtnToggle;
  }

  onToggleContentClick(){
    this.profileBtnToggle = false;
  }


}
