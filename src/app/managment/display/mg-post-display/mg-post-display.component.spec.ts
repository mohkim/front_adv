import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgPostDisplayComponent } from './mg-post-display.component';

describe('MgPostDisplayComponent', () => {
  let component: MgPostDisplayComponent;
  let fixture: ComponentFixture<MgPostDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgPostDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgPostDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
