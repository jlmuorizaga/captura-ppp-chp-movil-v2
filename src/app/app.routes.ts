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
  {
    path: 'sucursales-ppal',
    loadComponent: () => import('./catalogos/sucursales/sucursales-ppal/sucursales-ppal.page').then( m => m.SucursalesPpalPage)
  },
  {
    path: 'productos-ppal',
    loadComponent: () => import('./catalogos/productos/productos-ppal/productos-ppal.page').then( m => m.ProductosPpalPage)
  },
  {
    path: 'insertar-producto',
    loadComponent: () => import('./catalogos/productos/insertar-producto/insertar-producto.page').then( m => m.InsertarProductoPage)
  },
  {
    path: 'tipo-producto-ppal',
    loadComponent: () => import('./catalogos/tipo-productos/tipo-producto-ppal/tipo-producto-ppal.page').then( m => m.TipoProductoPpalPage)
  },
  {
    path: 'editar-tipo-producto',
    loadComponent: () => import('./catalogos/tipo-productos/editar-tipo-producto/editar-tipo-producto.page').then( m => m.EditarTipoProductoPage)
  },
  {
    path: 'insertar-tipo-producto',
    loadComponent: () => import('./catalogos/tipo-productos/insertar-tipo-producto/insertar-tipo-producto.page').then( m => m.InsertarTipoProductoPage)
  },  {
    path: 'salsas-ppal',
    loadComponent: () => import('./catalogos/salsas/salsas-ppal/salsas-ppal.page').then( m => m.SalsasPpalPage)
  },
  {
    path: 'insertar-salsa',
    loadComponent: () => import('./catalogos/salsas/insertar-salsa/insertar-salsa.page').then( m => m.InsertarSalsaPage)
  },
  {
    path: 'editar-salsa',
    loadComponent: () => import('./catalogos/salsas/editar-salsa/editar-salsa.page').then( m => m.EditarSalsaPage)
  },
  {
    path: 'menu-catalogos',
    loadComponent: () => import('./menu-catalogos/menu-catalogos.page').then( m => m.MenuCatalogosPage)
  },
  {
    path: 'relacion-etps-ppal',
    loadComponent: () => import('./catalogos/relacion-etps/relacion-etps-ppal/relacion-etps-ppal.page').then( m => m.RelacionEtpsPpalPage)
  },


];
