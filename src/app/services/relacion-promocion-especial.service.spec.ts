import { TestBed } from '@angular/core/testing';

import { RelacionPromocionEspecialService } from './relacion-promocion-especial.service';

describe('RelacionPromocionEspecialService', () => {
  let service: RelacionPromocionEspecialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelacionPromocionEspecialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
