import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationheadFormComponent } from './specificationhead-form.component';

describe('SpecificationheadFormComponent', () => {
  let component: SpecificationheadFormComponent;
  let fixture: ComponentFixture<SpecificationheadFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificationheadFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationheadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
