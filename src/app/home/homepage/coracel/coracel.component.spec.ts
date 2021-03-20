import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoracelComponent } from './coracel.component';

describe('CoracelComponent', () => {
  let component: CoracelComponent;
  let fixture: ComponentFixture<CoracelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoracelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoracelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
