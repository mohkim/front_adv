import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationheadYesNoDialogComponent } from './specificationhead-yes-no-dialog.component';

describe('SpecificationheadYesNoDialogComponent', () => {
  let component: SpecificationheadYesNoDialogComponent;
  let fixture: ComponentFixture<SpecificationheadYesNoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificationheadYesNoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationheadYesNoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
