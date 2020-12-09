import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationheadComponent } from './specificationhead.component';

describe('SpecificationheadComponent', () => {
  let component: SpecificationheadComponent;
  let fixture: ComponentFixture<SpecificationheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificationheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
