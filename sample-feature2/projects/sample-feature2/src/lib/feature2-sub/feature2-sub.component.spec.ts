import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feature2SubComponent } from './feature2-sub.component';

describe('Feature2SubComponent', () => {
  let component: Feature2SubComponent;
  let fixture: ComponentFixture<Feature2SubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Feature2SubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Feature2SubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
