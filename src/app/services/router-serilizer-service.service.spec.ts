import { TestBed } from '@angular/core/testing';
import { RouteSerializerService } from './router-serializer-service.service';

describe('RouterSerilizerServiceService', () => {
  let service: RouteSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
