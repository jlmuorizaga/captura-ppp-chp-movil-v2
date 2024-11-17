import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertarPizzaPage } from './insertar-pizza.page';

describe('InsertarPizzaPage', () => {
  let component: InsertarPizzaPage;
  let fixture: ComponentFixture<InsertarPizzaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarPizzaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
