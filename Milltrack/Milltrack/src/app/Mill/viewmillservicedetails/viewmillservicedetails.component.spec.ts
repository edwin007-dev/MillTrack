import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmillservicedetailsComponent } from './viewmillservicedetails.component';

describe('ViewmillservicedetailsComponent', () => {
  let component: ViewmillservicedetailsComponent;
  let fixture: ComponentFixture<ViewmillservicedetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewmillservicedetailsComponent]
    });
    fixture = TestBed.createComponent(ViewmillservicedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
