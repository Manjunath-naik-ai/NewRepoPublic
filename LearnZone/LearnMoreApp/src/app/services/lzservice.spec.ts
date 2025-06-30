import { TestBed } from '@angular/core/testing';

import { Lzservice } from './lzservice';

describe('Lzservice', () => {
  let service: Lzservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lzservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
