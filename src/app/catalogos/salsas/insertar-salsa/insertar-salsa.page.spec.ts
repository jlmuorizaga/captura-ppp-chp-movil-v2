import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertarSalsaPage } from './insertar-salsa.page';

describe('InsertarSalsaPage', () => {
  let component: InsertarSalsaPage;
  let fixture: ComponentFixture<InsertarSalsaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarSalsaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
