import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  menuAbierto = false;

toggleMenu() {
  this.menuAbierto = !this.menuAbierto;
  }

  
navegar(ruta: string) {
  window.location.href = ruta;
  }

cerrarSesion() {
  localStorage.clear();
  window.location.href = '/login';
  }
}
