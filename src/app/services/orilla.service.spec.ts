import { TestBed } from '@angular/core/testing';

import { OrillaService } from './orilla.service';

describe('OrillaService', () => {
  let service: OrillaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrillaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
