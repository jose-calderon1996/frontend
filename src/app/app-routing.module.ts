import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'registro-dueno',
    pathMatch: 'full'
  },
  {
    path: 'registro-dueno',
    loadComponent: () => import('./pages/registro-dueno/registro-dueno.page').then(m => m.RegistroDuenoPage)
  },
  {
    path: 'registro-entrenador',
    loadComponent: () => import('./pages/registro-entrenador/registro-entrenador.page').then(m => m.RegistroEntrenadorPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'panel-entrenador',
    loadComponent: () => import('./pages/panel-entrenador/panel-entrenador.page').then(m => m.PanelEntrenadorPage)
  },
  {
    path: 'crear-cliente',
    loadComponent: () => import('./pages/crear-cliente/crear-cliente.page').then((m) => m.CrearClientePage),
  },
  
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
