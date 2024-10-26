import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarIngredientePage } from './editar-ingrediente.page';

describe('EditarIngredientePage', () => {
  let component: EditarIngredientePage;
  let fixture: ComponentFixture<EditarIngredientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarIngredientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
