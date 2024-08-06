import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosPpalPage } from './productos-ppal.page';

describe('ProductosPpalPage', () => {
  let component: ProductosPpalPage;
  let fixture: ComponentFixture<ProductosPpalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosPpalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
