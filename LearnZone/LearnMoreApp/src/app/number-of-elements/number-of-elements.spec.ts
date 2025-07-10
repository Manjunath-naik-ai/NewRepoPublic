import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfElements } from './number-of-elements';

describe('NumberOfElements', () => {
  let component: NumberOfElements;
  let fixture: ComponentFixture<NumberOfElements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumberOfElements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberOfElements);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
