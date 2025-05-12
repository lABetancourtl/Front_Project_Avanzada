import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private baseUrl = 'http://localhost:8081/api/comentarios';

  constructor(private http: HttpClient) {}

  obtenerPorReporte(idReporte: string): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any[]>(`${this.baseUrl}/${idReporte}`, { headers });
  }

  agregar(idReporte: string, comentario: { mensaje: string; usuarioId: string }): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/${idReporte}`, comentario, { headers });
  }
}
