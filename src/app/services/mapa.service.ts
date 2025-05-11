import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import mapboxgl, { LngLatLike } from 'mapbox-gl';

@Injectable({
 providedIn: 'root'
})
export class MapaService {
 mapa: any;
 marcadores: any[];
 posicionActual: LngLatLike;
 constructor() {
   this.marcadores = [];
   this.posicionActual = [-75.67270, 4.53252];
 }

 public crearMapa() {
   this.mapa = new mapboxgl.Map({
     accessToken: 'pk.eyJ1Ijoic3RldmVuejAyIiwiYSI6ImNtOTNpbHA5MDBucGgyc3B3aGc3NGVjMTIifQ.sWpwCMBLsMpYLuT4MVQ4OA',
     container: 'mapa',
     style: 'mapbox://styles/mapbox/standard',
     center: this.posicionActual,
     pitch: 45,
     zoom: 17
   });
   this.mapa.addControl(new mapboxgl.NavigationControl());
   this.mapa.addControl(
     new mapboxgl.GeolocateControl({
       positionOptions: { enableHighAccuracy: true },
       trackUserLocation: true
     })
   );
 }

 public agregarMarcador(): Observable<any> {
   const mapaGlobal = this.mapa;
   const marcadores = this.marcadores;
   return new Observable<any>(observer => {
     mapaGlobal.on('click', function (e: any) {
       marcadores.forEach(marcador => marcador.remove());
       const marcador = new mapboxgl.Marker({color: 'red'})
         .setLngLat([e.lngLat.lng, e.lngLat.lat])
         .addTo(mapaGlobal);
       marcadores.push(marcador);
       observer.next(marcador.getLngLat());
     });
   });
 }
pintarMarcadores(reportes: any[]) {
  reportes.forEach(reporte => {
    const popupHtml = `
      <strong>${reporte.titulo}</strong><br>
      <em>${reporte.descripcion}</em><br>
      <span>Estado: <b>${reporte.estadoActual || 'Activo'}</b></span><br>
      <small>Categoría: ${reporte.nombreCategoria}</small>
    `;

    new mapboxgl.Marker({
      color: reporte.estadoActual === 'ELIMINADO' ? 'gray' : 'red'
    })
    .setLngLat([reporte.ubicacion.longitud, reporte.ubicacion.latitud])
    .setPopup(new mapboxgl.Popup().setHTML(popupHtml))
    .addTo(this.mapa);
  });
}
}