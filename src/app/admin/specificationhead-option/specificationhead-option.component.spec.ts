import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationheadOptionComponent } from './specificationhead-option.component';

describe('SpecificationheadOptionComponent', () => {
  let component: SpecificationheadOptionComponent;
  let fixture: ComponentFixture<SpecificationheadOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificationheadOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationheadOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
