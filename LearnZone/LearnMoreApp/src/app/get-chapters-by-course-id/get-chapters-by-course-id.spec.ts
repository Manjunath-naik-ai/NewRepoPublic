import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetChaptersByCourseId } from './get-chapters-by-course-id';

describe('GetChaptersByCourseId', () => {
  let component: GetChaptersByCourseId;
  let fixture: ComponentFixture<GetChaptersByCourseId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetChaptersByCourseId]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetChaptersByCourseId);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
