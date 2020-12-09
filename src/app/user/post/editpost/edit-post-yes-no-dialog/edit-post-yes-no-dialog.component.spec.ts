import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostYesNoDialogComponent } from './edit-post-yes-no-dialog.component';

describe('EditPostYesNoDialogComponent', () => {
  let component: EditPostYesNoDialogComponent;
  let fixture: ComponentFixture<EditPostYesNoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPostYesNoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPostYesNoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
