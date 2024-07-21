import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarRegionPage } from './editar-region.page';

describe('EditarRegionPage', () => {
  let component: EditarRegionPage;
  let fixture: ComponentFixture<EditarRegionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRegionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
