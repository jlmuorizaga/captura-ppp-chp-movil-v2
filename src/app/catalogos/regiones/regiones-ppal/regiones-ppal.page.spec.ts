import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegionesPpalPage } from './regiones-ppal.page';

describe('RegionesPpalPage', () => {
  let component: RegionesPpalPage;
  let fixture: ComponentFixture<RegionesPpalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionesPpalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
