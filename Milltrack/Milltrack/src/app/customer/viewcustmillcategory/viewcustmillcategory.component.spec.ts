import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcustmillcategoryComponent } from './viewcustmillcategory.component';

describe('ViewcustmillcategoryComponent', () => {
  let component: ViewcustmillcategoryComponent;
  let fixture: ComponentFixture<ViewcustmillcategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewcustmillcategoryComponent]
    });
    fixture = TestBed.createComponent(ViewcustmillcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
