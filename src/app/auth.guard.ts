import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // Aquí está el cambio
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
  
    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp > now) {
        return true;  // Token válido, permitir acceso
      } else {
        this.router.navigate(['/login']);  // Token expirado, redirigir a login
        return false;
      }
    } catch (error) {
      this.router.navigate(['/login']);  // Error al decodificar el token, redirigir a login
      return false;
    }
  }
  
}
