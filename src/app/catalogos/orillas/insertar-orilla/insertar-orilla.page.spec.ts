import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertarOrillaPage } from './insertar-orilla.page';

describe('InsertarOrillaPage', () => {
  let component: InsertarOrillaPage;
  let fixture: ComponentFixture<InsertarOrillaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarOrillaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
