import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestPostSectionComponent } from './latest-post-section.component';

describe('LatestPostSectionComponent', () => {
  let component: LatestPostSectionComponent;
  let fixture: ComponentFixture<LatestPostSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestPostSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestPostSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
