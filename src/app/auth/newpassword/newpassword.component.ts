import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-newpassword',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {

  email: string = '';
  codigoValidacion: string = '';
  nuevaPassword: string = '';
  confirmarPassword: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.codigoValidacion = params['codigo'] || '';

      // Validación opcional
      if (!this.email || !this.codigoValidacion) {
        alert("Enlace inválido. Falta email o código de verificación.");
        this.router.navigate(['/login']);
      }
    });
  }

  onChangePassword(): void {
    if (this.nuevaPassword !== this.confirmarPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const payload = {
      email: this.email,
      codigoValidacion: this.codigoValidacion,
      nuevaPassword: this.nuevaPassword
    };

    this.authService.cambiarPassword(payload).subscribe({
      next: () => {
        alert('Contraseña actualizada correctamente');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Error al cambiar la contraseña: ' + err.error.mensaje);
      }
    });
  }
}
