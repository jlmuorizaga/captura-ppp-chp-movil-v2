import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriasPpalPage } from './categorias-ppal.page';

describe('CategoriasPpalPage', () => {
  let component: CategoriasPpalPage;
  let fixture: ComponentFixture<CategoriasPpalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasPpalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
