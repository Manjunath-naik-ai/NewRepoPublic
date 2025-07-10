import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInstructor } from './view-instructor';

describe('ViewInstructor', () => {
  let component: ViewInstructor;
  let fixture: ComponentFixture<ViewInstructor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewInstructor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInstructor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
