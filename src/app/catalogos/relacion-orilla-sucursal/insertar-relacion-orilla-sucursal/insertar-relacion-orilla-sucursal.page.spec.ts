import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertarRelacionOrillaSucursalPage } from './insertar-relacion-orilla-sucursal.page';

describe('InsertarRelacionOrillaSucursalPage', () => {
  let component: InsertarRelacionOrillaSucursalPage;
  let fixture: ComponentFixture<InsertarRelacionOrillaSucursalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarRelacionOrillaSucursalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
