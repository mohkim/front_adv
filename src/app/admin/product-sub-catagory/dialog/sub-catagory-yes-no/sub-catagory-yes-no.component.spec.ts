import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCatagoryYesNoComponent } from './sub-catagory-yes-no.component';

describe('SubCatagoryYesNoComponent', () => {
  let component: SubCatagoryYesNoComponent;
  let fixture: ComponentFixture<SubCatagoryYesNoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCatagoryYesNoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCatagoryYesNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
