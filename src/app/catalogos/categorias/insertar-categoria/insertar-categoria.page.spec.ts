import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertarCategoriaPage } from './insertar-categoria.page';

describe('InsertarCategoriaPage', () => {
  let component: InsertarCategoriaPage;
  let fixture: ComponentFixture<InsertarCategoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
