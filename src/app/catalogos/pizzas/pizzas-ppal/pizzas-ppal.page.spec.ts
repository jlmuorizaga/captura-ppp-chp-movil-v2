import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PizzasPpalPage } from './pizzas-ppal.page';

describe('PizzasPpalPage', () => {
  let component: PizzasPpalPage;
  let fixture: ComponentFixture<PizzasPpalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzasPpalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
