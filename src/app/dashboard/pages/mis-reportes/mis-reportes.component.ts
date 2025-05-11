import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-reportes',
  standalone: true,
  templateUrl: './mis-reportes.component.html',
  styleUrls: ['./mis-reportes.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class MisReportesComponent implements OnInit {

  reportes: any[] = [];
  columnas: string[] = ['titulo', 'fecha', 'categoria', 'estado', 'acciones'];

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    this.reportesService.listarMisReportes().subscribe(data => {
      this.reportes = data.map((reporte: any) => ({
        ...reporte,
        estado: reporte.estadoActual ?? 'SIN ESTADO'
      }));
    });
  }

  editarReporte(id: string): void {
    alert('🛠️ Pendiente implementar redirección a editar: ' + id);
  }

  eliminarReporte(id: string): void {
    const confirmar = confirm('¿Estás seguro de eliminar este reporte?');
    if (confirmar) {
      this.reportesService.eliminarReporte(id).subscribe(() => {
        // Actualiza solo el estado en la tabla
        const index = this.reportes.findIndex(r => r.id === id);
        if (index !== -1) {
          this.reportes[index].estado = 'ELIMINADO';
        }
      });
    }
  }
}
