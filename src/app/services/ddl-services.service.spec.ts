import { TestBed } from '@angular/core/testing';

import { DdlServicesService } from './ddl-services.service';

describe('DdlServicesService', () => {
  let service: DdlServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DdlServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
