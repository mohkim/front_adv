import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeReceiptFormComponent } from './deposite-receipt-form.component';

describe('DepositeReceiptFormComponent', () => {
  let component: DepositeReceiptFormComponent;
  let fixture: ComponentFixture<DepositeReceiptFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositeReceiptFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositeReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
