import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmillComponent } from './viewmill.component';

describe('ViewmillComponent', () => {
  let component: ViewmillComponent;
  let fixture: ComponentFixture<ViewmillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewmillComponent]
    });
    fixture = TestBed.createComponent(ViewmillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
