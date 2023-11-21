import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Location, Locations } from 'src/app/core/services/Locations';
import { CustomerService } from 'src/app/core/services/customer.service';
import { RideService } from 'src/app/core/services/ride.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-ride-booking',
  templateUrl: './ride-booking.component.html',
  styleUrls: ['./ride-booking.component.scss']
})
export class RideBookingComponent implements OnInit{

  srcLocation = '';
  destLocation = '';
  isSearchedBtnClick = false;
  cabPrices: any;
  selectedCab = '';

  srcLocationControl = new FormControl('');
  destLocationControl = new FormControl('');
  locations = Locations;
  srcLocationFilter: Observable<Location[]>;
  destLocationFilter: Observable<Location[]>;

  constructor(private rideService: RideService, private router: Router) {  }

  ngOnInit(): void {
    this.srcLocationFilter = this.srcLocationControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.destLocationFilter = this.destLocationControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): Location[] {
    const filterValue = value.toLowerCase();
    return this.locations.filter(option => option.address.toLowerCase().includes(filterValue));
  }

  onSearchBtnClick() {
    let srclocation = this.locations.find(location => location.address == this.srcLocationControl.value)?.geoLocation;
    let destlocation = this.locations.find(location => location.address == this.destLocationControl.value)?.geoLocation;

    this.rideService.getAllCabPrices(srclocation?srclocation:'', destlocation?destlocation:'').subscribe(
      data => {
        this.isSearchedBtnClick = data.status;
        this.cabPrices = data.responseData;
      },
      error => {
        this.isSearchedBtnClick = false;
        console.log(error.error);
      }
    );
  }

  onBookNowBtnClick() {

    let srclocation = this.locations.find(location => location.address == this.srcLocationControl.value)?.geoLocation;
    let destlocation = this.locations.find(location => location.address == this.destLocationControl.value)?.geoLocation;

    this.rideService.bookRide(srclocation?srclocation:'', destlocation?destlocation:'').subscribe(
      data => {
        if (data.status) {
          this.srcLocation = '';
          this.destLocation = '';
          this.isSearchedBtnClick = false;
          alert("Ride Booked successfuly")
          // this.rideService.sendRideBookingEmail(data.responseData.rideId);
          this.router.navigate(['/customer/home/customer-rides']);
        }
        else
          console.log(data);
      }
    );
  }

  onCabPriceDivClick(rideName:string){
    this.selectedCab = rideName;
  }
}
