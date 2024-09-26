import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertarSucursalPage } from './insertar-sucursal.page';

describe('InsertarSucursalPage', () => {
  let component: InsertarSucursalPage;
  let fixture: ComponentFixture<InsertarSucursalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarSucursalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
