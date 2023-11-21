import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignupOptionComponent } from './login-signup-option.component';

describe('LoginSignupOptionComponent', () => {
  let component: LoginSignupOptionComponent;
  let fixture: ComponentFixture<LoginSignupOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginSignupOptionComponent]
    });
    fixture = TestBed.createComponent(LoginSignupOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
