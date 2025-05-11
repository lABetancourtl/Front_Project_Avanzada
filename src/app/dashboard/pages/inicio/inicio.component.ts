import { Component, OnInit } from '@angular/core';
import { MapaService } from '../../../services/mapa.service';
import { ReportesService } from '../../../services/reportes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  imports: []
})
export class InicioComponent implements OnInit {

  constructor(
    private mapaService: MapaService,
    private reportesService: ReportesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.router.url === '/dashboard') {
      this.mapaService.crearMapa();

      const ciudad = 'Armenia';
      this.reportesService.obtenerReportesPorCiudad(ciudad).subscribe(reportes => {
        this.mapaService.pintarMarcadores(reportes);
      });
    }
  }
}
