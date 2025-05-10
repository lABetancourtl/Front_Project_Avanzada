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

  getCategorias(token: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Pasando el token en los headers
    });
    
    return this.http.get<any[]>(`http://localhost:8081/api/categorias/listar`, { headers });
  }
  
  
  
}