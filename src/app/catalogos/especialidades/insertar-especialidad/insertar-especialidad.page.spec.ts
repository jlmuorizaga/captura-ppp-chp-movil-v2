import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertarEspecialidadPage } from './insertar-especialidad.page';

describe('InsertarEspecialidadPage', () => {
  let component: InsertarEspecialidadPage;
  let fixture: ComponentFixture<InsertarEspecialidadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarEspecialidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
