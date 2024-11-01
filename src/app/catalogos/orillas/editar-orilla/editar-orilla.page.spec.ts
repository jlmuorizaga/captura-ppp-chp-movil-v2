import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarOrillaPage } from './editar-orilla.page';

describe('EditarOrillaPage', () => {
  let component: EditarOrillaPage;
  let fixture: ComponentFixture<EditarOrillaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarOrillaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
