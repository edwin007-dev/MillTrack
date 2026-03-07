import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MillComponent } from './mill.component';

describe('MillComponent', () => {
  let component: MillComponent;
  let fixture: ComponentFixture<MillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MillComponent]
    });
    fixture = TestBed.createComponent(MillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
