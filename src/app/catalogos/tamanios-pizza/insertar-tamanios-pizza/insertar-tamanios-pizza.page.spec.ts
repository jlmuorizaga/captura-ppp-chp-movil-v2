import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertarTamaniosPizzaPage } from './insertar-tamanios-pizza.page';

describe('InsertarTamaniosPizzaPage', () => {
  let component: InsertarTamaniosPizzaPage;
  let fixture: ComponentFixture<InsertarTamaniosPizzaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarTamaniosPizzaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
