import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagoryYesNoComponent } from './catagory-yes-no.component';

describe('CatagoryYesNoComponent', () => {
  let component: CatagoryYesNoComponent;
  let fixture: ComponentFixture<CatagoryYesNoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatagoryYesNoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatagoryYesNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
