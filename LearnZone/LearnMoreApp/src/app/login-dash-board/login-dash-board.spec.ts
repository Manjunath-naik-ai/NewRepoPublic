import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDashBoard } from './login-dash-board';

describe('LoginDashBoard', () => {
  let component: LoginDashBoard;
  let fixture: ComponentFixture<LoginDashBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginDashBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginDashBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
