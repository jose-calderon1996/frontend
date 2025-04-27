import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  imports: [IonicModule, FormsModule, CommonModule]
})
export class LoginPage {
  correo = '';
  password = '';

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  async login() {
    try {
      // 1. Iniciar sesión en Firebase
      const userCredential = await this.authService.iniciarSesion(this.correo, this.password);
      const uid = userCredential.user?.uid;

      // 2. Obtener datos del usuario desde MySQL
      const userData = await this.apiService.get(`usuarios/uid/${uid}`);

      // 3. Guardar info en localStorage
      localStorage.setItem('id_usuario', userData.id_usuario);
      localStorage.setItem('tipo_usuario', userData.tipo_usuario);
      localStorage.setItem('nombre', userData.nombre);
      localStorage.setItem('correo', userData.correo);

      // 4. 🚨 Registrar en log_acceso
      await this.apiService.post('log-acceso/registrar', {
        id_usuario: userData.id_usuario
      }).then(() => {
        console.log('✅ Acceso guardado en log_acceso');
      }).catch(err => {
        console.error('❌ Error al guardar log de acceso:', err);
      });

      // 5. Redirigir según tipo de usuario
      switch (userData.tipo_usuario) {
        case 'dueño':
          this.router.navigate(['/home']);
          break;
        case 'entrenador':
          this.router.navigate(['/panel-entrenador']);
          break;
        case 'cliente':
          this.router.navigate(['/panel-cliente']);
          break;
      }

    } catch (error) {
      console.error('❌ Error en el login:', error);
      alert('Error al iniciar sesión');
    }
  }
}
