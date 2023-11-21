import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginSignupOptionComponent } from './shared/components/login-signup-option/login-signup-option.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerLoginComponent } from './modules/customer/customer-login/customer-login.component';
import { CustomerSignUpComponent } from './modules/customer/customer-sign-up/customer-sign-up.component';
import { CustomerHomeModule } from './modules/customer/customer-home/customer-home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminLoginComponent } from './modules/admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './modules/admin/admin-home/admin-home.component';
import { AdminNavbarComponent } from './modules/admin/admin-home/admin-navbar/admin-navbar.component';
import { DashboardComponent } from './modules/admin/admin-home/dashboard/dashboard.component';
import { TripsComponent } from './modules/admin/admin-home/trips/trips.component';
import { DriversComponent } from './modules/admin/admin-home/drivers/drivers.component';
import { RidersComponent } from './modules/admin/admin-home/riders/riders.component';
import { DriverRegistrationComponent } from './modules/admin/admin-home/driver-registration/driver-registration.component';
import { RevenueGraphComponent } from './modules/admin/admin-home/dashboard/revenue-graph/revenue-graph.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginSignupOptionComponent,
    CustomerLoginComponent,
    CustomerSignUpComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminNavbarComponent,
    DashboardComponent,
    TripsComponent,
    DriversComponent,
    RidersComponent,
    DriverRegistrationComponent,
    RevenueGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CustomerHomeModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
