import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MillservicedetailsComponent } from './millservicedetails.component';

describe('MillservicedetailsComponent', () => {
  let component: MillservicedetailsComponent;
  let fixture: ComponentFixture<MillservicedetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MillservicedetailsComponent]
    });
    fixture = TestBed.createComponent(MillservicedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
