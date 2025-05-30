import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-mis-reportes',
  standalone: true,
  templateUrl: './mis-reportes.component.html',
  styleUrls: ['./mis-reportes.component.css'],
  imports: [
    CommonModule,
  RouterModule],
})
export class MisReportesComponent implements OnInit {
  reportes: any[] = [];
  cargando = true;
  imagenModal: string | null = null;

  constructor(
    private reportesService: ReportesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarMisReportes();
  }

  cargarMisReportes(): void {
    this.cargando = true;
    this.reportesService.listarMisReportes().subscribe({
      next: (data) => {
        this.reportes = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        alert('Error al cargar tus reportes');
      },
    });
  }

  verDetalle(id: string): void {
    this.router.navigate(['dashboard/reportes/detalle', id]);
  }

  editarReporte(id: string): void {
    this.router.navigate(['dashboard/reportes/editar', id]);
  }

  eliminarReporte(id: string): void {
    if (confirm('¿Estás seguro de eliminar este reporte?')) {
      this.reportesService.eliminarReporte(id).subscribe(() => {
        this.reportes = this.reportes.map((r) =>
          r.id === id ? { ...r, estadoActual: 'ELIMINADO' } : r
        );
      });
    }
  }

  marcarComoResuelto(id: string): void {
    if (confirm('¿Deseas marcar este reporte como RESUELTO?')) {
      this.reportesService.cambiarEstado(id, 'RESUELTO').subscribe(() => {
        this.cargarMisReportes();
      });
    }
  }

  abrirImagen(url: string): void {
    this.imagenModal = url;
  }

  cerrarImagen(): void {
    this.imagenModal = null;
  }
}

