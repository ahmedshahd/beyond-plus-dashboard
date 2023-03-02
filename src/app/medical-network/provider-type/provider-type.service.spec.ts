import { TestBed } from '@angular/core/testing';

import { ProviderTypeService } from './provider-type.service';

describe('ProviderTypeService', () => {
  let service: ProviderTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
