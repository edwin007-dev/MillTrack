import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MillmasterComponent } from './millmaster.component';

describe('MillmasterComponent', () => {
  let component: MillmasterComponent;
  let fixture: ComponentFixture<MillmasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MillmasterComponent]
    });
    fixture = TestBed.createComponent(MillmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
