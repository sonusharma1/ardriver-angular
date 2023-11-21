import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueGraphComponent } from './revenue-graph.component';

describe('RevenueGraphComponent', () => {
  let component: RevenueGraphComponent;
  let fixture: ComponentFixture<RevenueGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevenueGraphComponent]
    });
    fixture = TestBed.createComponent(RevenueGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
