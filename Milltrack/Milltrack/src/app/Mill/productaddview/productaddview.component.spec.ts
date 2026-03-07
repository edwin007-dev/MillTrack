import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductaddviewComponent } from './productaddview.component';

describe('ProductaddviewComponent', () => {
  let component: ProductaddviewComponent;
  let fixture: ComponentFixture<ProductaddviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductaddviewComponent]
    });
    fixture = TestBed.createComponent(ProductaddviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
