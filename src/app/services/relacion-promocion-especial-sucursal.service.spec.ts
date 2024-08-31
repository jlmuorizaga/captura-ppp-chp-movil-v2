import { TestBed } from '@angular/core/testing';

import { RelacionPromocionEspecialSucursalService } from './relacion-promocion-especial-sucursal.service';

describe('RelacionPromocionEspecialSucursalService', () => {
  let service: RelacionPromocionEspecialSucursalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelacionPromocionEspecialSucursalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
