import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostImageDialogComponent } from './post-image-dialog.component';

describe('PostImageDialogComponent', () => {
  let component: PostImageDialogComponent;
  let fixture: ComponentFixture<PostImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostImageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
