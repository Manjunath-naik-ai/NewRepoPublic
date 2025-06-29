import { TestBed } from '@angular/core/testing';

import { Lmservices } from './lmservices';

describe('Lmservices', () => {
  let service: Lmservices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lmservices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
