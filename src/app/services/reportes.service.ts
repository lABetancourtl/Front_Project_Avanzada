import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private baseUrl = 'http://localhost:8081/api/reportes';

  constructor(private http: HttpClient) {}

  crearReporte(data: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/crear`, data, { headers });
  }

    editarReporte(id: string, data: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.put(`${this.baseUrl}/${id}`, data, { headers });
  }

  eliminarReporte(id: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }

  cambiarEstado(id: string, nuevoEstado: string): Observable<any> {
  const token = localStorage.getItem('authToken');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  return this.http.put(`${this.baseUrl}/api/reportes/${id}/estado`, { nuevoEstado }, { headers });
}

  obtenerReportesPorCiudad(ciudad: string): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>(`${this.baseUrl}/reportes/ciudad?nombreCiudad=${ciudad}`, { headers });
  }

  listarMisReportes(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>(`${this.baseUrl}/mis`, { headers });

  }

  getCategorias(token: string): Observable<{ id: string; nombre: string }[]> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<{ id: string; nombre: string }[]>(`http://localhost:8081/api/categorias/listar`, { headers });
  }

}