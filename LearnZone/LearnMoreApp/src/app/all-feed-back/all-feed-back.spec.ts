import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFeedBack } from './all-feed-back';

describe('AllFeedBack', () => {
  let component: AllFeedBack;
  let fixture: ComponentFixture<AllFeedBack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllFeedBack]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFeedBack);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
