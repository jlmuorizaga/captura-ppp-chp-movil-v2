import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPizzaPage } from './editar-pizza.page';

describe('EditarPizzaPage', () => {
  let component: EditarPizzaPage;
  let fixture: ComponentFixture<EditarPizzaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPizzaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
