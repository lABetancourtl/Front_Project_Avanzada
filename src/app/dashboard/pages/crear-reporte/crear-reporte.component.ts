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
import { ImagenService } from '../../../services/imagen.service';


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
  categorias: { id: string; nombre: string }[] = [];


  constructor(
    private fb: FormBuilder,
    private reportesService: ReportesService,
    private mapaService: MapaService,
    private router: Router,
    private imagenService: ImagenService,
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
  
  this.form.get('categoriaId')?.valueChanges.subscribe(value => {
    console.log('✅ Categoría seleccionada:', value);
  });

    const token = localStorage.getItem('authToken');
    if (token) {
      // Llamada al servicio para obtener las categorías, pasando el token en los headers
      this.reportesService.getCategorias(token).subscribe({
        next: categorias => {
          console.log('🧠 Categorías recibidas:', categorias);
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
      this.imagenService.subirImagen(file).subscribe({
        next: (url: string) => {
          console.log('✅ Imagen subida:', url);
          this.form.get('foto')?.setValue(url);
        },
        error: (err) => {
          console.error('❌ Error al subir imagen', err);
        }
      });
    }
  }



onSubmit(): void {
  if (this.form.valid) {
    this.reportesService.crearReporte(this.form.value).subscribe({
      next: () => {
        alert('✅ Reporte enviado correctamente');
        this.router.navigate(['/dashboard']); 
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