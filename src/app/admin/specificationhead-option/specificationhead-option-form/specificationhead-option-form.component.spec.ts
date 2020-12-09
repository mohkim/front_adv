import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationheadOptionFormComponent } from './specificationhead-option-form.component';

describe('SpecificationheadOptionFormComponent', () => {
  let component: SpecificationheadOptionFormComponent;
  let fixture: ComponentFixture<SpecificationheadOptionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificationheadOptionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationheadOptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
