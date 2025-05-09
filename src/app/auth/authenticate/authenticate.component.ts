import { AuthService } from './../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-activate-account',
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule],
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
    private snackBar: MatSnackBar,
    private route: ActivatedRoute // inyectar
  ) {}

  ngOnInit() {
    // Leer el parámetro 'email' desde la URL
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      if (!this.email) {
        this.snackBar.open('Email no especificado en el enlace de activación.', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/login']);
      }
    });
  }

  onActivateAccount() {
    const activationData = {
      email: this.email,
      codigoValidacion: this.codigo
    };
    this.authService.authenticate(activationData).subscribe({
      next: (response) => {
        this.snackBar.open('Cuenta activada correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.snackBar.open('Error al activar la cuenta.', 'Cerrar', { duration: 3000 });
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  reenviarCodigo() {
    console.log('Reenviando código...');
    // lógica para reenviar el código
  }
}
