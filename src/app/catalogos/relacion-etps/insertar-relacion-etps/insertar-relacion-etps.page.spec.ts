import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertarRelacionEtpsPage } from './insertar-relacion-etps.page';

describe('InsertarRelacionEtpsPage', () => {
  let component: InsertarRelacionEtpsPage;
  let fixture: ComponentFixture<InsertarRelacionEtpsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarRelacionEtpsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
