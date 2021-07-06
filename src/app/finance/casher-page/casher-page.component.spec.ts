import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasherPageComponent } from './casher-page.component';

describe('CasherPageComponent', () => {
  let component: CasherPageComponent;
  let fixture: ComponentFixture<CasherPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasherPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
