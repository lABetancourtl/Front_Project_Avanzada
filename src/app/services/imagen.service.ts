import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private readonly baseUrl = 'http://localhost:8081/api/imagenes'; 

  constructor(private http: HttpClient) {}

            subirImagen(file: any): Observable<string> {
            const token = localStorage.getItem('authToken');
            const headers = new HttpHeaders({
                Authorization: `Bearer ${token}`,
            });
            const formData = new FormData();
            formData.append('imagen', file);

            return this.http.post(this.baseUrl, formData, {
                headers,
                responseType: 'text' // importante
            });
            }


}
