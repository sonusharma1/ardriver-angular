import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupOptionComponent } from './shared/components/login-signup-option/login-signup-option.component';
import { CustomerLoginComponent } from './modules/customer/customer-login/customer-login.component';
import { CustomerSignUpComponent } from './modules/customer/customer-sign-up/customer-sign-up.component';
import { CustomerHomeComponent } from './modules/customer/customer-home/customer-home.component';
import { RideBookingComponent } from './modules/customer/customer-home/ride-booking/ride-booking.component';
import { CustomerRidesComponent } from './modules/customer/customer-home/customer-rides/customer-rides.component';
import { CustomerProfileComponent } from './modules/customer/customer-home/customer-profile/customer-profile.component';
import { AdminLoginComponent } from './modules/admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './modules/admin/admin-home/admin-home.component';
import { DashboardComponent } from './modules/admin/admin-home/dashboard/dashboard.component';
import { TripsComponent } from './modules/admin/admin-home/trips/trips.component';
import { DriversComponent } from './modules/admin/admin-home/drivers/drivers.component';
import { RidersComponent } from './modules/admin/admin-home/riders/riders.component';
import { DriverRegistrationComponent } from './modules/admin/admin-home/driver-registration/driver-registration.component';

const routes: Routes = [
  { path: 'admin/login', component: AdminLoginComponent },
  {
    path: 'admin/home', component: AdminHomeComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'trips', component: TripsComponent },
      { path: 'drivers', component: DriversComponent },
      { path: 'riders', component: RidersComponent },
      { path: 'driver-registration', component: DriverRegistrationComponent },
    ]
  },

  { path: '', component: LoginSignupOptionComponent },
  { path: 'customer/login', component: CustomerLoginComponent },
  { path: 'customer/signup', component: CustomerSignUpComponent },
  {
    path: 'customer/home', component: CustomerHomeComponent, children: [
      { path: '', component: RideBookingComponent },
      { path: 'book-ride', component: RideBookingComponent },
      { path: 'customer-rides', component: CustomerRidesComponent },
      { path: 'customer-profile', component: CustomerProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
