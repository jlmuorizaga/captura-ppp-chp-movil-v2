import { TestBed } from '@angular/core/testing';

import { RelacionOrillaSucursalService } from './relacion-orilla-sucursal.service';

describe('RelacionOrillaSucursalService', () => {
  let service: RelacionOrillaSucursalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelacionOrillaSucursalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
