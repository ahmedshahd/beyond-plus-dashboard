import { TestBed } from '@angular/core/testing';

import { SubSpecialityService } from './sub-speciality.service';

describe('SubSpecialityService', () => {
  let service: SubSpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubSpecialityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
