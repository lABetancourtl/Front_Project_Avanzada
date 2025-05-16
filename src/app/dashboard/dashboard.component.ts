import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from '../services/weather.service'; 


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  menuAbierto = false;
  weatherData: any = null;
  loadingWeather = true;
  errorWeather: string | null = null;

  constructor(private router: Router, private weatherService: WeatherService) {}

  ngOnInit() {
    this.getCurrentPosition()
      .then(coords => {
        this.weatherService.getWeather(coords.lat, coords.lon).subscribe({
          next: res => {
            this.weatherData = JSON.parse(res);  // Parseamos el JSON en string
            this.loadingWeather = false;
          },
          error: err => {
            this.errorWeather = 'Error al obtener clima';
            this.loadingWeather = false;
            console.error(err);
          }
        });
      })
      .catch(err => {
        this.errorWeather = 'No se pudo obtener la ubicación';
        this.loadingWeather = false;
        console.error(err);
      });
  }

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

  menuItems = [
    { icono: 'assets/house.svg', nombre: 'Inicio', ruta: '/dashboard' },
    { icono: 'assets/file-earmark-plus.svg', nombre: 'Nuevo reporte', ruta: '/dashboard/reportes/crear' },
    { icono: 'assets/bookmark.svg', nombre: 'Mis reportes', ruta: '/dashboard/reportes/mis' },
    { icono: 'assets/bell.svg', nombre: 'Notificaciones', ruta: '#' },
    { icono: 'assets/person-gear.svg', nombre: 'Editar perfil', ruta: '/dashboard/editarPerfil' },
  ];

  getCurrentPosition(): Promise<{ lat: number; lon: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocalización no soportada');
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        (err) => reject(err)
      );
    });
  }
}
