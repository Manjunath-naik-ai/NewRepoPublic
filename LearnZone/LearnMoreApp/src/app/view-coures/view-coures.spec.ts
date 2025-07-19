import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoures } from './view-coures';

describe('ViewCoures', () => {
  let component: ViewCoures;
  let fixture: ComponentFixture<ViewCoures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCoures]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCoures);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
