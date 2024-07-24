import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarEspecialidadPage } from './editar-especialidad.page';

describe('EditarEspecialidadPage', () => {
  let component: EditarEspecialidadPage;
  let fixture: ComponentFixture<EditarEspecialidadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEspecialidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
