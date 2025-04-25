import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cliente',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './crear-cliente.page.html',
})
export class CrearClientePage {
  nombre = '';
  correo = '';
  password = '';
  idCliente: number | undefined;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  // Función para registrar al cliente en Firebase y luego en la base de datos
  async registrarCliente() {
    try {
      // Crear cliente en Firebase
      const cred = await this.authService.registrarConCorreo(this.correo, this.password);
      const uid = cred.user?.uid;

      // Crear cliente en MySQL
      const usuario = await this.apiService.post('entrenador-clientes/crear-cliente', {
        uid_firebase: uid,
        nombre: this.nombre,
        correo: this.correo,
        tipo_usuario: 'cliente',
      });

      this.idCliente = usuario.id_usuario; // Guardamos el id del cliente creado
      alert('✅ Cliente registrado correctamente');
    } catch (error) {
      console.error('❌ Error registrando cliente:', error);
      alert('Error al registrar cliente');
    }
  }

  // Función para asociar al cliente con el entrenador
  async asociarCliente() {
    try {
      const idEntrenador = localStorage.getItem('id_usuario');
      
      if (!idEntrenador || !this.idCliente) {
        alert('Faltan datos para asociar al cliente');
        return;
      }

      // Asociar cliente al entrenador
      await this.apiService.post('entrenador-clientes/asociar', {
        id_entrenador: idEntrenador,
        id_cliente: this.idCliente,
      });

      alert('✅ Cliente asociado correctamente');
      this.router.navigate(['/panel-entrenador']);
    } catch (error) {
      console.error('❌ Error asociando cliente:', error);
      alert('Error al asociar al cliente');
    }
  }
}
