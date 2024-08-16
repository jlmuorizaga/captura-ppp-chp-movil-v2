import { TestBed } from '@angular/core/testing';

import { SalsaService } from './salsa.service';

describe('SalsaService', () => {
  let service: SalsaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalsaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
