import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCatagoryListComponent } from './home-catagory-list.component';

describe('HomeCatagoryListComponent', () => {
  let component: HomeCatagoryListComponent;
  let fixture: ComponentFixture<HomeCatagoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCatagoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCatagoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
