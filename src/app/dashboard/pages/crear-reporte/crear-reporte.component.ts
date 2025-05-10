import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReportesService } from '../../../services/reportes.service';
import { MapaService } from '../../../services/mapa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-reporte',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  templateUrl: './crear-reporte.component.html',
  styleUrls: ['./crear-reporte.component.css']
})
export class CrearReporteComponent implements OnInit, AfterViewInit {

  form!: FormGroup;
  isEditing = false;
  imagenBase64 = '';

  categorias: { _id: string; nombre: string }[] = [];


  constructor(
    private fb: FormBuilder,
    private reportesService: ReportesService,
    private mapaService: MapaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializar el formulario
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoriaId: ['', Validators.required],
      importante: [false],
      foto: [''],
      ubicacion: this.fb.group({
        latitud: [0, Validators.required],
        longitud: [0, Validators.required]
      })
    });
  
    // Obtener el token desde el almacenamiento local
    const token = localStorage.getItem('authToken');
    // Verificar si el token existe antes de hacer la solicitud
    if (token) {
      // Llamada al servicio para obtener las categorías, pasando el token en los headers
      this.reportesService.getCategorias(token).subscribe({
        next: categorias => {
          console.log('🧠 Categorías recibidas:', categorias); // Este log debe aparecer
          this.categorias = categorias;
        },
        error: err => {
          console.error('❌ Error al cargar categorías', err);
        }
      });
    } else {
      console.error('❌ No se encontró el token');
    }
  }
  
  
  

  ngAfterViewInit(): void {
    // Cargamos el mapa una vez esté el DOM listo
    this.mapaService.crearMapa();

    // Suscribimos para capturar coordenadas al hacer clic en el mapa
    this.mapaService.agregarMarcador().subscribe(coords => {
      this.form.get('ubicacion')?.patchValue({
        latitud: coords.lat,
        longitud: coords.lng
      });
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenBase64 = reader.result as string;
        this.form.get('foto')?.setValue(this.imagenBase64);
      };
      reader.readAsDataURL(file);
    }
  }

onSubmit(): void {
  if (this.form.valid) {
    this.reportesService.crearReporte(this.form.value).subscribe({
      next: () => {
        alert('✅ Reporte enviado correctamente');
        this.router.navigate(['/dashboard']); // ✅ Redirige usando Angular
      },
      error: err => {
        console.error(err);
        alert('❌ Error al enviar el reporte');
      }
    });
  }
}

  cancelar(): void {
    window.location.href = '/dashboard';
  }
}