import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
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
  errorMessage: string = '';  // Para mensajes de error

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private snackBar: MatSnackBar 
  ) {}

  onLogin() {
    const userData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(userData).subscribe({
      next: (response) => {
        if (response && response.error === false && response.respuesta && response.respuesta.token) {
          // Si el login es exitoso, guarda el token en localStorage
          localStorage.setItem('token', response.respuesta.token); 
          
          // Muestra un mensaje de éxito (popup)
          this.snackBar.open('¡Login exitoso! Redirigiendo...', 'Cerrar', {
            duration: 3000,  // El popup permanecerá visible durante 3 segundos
            panelClass: ['success-snackbar'] // Clase personalizada para el color
          });

          // Redirige a YouTube
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 3000); // Espera a que se cierre el snackbar antes de redirigir
        } 
      },
      error: (error) => {
        this.errorMessage = 'Credenciales incorrectas';
        console.error('Error de login:', error);
        this.snackBar.open(this.errorMessage, 'Cerrar', {
          duration: 3000,  // El popup permanecerá visible durante 3 segundos
          panelClass: ['error-snackbar'] // Clase personalizada para el color
        });
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }
}
