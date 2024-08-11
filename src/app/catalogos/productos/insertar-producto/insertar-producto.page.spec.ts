import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertarProductoPage } from './insertar-producto.page';

describe('InsertarProductoPage', () => {
  let component: InsertarProductoPage;
  let fixture: ComponentFixture<InsertarProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
