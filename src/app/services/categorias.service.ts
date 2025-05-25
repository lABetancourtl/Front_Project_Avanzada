import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria {
  id: string;
  nombre: string;
  icono: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private baseUrl = 'https://project-avanzada-zo88.onrender.com/api/categorias';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/listar`, { headers: this.getHeaders() });
  }

  crear(categoria: Partial<Categoria>): Observable<any> {
    return this.http.post(this.baseUrl, categoria, { headers: this.getHeaders() });
  }

  actualizar(id: string, categoria: Partial<Categoria>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, categoria, { headers: this.getHeaders() });
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}
