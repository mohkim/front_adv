import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgPostListComponent } from './mg-post-list.component';

describe('MgPostListComponent', () => {
  let component: MgPostListComponent;
  let fixture: ComponentFixture<MgPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgPostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
