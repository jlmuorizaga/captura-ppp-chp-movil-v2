import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarTamaniosPizzaPage } from './editar-tamanios-pizza.page';

describe('EditarTamaniosPizzaPage', () => {
  let component: EditarTamaniosPizzaPage;
  let fixture: ComponentFixture<EditarTamaniosPizzaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTamaniosPizzaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
