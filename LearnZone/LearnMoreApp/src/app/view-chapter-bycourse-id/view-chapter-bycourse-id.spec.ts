import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChapterBycourseId } from './view-chapter-bycourse-id';

describe('ViewChapterBycourseId', () => {
  let component: ViewChapterBycourseId;
  let fixture: ComponentFixture<ViewChapterBycourseId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewChapterBycourseId]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewChapterBycourseId);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
