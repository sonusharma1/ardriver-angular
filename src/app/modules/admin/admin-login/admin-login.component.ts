import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {

  constructor(private adminService : AdminService, private router : Router) {}

  username = '';
  password = '';
  errorMsg = false;

  onLoginBtnClick() {
    this.adminService.isValidAdmin(this.username,this.password).subscribe(
      response => {
        if (response.status) {
          this.router.navigate(['/admin/home']);
        }
        else{
          this.errorMsg = true;
        }
      },
      error => {
        console.log(error);
        this.errorMsg = true;
      }
    );
  }
}
