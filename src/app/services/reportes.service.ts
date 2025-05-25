import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private baseUrl = 'https://project-avanzada-zo88.onrender.com/api/reportes';

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

  obtenerReportePorId(id: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>(`${this.baseUrl}/${id}`, { headers });
  }

  actualizarReportePorId(id: string, data: any): Observable<any> {
  const token = localStorage.getItem('authToken');
  const headers = { Authorization: `Bearer ${token}` };
  return this.http.put<any>(`${this.baseUrl}/${id}`, data, { headers });
}




  listarMisReportes(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>(`${this.baseUrl}/mis`, { headers });

  }

  getCategorias(token: string): Observable<{ id: string; nombre: string }[]> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<{ id: string; nombre: string }[]>(`https://project-avanzada-zo88.onrender.com/api/categorias/listar`, { headers });
  }

}