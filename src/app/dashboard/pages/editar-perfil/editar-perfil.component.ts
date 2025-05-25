import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  form!: FormGroup;
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],   
      telefono: ['', [Validators.required, Validators.minLength(10)]], 
      ciudad: ['', [Validators.required, Validators.minLength(3)]],   
    });

    const authToken = localStorage.getItem('authToken');
    const decodedToken: any = jwtDecode(authToken || '');
    const userId = decodedToken.id;

    // Obtener los datos del usuario desde el backend
    this.authService.obtenerUsuario(userId).subscribe((response: any) => {
      const usuario = response.respuesta; 
      this.form.patchValue({
        nombre: usuario.nombre,
        telefono: usuario.telefono,
        ciudad: usuario.ciudad
      });
    }, (error: any) => {
      console.error('Error al obtener los datos del usuario:', error);
    });
    
  }

  guardarCambios(): void {
    if (this.form.valid) {
      const datosActualizados = this.form.value;

      const authToken = localStorage.getItem('authToken');
      const decodedToken: any = jwtDecode(authToken || '');
      const userId = decodedToken.id;

      const url = `https://project-avanzada-zo88.onrender.com/api/usuarios/${userId}`;
      const headers = { Authorization: `Bearer ${authToken}` };

      this.http.put(url, datosActualizados, { headers }).subscribe({
        next: (res: any) => {
          alert(res.mensaje || 'Perfil actualizado correctamente.');
        },
        error: (err) => {
          alert('Error al actualizar el perfil: ' + (err.error?.mensaje || err.message));
        }
      });
    }
  }

  eliminarCuenta(): void {
    const authToken = localStorage.getItem('authToken');
    const decodeToken: any = jwtDecode(authToken || '');
    const userId = decodeToken.id;
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
      this.authService.deleteUser(userId, headers).subscribe({
        next: (res: any) => {
          alert(res.mensaje || 'Cuenta eliminada correctamente.');
          this.authService.cerrarSesion();
        },
        error: (err) => {
          console.error('Error al eliminar la cuenta:', err);
        }
      });
    }
  }
}
