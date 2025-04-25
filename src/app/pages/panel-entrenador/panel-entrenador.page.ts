import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-panel-entrenador',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './panel-entrenador.page.html',
})
export class PanelEntrenadorPage implements OnInit {
  nombre = localStorage.getItem('nombre') || '';
  correo = localStorage.getItem('correo') || '';
  idEntrenador = Number(localStorage.getItem('id_usuario'));
  clientes: any[] = [];

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    
  }

  // Obtener los clientes asociados al entrenador
  
}
