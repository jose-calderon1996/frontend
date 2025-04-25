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
      // 🔹 1. Crear en Firebase
      const userCredential = await this.authService.registrarConCorreo(this.correo, this.password);
      const uid = userCredential.user?.uid;
  
      // 🔹 2. Insertar en tabla usuarios
      const resUsuario = await this.apiService.post('usuarios', {
        uid_firebase: uid,
        nombre: this.nombre,
        correo: this.correo,
        tipo_usuario: 'dueño'
      });
  
      // 🔹 3. Asegúrate de tener esto:
      const id_usuario = resUsuario.id_usuario;
      console.log('✅ ID recibido del usuario:', id_usuario);
  
      // 🔹 4. Insertar en tabla dueños_box
      const resDueno = await this.apiService.post('duenos-box', {
        id_usuario: id_usuario,
        nombre_box: this.nombreBox
      });
  
      console.log('📦 Dueño guardado:', resDueno);
  
      // 🔹 5. Redirigir
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('❌ Error en el registro del dueño:', error);
    }
  }
}