import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarTipoProductoPage } from './editar-tipo-producto.page';

describe('EditarTipoProductoPage', () => {
  let component: EditarTipoProductoPage;
  let fixture: ComponentFixture<EditarTipoProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTipoProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
