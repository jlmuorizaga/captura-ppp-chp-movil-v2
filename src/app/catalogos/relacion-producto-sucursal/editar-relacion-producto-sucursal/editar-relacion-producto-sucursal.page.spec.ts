import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarRelacionProductoSucursalPage } from './editar-relacion-producto-sucursal.page';

describe('EditarRelacionProductoSucursalPage', () => {
  let component: EditarRelacionProductoSucursalPage;
  let fixture: ComponentFixture<EditarRelacionProductoSucursalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRelacionProductoSucursalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
