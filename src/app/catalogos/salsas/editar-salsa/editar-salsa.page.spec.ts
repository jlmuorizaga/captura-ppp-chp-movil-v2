import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarSalsaPage } from './editar-salsa.page';

describe('EditarSalsaPage', () => {
  let component: EditarSalsaPage;
  let fixture: ComponentFixture<EditarSalsaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSalsaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
