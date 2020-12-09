import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyYesNoFormComponent } from './currency-yes-no-form.component';

describe('CurrencyYesNoFormComponent', () => {
  let component: CurrencyYesNoFormComponent;
  let fixture: ComponentFixture<CurrencyYesNoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyYesNoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyYesNoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
