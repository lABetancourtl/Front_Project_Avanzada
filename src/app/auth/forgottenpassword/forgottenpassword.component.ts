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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgottenpassword',
  imports: [
    CommonModule,
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
  showSuccessAlert = false;
  showErrorAlert = false;
  errorMessage = '';

  email: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  enviarCodigo() {
    const payload = { email: this.email };

    this.authService.enviarCodigoVerificacion(payload).subscribe({
      next: (response) => {
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
      },
      error: (error) => {
        this.showErrorAlert = true;
      }
    });
  }

  
  
}



