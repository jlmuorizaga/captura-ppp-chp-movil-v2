import { TestBed } from '@angular/core/testing';

import { RelacionEtpsService } from './relacion-etps.service';

describe('RelacionEtpsService', () => {
  let service: RelacionEtpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelacionEtpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
