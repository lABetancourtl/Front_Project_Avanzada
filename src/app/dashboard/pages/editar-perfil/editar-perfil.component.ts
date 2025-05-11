import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
      const usuario = response.respuesta; // <- antes era response.data
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

      const url = `http://localhost:8081/api/usuarios/${userId}`;
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
    const userId = localStorage.getItem('userId');
    const url = `http://localhost:8081/api/usuarios/${userId}`; // Ajusta la URL para eliminar la cuenta

    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
      this.http.delete(url).subscribe({
        next: (res: any) => {
          alert(res.mensaje || 'Cuenta eliminada correctamente.');
          // Redirigir al usuario a la página de inicio o login
        },
        error: (err) => {
          alert('Error al eliminar la cuenta: ' + (err.error?.mensaje || err.message));
        }
      });
    }
  }
}
