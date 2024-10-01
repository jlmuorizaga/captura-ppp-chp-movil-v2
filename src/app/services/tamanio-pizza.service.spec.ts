import { TestBed } from '@angular/core/testing';

import { TamanioPizzaService } from './tamanio-pizza.service';

describe('TamanioPizzaService', () => {
  let service: TamanioPizzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TamanioPizzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
