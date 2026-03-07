import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcustmillservicesComponent } from './viewcustmillservices.component';

describe('ViewcustmillservicesComponent', () => {
  let component: ViewcustmillservicesComponent;
  let fixture: ComponentFixture<ViewcustmillservicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewcustmillservicesComponent]
    });
    fixture = TestBed.createComponent(ViewcustmillservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
