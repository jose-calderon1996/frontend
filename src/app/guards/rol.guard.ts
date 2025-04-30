import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const tipoUsuario = localStorage.getItem('tipo_usuario');
    const tipoRequerido = route.data['tipo']; // solo existe si es una ruta protegida como panel-cliente

    // ✅ Si esta es la ruta de redirección automática
    if (!tipoRequerido) {
      switch (tipoUsuario) {
        case 'cliente':
          this.router.navigate(['/panel-cliente']);
          break;
        case 'entrenador':
          this.router.navigate(['/panel-entrenador']);
          break;
        case 'dueño':
          this.router.navigate(['/home']);
          break;
        default:
          this.router.navigate(['/login']);
      }
      return false; // No deja entrar a /redirect
    }

    // ✅ Para rutas protegidas como panel-cliente, etc.
    if (tipoUsuario === tipoRequerido) {
      return true; // acceso autorizado
    } else {
      this.router.navigate(['/login']);
      return false; // acceso denegado
    }
  }
}
