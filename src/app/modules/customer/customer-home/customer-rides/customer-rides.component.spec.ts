import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRidesComponent } from './customer-rides.component';

describe('CustomerRidesComponent', () => {
  let component: CustomerRidesComponent;
  let fixture: ComponentFixture<CustomerRidesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerRidesComponent]
    });
    fixture = TestBed.createComponent(CustomerRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
