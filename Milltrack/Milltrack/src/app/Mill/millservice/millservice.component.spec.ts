import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MillserviceComponent } from './millservice.component';

describe('MillserviceComponent', () => {
  let component: MillserviceComponent;
  let fixture: ComponentFixture<MillserviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MillserviceComponent]
    });
    fixture = TestBed.createComponent(MillserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
