import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-panel-cliente',
  standalone: true,
  templateUrl: './panel-cliente.page.html',
  styleUrls: ['./panel-cliente.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule]
})
export class PanelClientePage implements OnInit {
  nombre = localStorage.getItem('nombre') || '';
  correo = localStorage.getItem('correo') || '';
  idCliente = Number(localStorage.getItem('id_usuario'));

  constructor(private router: Router) {}

  ngOnInit() {}

  irMisRutinas() {
    this.router.navigate(['/mis-rutinas']);
  }
}
