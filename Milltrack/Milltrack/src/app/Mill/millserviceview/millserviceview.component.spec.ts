import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MillserviceviewComponent } from './millserviceview.component';

describe('MillserviceviewComponent', () => {
  let component: MillserviceviewComponent;
  let fixture: ComponentFixture<MillserviceviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MillserviceviewComponent]
    });
    fixture = TestBed.createComponent(MillserviceviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
