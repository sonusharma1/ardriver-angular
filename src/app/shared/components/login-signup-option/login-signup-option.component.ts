import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup-option',
  templateUrl: './login-signup-option.component.html',
  styleUrls: ['./login-signup-option.component.scss']
})
export class LoginSignupOptionComponent {

  private router = inject(Router);
  loginOption = true;

  onLoginBtnClick() {
    this.loginOption = true;
  }
  onSignupBtnClick() {
    this.loginOption = false;
  }

  onCustomerLoginBtnClick() {
    this.router.navigate(['/customer/login']);
  }

  onCustomerSignupBtnClick() {
    this.router.navigate(['/customer/signup']);
  }
  onPartnerLoginBtnClick() {

  }
  onPartnerSignupBtnClick() {

  }

}
