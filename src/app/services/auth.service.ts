import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8081/api'; //Conexión al back

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    // Este endpoint dependerá si tienes autenticación implementada - PENDIENTE
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios`, data);
  }
}
