import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCatagoryFormComponent } from './sub-catagory-form.component';

describe('SubCatagoryFormComponent', () => {
  let component: SubCatagoryFormComponent;
  let fixture: ComponentFixture<SubCatagoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCatagoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCatagoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
