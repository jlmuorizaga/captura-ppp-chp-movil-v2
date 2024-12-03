import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertarRelacionProductoSucursalPage } from './insertar-relacion-producto-sucursal.page';

describe('InsertarRelacionProductoSucursalPage', () => {
  let component: InsertarRelacionProductoSucursalPage;
  let fixture: ComponentFixture<InsertarRelacionProductoSucursalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarRelacionProductoSucursalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
