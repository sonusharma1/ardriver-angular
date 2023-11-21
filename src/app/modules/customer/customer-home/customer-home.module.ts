import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHomeComponent } from './customer-home.component';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { RideBookingComponent } from './ride-booking/ride-booking.component';
import { CustomerRidesComponent } from './customer-rides/customer-rides.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerHeaderComponent,
    RideBookingComponent,
    CustomerRidesComponent,
    CustomerProfileComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    MatTabsModule,
  ],
  exports:[
    CustomerHomeComponent
  ]
})
export class CustomerHomeModule { }
