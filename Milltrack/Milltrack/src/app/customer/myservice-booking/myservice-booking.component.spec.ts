import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyserviceBookingComponent } from './myservice-booking.component';

describe('MyserviceBookingComponent', () => {
  let component: MyserviceBookingComponent;
  let fixture: ComponentFixture<MyserviceBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyserviceBookingComponent]
    });
    fixture = TestBed.createComponent(MyserviceBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
