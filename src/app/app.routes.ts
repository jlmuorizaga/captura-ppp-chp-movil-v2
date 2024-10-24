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
  },
  {
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
  {
    path: 'promocion-especial-ppal',
    loadComponent: () => import('./catalogos/promocion-especial/promocion-especial-ppal/promocion-especial-ppal.page').then( m => m.PromocionEspecialPpalPage)
  },
  {
    path: 'insertar-promocion-especial',
    loadComponent: () => import('./catalogos/promocion-especial/insertar-promocion-especial/insertar-promocion-especial.page').then( m => m.InsertarPromocionEspecialPage)
  },
  {
    path: 'editar-promocion-especial',
    loadComponent: () => import('./catalogos/promocion-especial/editar-promocion-especial/editar-promocion-especial.page').then( m => m.EditarPromocionEspecialPage)
  },
  {
    path: 'relacion-promocion-especial-sucursal-ppal',
    loadComponent: () => import('./catalogos/relacion-promocion-especial-sucursal/relacion-promocion-especial-sucursal-ppal/relacion-promocion-especial-sucursal-ppal.page').then( m => m.RelacionPromocionEspecialSucursalPpalPage)
  },
  {
    path: 'editar-relacion-promocion-especial-sucursal',
    loadComponent: () => import('./catalogos/relacion-promocion-especial-sucursal/editar-relacion-promocion-especial-sucursal/editar-relacion-promocion-especial-sucursal.page').then( m => m.EditarRelacionPromocionEspecialSucursalPage)
  },
  {
    path: 'insertar-relacion-promocion-especial-sucursal',
    loadComponent: () => import('./catalogos/relacion-promocion-especial-sucursal/insertar-relacion-promocion-especial-sucursal/insertar-relacion-promocion-especial-sucursal.page').then( m => m.InsertarRelacionPromocionEspecialSucursalPage)
  },
  {
    path: 'editar-producto',
    loadComponent: () => import('./catalogos/productos/editar-producto/editar-producto.page').then( m => m.EditarProductoPage)
  },  {
    path: 'insertar-sucursal',
    loadComponent: () => import('./catalogos/sucursales/insertar-sucursal/insertar-sucursal.page').then( m => m.InsertarSucursalPage)
  },
  {
    path: 'editar-sucursal',
    loadComponent: () => import('./catalogos/sucursales/editar-sucursal/editar-sucursal.page').then( m => m.EditarSucursalPage)
  },
  {
    path: 'tamanios-pizza-ppal',
    loadComponent: () => import('./catalogos/tamanios-pizza/tamanios-pizza-ppal/tamanios-pizza-ppal.page').then( m => m.TamaniosPizzaPpalPage)
  },
  {
    path: 'editar-tamanios-pizza',
    loadComponent: () => import('./catalogos/tamanios-pizza/editar-tamanios-pizza/editar-tamanios-pizza.page').then( m => m.EditarTamaniosPizzaPage)
  },
  {
    path: 'insertar-tamanios-pizza',
    loadComponent: () => import('./catalogos/tamanios-pizza/insertar-tamanios-pizza/insertar-tamanios-pizza.page').then( m => m.InsertarTamaniosPizzaPage)
  },
  {
    path: 'insertar-relacion-etps',
    loadComponent: () => import('./catalogos/relacion-etps/insertar-relacion-etps/insertar-relacion-etps.page').then( m => m.InsertarRelacionEtpsPage)
  },
  {
    path: 'editar-relacion-etps',
    loadComponent: () => import('./catalogos/relacion-etps/editar-relacion-etps/editar-relacion-etps.page').then( m => m.EditarRelacionEtpsPage)
  },
  {
    path: 'categorias-ppal',
    loadComponent: () => import('./catalogos/categorias/categorias-ppal/categorias-ppal.page').then( m => m.CategoriasPpalPage)
  },
  {
    path: 'editar-categoria',
    loadComponent: () => import('./catalogos/categorias/editar-categoria/editar-categoria.page').then( m => m.EditarCategoriaPage)
  },
  {
    path: 'insertar-categoria',
    loadComponent: () => import('./catalogos/categorias/insertar-categoria/insertar-categoria.page').then( m => m.InsertarCategoriaPage)
  },




];
