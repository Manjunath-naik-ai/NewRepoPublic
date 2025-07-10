import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllUser } from './view-all-user';

describe('ViewAllUser', () => {
  let component: ViewAllUser;
  let fixture: ComponentFixture<ViewAllUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
