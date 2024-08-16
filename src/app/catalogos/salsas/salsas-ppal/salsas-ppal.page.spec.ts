import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalsasPpalPage } from './salsas-ppal.page';

describe('SalsasPpalPage', () => {
  let component: SalsasPpalPage;
  let fixture: ComponentFixture<SalsasPpalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SalsasPpalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
