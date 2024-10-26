import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngredientesPpalPage } from './ingredientes-ppal.page';

describe('IngredientesPpalPage', () => {
  let component: IngredientesPpalPage;
  let fixture: ComponentFixture<IngredientesPpalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientesPpalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
