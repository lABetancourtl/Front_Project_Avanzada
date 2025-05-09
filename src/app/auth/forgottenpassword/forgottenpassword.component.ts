import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgottenpassword',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatSnackBarModule
  ],
  templateUrl: './forgottenpassword.component.html',
  styleUrl: './forgottenpassword.component.css'
})
export class ForgottenpasswordComponent {


  email: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  enviarCodigo() {
    const payload = { email: this.email };

    this.authService.enviarCodigoVerificacion(payload).subscribe({
      next: (response) => {
        this.snackBar.open(response.mensaje, 'Cerrar', { duration: 3000 });
        // Redirigir o mostrar otro paso si es necesario
      },
      error: (error) => {
        this.snackBar.open('Error al enviar el código. Intenta de nuevo.', 'Cerrar', { duration: 3000 });
        console.error(error);
      }
    });
  }

  
  
}



