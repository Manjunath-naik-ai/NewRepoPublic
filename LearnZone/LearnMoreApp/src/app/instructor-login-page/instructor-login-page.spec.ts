import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorLoginPage } from './instructor-login-page';

describe('InstructorLoginPage', () => {
  let component: InstructorLoginPage;
  let fixture: ComponentFixture<InstructorLoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorLoginPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
