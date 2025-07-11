import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginPage } from './user-login-page';

describe('UserLoginPage', () => {
  let component: UserLoginPage;
  let fixture: ComponentFixture<UserLoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserLoginPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
