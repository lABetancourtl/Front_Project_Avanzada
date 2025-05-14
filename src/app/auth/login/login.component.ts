import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    RouterModule,
    MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showSuccessAlert = false;
  showErrorAlert = false;
  errorMessage = '';

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private snackBar: MatSnackBar 
  ) {}

// Paso 1: Detectar el rol desde el token y redirigir al panel adecuado
onLogin() {
  const userData = {
    email: this.email,
    password: this.password
  };

  this.authService.login(userData).subscribe({
    next: (response) => {
      if (response && response.error === false && response.respuesta && response.respuesta.token) {
        const token = response.respuesta.token;
        localStorage.setItem('authToken', token);

        const payload = JSON.parse(atob(token.split('.')[1]));
        const rol = payload.rol || payload.role || '';
        this.showSuccessAlert = true;
      
        setTimeout(() => {
          if (rol === 'ADMINISTRADOR') {
            this.router.navigate(['/dashboard-admin']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }, 1000);
      }
    },
    error: (error) => {
      this.errorMessage = 'Credenciales incorrectas';
      this.showErrorAlert = true;
    }
  });
}

  goToRegister() {
    this.router.navigate(['/registro']);
  }
}
