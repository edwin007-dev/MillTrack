import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmillserviceComponent } from './viewmillservice.component';

describe('ViewmillserviceComponent', () => {
  let component: ViewmillserviceComponent;
  let fixture: ComponentFixture<ViewmillserviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewmillserviceComponent]
    });
    fixture = TestBed.createComponent(ViewmillserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
