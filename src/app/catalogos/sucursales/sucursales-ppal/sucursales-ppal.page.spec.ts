import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SucursalesPpalPage } from './sucursales-ppal.page';

describe('SucursalesPpalPage', () => {
  let component: SucursalesPpalPage;
  let fixture: ComponentFixture<SucursalesPpalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalesPpalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
