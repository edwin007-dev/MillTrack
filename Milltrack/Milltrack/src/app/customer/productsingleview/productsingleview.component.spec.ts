import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsingleviewComponent } from './productsingleview.component';

describe('ProductsingleviewComponent', () => {
  let component: ProductsingleviewComponent;
  let fixture: ComponentFixture<ProductsingleviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsingleviewComponent]
    });
    fixture = TestBed.createComponent(ProductsingleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
