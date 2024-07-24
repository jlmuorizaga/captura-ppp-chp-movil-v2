import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EspecialidadesPpalPage } from './especialidades-ppal.page';

describe('EspecialidadesPpalPage', () => {
  let component: EspecialidadesPpalPage;
  let fixture: ComponentFixture<EspecialidadesPpalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadesPpalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
