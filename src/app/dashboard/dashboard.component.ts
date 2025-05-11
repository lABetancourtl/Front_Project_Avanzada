import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router: Router) {}

  menuAbierto = false;

toggleMenu() {
  this.menuAbierto = !this.menuAbierto;
  }

  
navegar(ruta: string): void {
  this.router.navigate([ruta]);
}

get mainMarginLeft(): string {
  return this.menuAbierto ? '200px' : '60px';
}

cerrarSesion() {
  localStorage.clear();
  window.location.href = '/login';
  }
}
