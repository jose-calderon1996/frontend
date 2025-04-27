import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-panel-entrenador',
  standalone: true,
  templateUrl: './panel-entrenador.page.html',
  imports: [CommonModule, IonicModule, RouterModule],
})
export class PanelEntrenadorPage implements OnInit {
  nombre = localStorage.getItem('nombre') || '';
  correo = localStorage.getItem('correo') || '';
  idEntrenador = Number(localStorage.getItem('id_usuario'));
  cantidadClientes = 0;
  clientes: any[] = [];
  rutinasClientes: { [id_cliente: number]: any[] } = {};

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.obtenerCantidadClientes();
    await this.obtenerClientesAsociados(); // 👈 para que también cargue los clientes
  }

  async cerrarSesion() {
    try {
      await this.authService.cerrarSesion();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error);
    }
  }

  async obtenerCantidadClientes() {
    try {
      const response = await this.apiService.get(`entrenador-clientes/contar-clientes/${this.idEntrenador}`);
      this.cantidadClientes = response.total;
    } catch (error) {
      console.error('❌ Error al obtener cantidad de clientes:', error);
    }
  }

  async obtenerClientesAsociados() {
    try {
      const clientes = await this.apiService.get(`entrenador-clientes/clientes-asociados/${this.idEntrenador}`);

      this.clientes = clientes;

      // 🔵 Traer también las rutinas de cada cliente
      for (const cliente of this.clientes) {
        const rutinas = await this.apiService.get(`rutinas/cliente/${cliente.id_cliente}`);
        this.rutinasClientes[cliente.id_cliente] = rutinas;
      }
    } catch (error) {
      console.error('❌ Error al obtener clientes asociados:', error);
    }
  }

  irACrearRutina(id_cliente: number) {
    this.router.navigate(['/crear-rutina', id_cliente]);
  }
}
