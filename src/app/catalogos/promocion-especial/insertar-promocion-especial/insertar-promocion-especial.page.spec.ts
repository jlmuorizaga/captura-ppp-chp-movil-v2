import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertarPromocionEspecialPage } from './insertar-promocion-especial.page';

describe('InsertarPromocionEspecialPage', () => {
  let component: InsertarPromocionEspecialPage;
  let fixture: ComponentFixture<InsertarPromocionEspecialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarPromocionEspecialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
