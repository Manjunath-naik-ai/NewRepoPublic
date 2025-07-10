import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourse } from './view-course';

describe('ViewCourse', () => {
  let component: ViewCourse;
  let fixture: ComponentFixture<ViewCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCourse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCourse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
