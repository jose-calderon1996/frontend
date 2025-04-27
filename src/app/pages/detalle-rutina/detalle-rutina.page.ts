import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-detalle-rutina',
  standalone: true,
  templateUrl: './detalle-rutina.page.html',
  styleUrls: ['./detalle-rutina.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule],
})
export class DetalleRutinaPage implements OnInit {
  idRutina!: number;
  nombreRutina = '';
  diaEntrenamiento = '';
  ejercicios: any[] = [];
  idCliente = Number(localStorage.getItem('id_usuario'));

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.idRutina = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerDetalleRutina();
  }

  async obtenerDetalleRutina() {
    try {
      const response = await this.apiService.get(`rutinas/detalle/${this.idRutina}`);
      this.nombreRutina = response.nombre_rutina;
      this.diaEntrenamiento = response.dia_entrenamiento;
      this.ejercicios = response.ejercicios;
    } catch (error) {
      console.error('❌ Error al obtener detalle de rutina:', error);
    }
  }

  async marcarRutinaRealizada() {
    try {
      await this.apiService.post('rutinas/rutina-realizada', {
        id_cliente: this.idCliente,
        id_rutina: this.idRutina
      });
      alert('✅ Rutina marcada como realizada');
      this.router.navigate(['/panel-cliente']); // vuelve al panel cliente o donde quieras
    } catch (error) {
      console.error('❌ Error registrando rutina realizada:', error);
      alert('Error al registrar rutina realizada');
    }
  }
}
