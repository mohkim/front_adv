import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostDisplayComponent } from './user-post-display.component';

describe('UserPostDisplayComponent', () => {
  let component: UserPostDisplayComponent;
  let fixture: ComponentFixture<UserPostDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPostDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPostDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
