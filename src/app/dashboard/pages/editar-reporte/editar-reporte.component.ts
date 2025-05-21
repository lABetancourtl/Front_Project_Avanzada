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
import { Router, ActivatedRoute } from '@angular/router';
import { ImagenService } from '../../../services/imagen.service';

@Component({
  selector: 'app-editar-reporte',
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
  templateUrl: './editar-reporte.component.html',
  styleUrls: ['./editar-reporte.component.css']
})
export class EditarReporteComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  isEditing = true;
  imagenBase64 = '';
  categorias: { id: string; nombre: string }[] = [];
  reporteId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private reportesService: ReportesService,
    private mapaService: MapaService,
    private router: Router,
    private imagenService: ImagenService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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

    // Obtener ID del reporte desde la URL
    this.route.paramMap.subscribe(params => {
      this.reporteId = params.get('id');
      if (this.reporteId) {
        this.cargarDatosDelReporte(this.reporteId);
      }
    });
  }

  ngAfterViewInit(): void {
    this.mapaService.crearMapa();

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
  if (this.form.valid && this.reporteId) {
    this.reportesService.actualizarReportePorId(this.reporteId, this.form.value).subscribe({
      next: () => {
        alert('✅ Reporte actualizado correctamente');
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.error('❌ Error al actualizar el reporte:', err);
        alert('❌ Error al actualizar el reporte');
      }
    });
  }
}


  cancelar(): void {
    this.router.navigate(['/dashboard']);
  }

  private cargarDatosDelReporte(id: string): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('❌ No se encontró el token');
      return;
    }

    this.reportesService.obtenerReportePorId(id).subscribe({
      next: reporte => {
        this.form.patchValue({
          titulo: reporte.titulo,
          descripcion: reporte.descripcion,
          categoriaId: reporte.categoriaId,
          importante: reporte.importante,
          foto: reporte.foto,
          ubicacion: {
            latitud: reporte.ubicacion.latitud,
            longitud: reporte.ubicacion.longitud
          }
        });

        // Establecer marcador inicial en el mapa si lo deseas
        //this.mapaService.colocarMarcadorInicial(reporte.ubicacion.latitud, reporte.ubicacion.longitud);
      },
      error: err => {
        console.error('❌ Error al cargar los datos del reporte', err);
      }
    });
  }
}
