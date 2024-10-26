import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertarIngredientePage } from './insertar-ingrediente.page';

describe('InsertarIngredientePage', () => {
  let component: InsertarIngredientePage;
  let fixture: ComponentFixture<InsertarIngredientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarIngredientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
