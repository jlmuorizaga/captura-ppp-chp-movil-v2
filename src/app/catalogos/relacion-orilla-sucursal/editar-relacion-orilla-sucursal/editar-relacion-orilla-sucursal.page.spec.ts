import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarRelacionOrillaSucursalPage } from './editar-relacion-orilla-sucursal.page';

describe('EditarRelacionOrillaSucursalPage', () => {
  let component: EditarRelacionOrillaSucursalPage;
  let fixture: ComponentFixture<EditarRelacionOrillaSucursalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRelacionOrillaSucursalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
