import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MillhomeComponent } from './millhome.component';

describe('MillhomeComponent', () => {
  let component: MillhomeComponent;
  let fixture: ComponentFixture<MillhomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MillhomeComponent]
    });
    fixture = TestBed.createComponent(MillhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
