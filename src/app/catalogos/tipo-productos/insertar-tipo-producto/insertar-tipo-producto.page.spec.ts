import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertarTipoProductoPage } from './insertar-tipo-producto.page';

describe('InsertarTipoProductoPage', () => {
  let component: InsertarTipoProductoPage;
  let fixture: ComponentFixture<InsertarTipoProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarTipoProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
