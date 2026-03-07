import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MillviewComponent } from './millview.component';

describe('MillviewComponent', () => {
  let component: MillviewComponent;
  let fixture: ComponentFixture<MillviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MillviewComponent]
    });
    fixture = TestBed.createComponent(MillviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
