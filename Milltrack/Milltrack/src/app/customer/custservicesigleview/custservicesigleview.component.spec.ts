import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustservicesigleviewComponent } from './custservicesigleview.component';

describe('CustservicesigleviewComponent', () => {
  let component: CustservicesigleviewComponent;
  let fixture: ComponentFixture<CustservicesigleviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustservicesigleviewComponent]
    });
    fixture = TestBed.createComponent(CustservicesigleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
