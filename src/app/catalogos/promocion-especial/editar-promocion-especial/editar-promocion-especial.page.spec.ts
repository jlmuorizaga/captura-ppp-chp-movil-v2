import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPromocionEspecialPage } from './editar-promocion-especial.page';

describe('EditarPromocionEspecialPage', () => {
  let component: EditarPromocionEspecialPage;
  let fixture: ComponentFixture<EditarPromocionEspecialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPromocionEspecialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
