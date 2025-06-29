import { TestBed } from '@angular/core/testing';

import { Lernmore } from './lernmore';

describe('Lernmore', () => {
  let service: Lernmore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lernmore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
