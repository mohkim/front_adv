import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostDisplayComponent } from './admin-post-display.component';

describe('AdminPostDisplayComponent', () => {
  let component: AdminPostDisplayComponent;
  let fixture: ComponentFixture<AdminPostDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPostDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPostDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
