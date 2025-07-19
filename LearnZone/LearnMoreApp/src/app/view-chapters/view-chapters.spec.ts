import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChapters } from './view-chapters';

describe('ViewChapters', () => {
  let component: ViewChapters;
  let fixture: ComponentFixture<ViewChapters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewChapters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewChapters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
