import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelacionProductoSucursalPpalPage } from './relacion-producto-sucursal-ppal.page';

describe('RelacionProductoSucursalPpalPage', () => {
  let component: RelacionProductoSucursalPpalPage;
  let fixture: ComponentFixture<RelacionProductoSucursalPpalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacionProductoSucursalPpalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
