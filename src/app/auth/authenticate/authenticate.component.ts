import { AuthService } from './../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-activate-account',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './authenticate.component.html', // Asegúrate de que este archivo existe
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent {
  email: string = '';
  codigo: string = '';

  constructor(
    private authService: AuthService, 
    private http: HttpClient, 
    private router: Router, 
    private snackBar: MatSnackBar) {}

  // Método para activar la cuenta
  onActivateAccount() {
    const activationData = {
      email: this.email,
      codigoValidacion: this.codigo
    };
    this.authService.authenticate(activationData).subscribe({
        next: (response) => {
          console.log('Cuenta activada correctamente', response);
          // Mostrar un mensaje de éxito
          this.snackBar.open('Cuenta activada correctamente', 'Cerrar', {
            duration: 3000
          });
          // Redirigir al login o alguna otra página
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al activar cuenta', error);
          // Mostrar un mensaje de error
          this.snackBar.open('Error al activar la cuenta, verifique los datos ingresados.', 'Cerrar', {
            duration: 3000
          });
        }
      });
  }

  // Método para navegar al login
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Método para reenviar el código (si es necesario)
  reenviarCodigo() {
    console.log('Reenviando el código de verificación...');
    // Implementa aquí la lógica para reenviar el código, si es necesario.
  }
}
