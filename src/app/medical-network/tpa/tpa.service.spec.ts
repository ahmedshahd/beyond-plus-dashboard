import { TestBed } from '@angular/core/testing';

import { TpaService } from './tpa.service';

describe('TpaService', () => {
  let service: TpaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TpaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
