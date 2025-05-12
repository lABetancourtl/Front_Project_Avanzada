import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportesService } from '../../../services/reportes.service';
import { ComentariosService } from '../../../services/comentarios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-reporte.component.html',
  styleUrls: ['./detalle-reporte.component.css']
})
export class DetalleReporteComponent implements OnInit {
  reporte: any;
  comentarios: any[] = [];
  nuevoComentario: string = '';

  constructor(
    private route: ActivatedRoute,
    private reportesService: ReportesService,
    private comentariosService: ComentariosService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.reportesService.obtenerReportesPorCiudad('Armenia').subscribe(reportes => {
      this.reporte = reportes.find((r: any) => r.id === id);
    });

    this.comentariosService.obtenerPorReporte(id).subscribe(data => {
      this.comentarios = data;
    });
  }

  agregarComentario() {
    const usuarioId = localStorage.getItem('userId')?.trim() || '';
    const idReporte = this.reporte?.id?.trim();

    if (!idReporte || idReporte.length !== 24) {
      console.error('❌ ID de reporte inválido:', idReporte);
      return;
    }

    if (!this.nuevoComentario.trim()) return;

    const payload = {
      mensaje: this.nuevoComentario,
      usuarioId
    };

    this.comentariosService.agregar(idReporte, payload).subscribe(() => {
      this.nuevoComentario = '';
      this.comentariosService.obtenerPorReporte(idReporte).subscribe(data => {
        this.comentarios = data;
      });
    });
  }
}
