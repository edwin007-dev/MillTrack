import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryRegistrationComponent } from './subcategoryreg.component';

describe('SubcategoryregComponent', () => {
  let component: SubcategoryRegistrationComponent;
  let fixture: ComponentFixture<SubcategoryRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubcategoryRegistrationComponent]
    });
    fixture = TestBed.createComponent(SubcategoryRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
