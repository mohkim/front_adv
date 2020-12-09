import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationYesNoFormComponent } from './location-yes-no-form.component';

describe('LocationYesNoFormComponent', () => {
  let component: LocationYesNoFormComponent;
  let fixture: ComponentFixture<LocationYesNoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationYesNoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationYesNoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
