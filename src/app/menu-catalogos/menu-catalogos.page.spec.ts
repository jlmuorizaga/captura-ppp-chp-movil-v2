import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuCatalogosPage } from './menu-catalogos.page';

describe('MenuCatalogosPage', () => {
  let component: MenuCatalogosPage;
  let fixture: ComponentFixture<MenuCatalogosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCatalogosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
