import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-dueno',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './registro-dueno.page.html',
})
export class RegistroDuenoPage {
  nombre: string = '';
  correo: string = '';
  password: string = '';
  nombreBox: string = '';

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  async registrarDueno() {
    try {
      // ✅ 1. Crear usuario en Firebase
      const userCredential = await this.authService.registrarConCorreo(this.correo, this.password);
      const uid = userCredential.user?.uid;

      // ✅ 2. Guardar en tabla usuarios
      const resUsuario = await this.apiService.post('usuarios', {
        uid_firebase: uid,
        nombre: this.nombre,
        correo: this.correo,
        tipo_usuario: 'dueño'
      });

      const id_usuario = resUsuario.id_usuario;

      // ✅ 3. Guardar en tabla dueños_box
      await this.apiService.post('duenos-box', {
        id_usuario: id_usuario,
        nombre_box: this.nombreBox
      });

      // ✅ 4. Redirigir
      this.router.navigate(['/home']);

    } catch (error) {
      console.error('❌ Error en el registro del dueño:', error);
    }
  }
}
