import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TamaniosPizzaPpalPage } from './tamanios-pizza-ppal.page';

describe('TamaniosPizzaPpalPage', () => {
  let component: TamaniosPizzaPpalPage;
  let fixture: ComponentFixture<TamaniosPizzaPpalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TamaniosPizzaPpalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
