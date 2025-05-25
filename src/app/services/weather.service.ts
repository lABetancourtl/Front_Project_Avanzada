import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiUrl = 'https://project-avanzada-zo88.onrender.com/api/weather';  

  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number): Observable<string> {
  const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString());

    
    return this.http.get(this.apiUrl, { params, headers, responseType: 'text' });
  }
}
