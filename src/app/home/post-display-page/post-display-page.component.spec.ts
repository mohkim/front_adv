import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDisplayPageComponent } from './post-display-page.component';

describe('PostDisplayPageComponent', () => {
  let component: PostDisplayPageComponent;
  let fixture: ComponentFixture<PostDisplayPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostDisplayPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDisplayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
