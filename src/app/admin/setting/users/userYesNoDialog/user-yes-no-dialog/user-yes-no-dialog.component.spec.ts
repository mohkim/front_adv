import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserYesNoDialogComponent } from './user-yes-no-dialog.component';

describe('UserYesNoDialogComponent', () => {
  let component: UserYesNoDialogComponent;
  let fixture: ComponentFixture<UserYesNoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserYesNoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserYesNoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
