import { Component, OnInit } from '@angular/core';
import { MapaService } from '../../../services/mapa.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  imports: []
})
export class InicioComponent implements OnInit {

  constructor(private mapaService: MapaService) {}

  ngOnInit(): void {
    this.mapaService.crearMapa();
  }
}
