import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  showSuccessAlert = false;
  showErrorAlert = false;
  errorMessage = '';

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
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.router.navigate(['/autenticacion']);
        }, 3000);
      },
      error: err => {
        this.showErrorAlert = true;
      }
    });
  }
  
}
