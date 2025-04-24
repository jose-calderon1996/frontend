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
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
