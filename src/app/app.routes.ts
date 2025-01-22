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
  },
  {
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
    path: 'ppal-categoria',
    loadComponent: () => import('./catalogos/categorias/ppal-categoria/ppal-categoria.page').then( m => m.CategoriasPpalPage)
  },
  {
    path: 'editar-categoria',
    loadComponent: () => import('./catalogos/categorias/editar-categoria/editar-categoria.page').then( m => m.EditarCategoriaPage)
  },
  {
    path: 'insertar-categoria',
    loadComponent: () => import('./catalogos/categorias/insertar-categoria/insertar-categoria.page').then( m => m.InsertarCategoriaPage)
  },
  {
    path: 'ingredientes-ppal',
    loadComponent: () => import('./catalogos/ingredientes/ingredientes-ppal/ingredientes-ppal.page').then( m => m.IngredientesPpalPage)
  },
  {
    path: 'editar-ingrediente',
    loadComponent: () => import('./catalogos/ingredientes/editar-ingrediente/editar-ingrediente.page').then( m => m.EditarIngredientePage)
  },
  {
    path: 'insertar-ingrediente',
    loadComponent: () => import('./catalogos/ingredientes/insertar-ingrediente/insertar-ingrediente.page').then( m => m.InsertarIngredientePage)
  },
  {
    path: 'orillas-ppal',
    loadComponent: () => import('./catalogos/orillas/orillas-ppal/orillas-ppal.page').then( m => m.OrillasPpalPage)
  },
  {
    path: 'editar-orilla',
    loadComponent: () => import('./catalogos/orillas/editar-orilla/editar-orilla.page').then( m => m.EditarOrillaPage)
  },
  {
    path: 'insertar-orilla',
    loadComponent: () => import('./catalogos/orillas/insertar-orilla/insertar-orilla.page').then( m => m.InsertarOrillaPage)
  },
  {
    path: 'editar-orilla',
    loadComponent: () => import('./catalogos/orillas/editar-orilla/editar-orilla.page').then( m => m.EditarOrillaPage)
  },
  {
    path: 'pizzas-ppal',
    loadComponent: () => import('./catalogos/pizzas/pizzas-ppal/pizzas-ppal.page').then( m => m.PizzasPpalPage)
  },
  {
    path: 'editar-pizza',
    loadComponent: () => import('./catalogos/pizzas/editar-pizza/editar-pizza.page').then( m => m.EditarPizzaPage)
  },
  {
    path: 'insertar-pizza',
    loadComponent: () => import('./catalogos/pizzas/insertar-pizza/insertar-pizza.page').then( m => m.InsertarPizzaPage)
  },
  {
    path: 'relacion-orilla-sucursal-ppal',
    loadComponent: () => import('./catalogos/relacion-orilla-sucursal/relacion-orilla-sucursal-ppal/relacion-orilla-sucursal-ppal.page').then( m => m.RelacionOrillaSucursalPpalPage)
  },
  {
    path: 'editar-relacion-orilla-sucursal',
    loadComponent: () => import('./catalogos/relacion-orilla-sucursal/editar-relacion-orilla-sucursal/editar-relacion-orilla-sucursal.page').then( m => m.EditarRelacionOrillaSucursalPage)
  },
  {
    path: 'insertar-relacion-orilla-sucursal',
    loadComponent: () => import('./catalogos/relacion-orilla-sucursal/insertar-relacion-orilla-sucursal/insertar-relacion-orilla-sucursal.page').then( m => m.InsertarRelacionOrillaSucursalPage)
  },
  {
    path: 'relacion-pizza-sucursal-ppal',
    loadComponent: () => import('./catalogos/relacion-pizza-sucursal/relacion-pizza-sucursal-ppal/relacion-pizza-sucursal-ppal.page').then( m => m.RelacionPizzaSucursalPpalPage)
  },
  {
    path: 'editar-relacion-pizza-sucursal',
    loadComponent: () => import('./catalogos/relacion-pizza-sucursal/editar-relacion-pizza-sucursal/editar-relacion-pizza-sucursal.page').then( m => m.EditarRelacionPizzaSucursalPage)
  },
  {
    path: 'insertar-relacion-pizza-sucursal',
    loadComponent: () => import('./catalogos/relacion-pizza-sucursal/insertar-relacion-pizza-sucursal/insertar-relacion-pizza-sucursal.page').then( m => m.InsertarRelacionPizzaSucursalPage)
  },  {
    path: 'relacion-producto-sucursal-ppal',
    loadComponent: () => import('./catalogos/relacion-producto-sucursal/relacion-producto-sucursal-ppal/relacion-producto-sucursal-ppal.page').then( m => m.RelacionProductoSucursalPpalPage)
  },
  {
    path: 'editar-relacion-producto-sucursal',
    loadComponent: () => import('./catalogos/relacion-producto-sucursal/editar-relacion-producto-sucursal/editar-relacion-producto-sucursal.page').then( m => m.EditarRelacionProductoSucursalPage)
  },
  {
    path: 'insertar-relacion-producto-sucursal',
    loadComponent: () => import('./catalogos/relacion-producto-sucursal/insertar-relacion-producto-sucursal/insertar-relacion-producto-sucursal.page').then( m => m.InsertarRelacionProductoSucursalPage)
  },
  {
    path: 'relacion-salsa-sucursal-ppal',
    loadComponent: () => import('./catalogos/relacion-salsa-sucursal/relacion-salsa-sucursal-ppal/relacion-salsa-sucursal-ppal.page').then( m => m.RelacionSalsaSucursalPpalPage)
  },
  {
    path: 'insertar-relacion-salsa-sucursal',
    loadComponent: () => import('./catalogos/relacion-salsa-sucursal/insertar-relacion-salsa-sucursal/insertar-relacion-salsa-sucursal.page').then( m => m.InsertarRelacionSalsaSucursalPage)
  },
  {
    path: 'editar-relacion-salsa-sucursal',
    loadComponent: () => import('./catalogos/relacion-salsa-sucursal/editar-relacion-salsa-sucursal/editar-relacion-salsa-sucursal.page').then( m => m.EditarRelacionSalsaSucursalPage)
  },





];
