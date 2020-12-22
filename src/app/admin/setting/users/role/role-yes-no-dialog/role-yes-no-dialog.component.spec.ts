import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleYesNoDialogComponent } from './role-yes-no-dialog.component';

describe('RoleYesNoDialogComponent', () => {
  let component: RoleYesNoDialogComponent;
  let fixture: ComponentFixture<RoleYesNoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleYesNoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleYesNoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
