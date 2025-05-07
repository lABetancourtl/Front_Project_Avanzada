import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  nombre = '';
  email = '';
  password = '';
  telefono = '';
  ciudad = '';

  constructor(private authService: AuthService) {}

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
        alert('Usuario registrado correctamente');
      },
      error: err => {
        console.error('❌ Error en registro:', err);
        alert('Error al registrar usuario');
      }
    });
  }
}
