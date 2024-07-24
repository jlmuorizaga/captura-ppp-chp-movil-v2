import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'regiones-ppal',
    loadComponent: () => import('./catalogos/regiones/regiones-ppal/regiones-ppal.page').then( m => m.RegionesPpalPage)
  },
  {
    path: 'insertar-region',
    loadComponent: () => import('./catalogos/regiones/insertar-region/insertar-region.page').then( m => m.InsertarRegionPage)
  },
  {
    path: 'editar-region',
    loadComponent: () => import('./catalogos/regiones/editar-region/editar-region.page').then( m => m.EditarRegionPage)
  },
  {
    path: 'especialidades-ppal',
    loadComponent: () => import('./catalogos/especialidades/especialidades-ppal/especialidades-ppal.page').then( m => m.EspecialidadesPpalPage)
  },
  {
    path: 'insertar-especialidad',
    loadComponent: () => import('./catalogos/especialidades/insertar-especialidad/insertar-especialidad.page').then( m => m.InsertarEspecialidadPage)
  },
  {
    path: 'editar-especialidad',
    loadComponent: () => import('./catalogos/especialidades/editar-especialidad/editar-especialidad.page').then( m => m.EditarEspecialidadPage)
  },
];
