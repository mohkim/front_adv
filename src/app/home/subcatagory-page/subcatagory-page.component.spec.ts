import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcatagoryPageComponent } from './subcatagory-page.component';

describe('SubcatagoryPageComponent', () => {
  let component: SubcatagoryPageComponent;
  let fixture: ComponentFixture<SubcatagoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcatagoryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcatagoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
