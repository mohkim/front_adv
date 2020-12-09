import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationheadOptionYesNoDialogComponent } from './specificationhead-option-yes-no-dialog.component';

describe('SpecificationheadOptionYesNoDialogComponent', () => {
  let component: SpecificationheadOptionYesNoDialogComponent;
  let fixture: ComponentFixture<SpecificationheadOptionYesNoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificationheadOptionYesNoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationheadOptionYesNoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
