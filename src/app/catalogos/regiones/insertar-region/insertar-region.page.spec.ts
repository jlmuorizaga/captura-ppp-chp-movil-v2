import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertarRegionPage } from './insertar-region.page';

describe('InsertarRegionPage', () => {
  let component: InsertarRegionPage;
  let fixture: ComponentFixture<InsertarRegionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarRegionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
