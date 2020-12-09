import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubCatagoryComponent } from './product-sub-catagory.component';

describe('ProductSubCatagoryComponent', () => {
  let component: ProductSubCatagoryComponent;
  let fixture: ComponentFixture<ProductSubCatagoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSubCatagoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSubCatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
