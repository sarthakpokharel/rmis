import { TestBed } from '@angular/core/testing';

import { LandTypeService } from './land-type.service';

describe('LandTypeService', () => {
  let service: LandTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
