import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToAuthenticate() {
    this.router.navigate(['/autenticacion']); 
  }

  nombre = '';
  email = '';
  password = '';
  telefono = '';
  ciudad = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onRegister() {
    const usuario = {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      telefono: this.telefono,
      ciudad: this.ciudad
    };
  
    this.authService.register(usuario).subscribe({
      next: res => {
        console.log('✅ Registro exitoso:', res);
  
        this.snackBar.open('Código Enviado\nIngresa el código de 6 dígitos que has recibido', 'Cerrar', {
          duration: 5000,
          panelClass: ['custom-snackbar']
        });
  
        this.router.navigate(['/autenticacion']);
      },
      error: err => {
        console.error('❌ Error en registro:', err);
        this.snackBar.open('Error al registrar usuario', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }
  
}
