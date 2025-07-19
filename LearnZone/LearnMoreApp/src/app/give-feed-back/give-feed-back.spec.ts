import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveFeedBack } from './give-feed-back';

describe('GiveFeedBack', () => {
  let component: GiveFeedBack;
  let fixture: ComponentFixture<GiveFeedBack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GiveFeedBack]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiveFeedBack);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
