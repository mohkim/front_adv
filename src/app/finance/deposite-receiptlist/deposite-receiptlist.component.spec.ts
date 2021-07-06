import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeReceiptlistComponent } from './deposite-receiptlist.component';

describe('DepositeReceiptlistComponent', () => {
  let component: DepositeReceiptlistComponent;
  let fixture: ComponentFixture<DepositeReceiptlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositeReceiptlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositeReceiptlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
