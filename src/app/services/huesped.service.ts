import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Huesped } from '../models/huesped.model';

@Injectable({
  providedIn: 'root'
})
export class HuespedService {
  private apiUrl = 'http://localhost:8081/api/huesped';

  // Forzamos explícitamente los headers que Postman usa por defecto
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getHuespedes(): Observable<Huesped[]> {
    return this.http.get<Huesped[]>(this.apiUrl);
  }

  getHuesped(id: number): Observable<Huesped> {
    return this.http.get<Huesped>(`${this.apiUrl}/${id}`);
  }

  createHuesped(huesped: Huesped): Observable<Huesped> {
    return this.http.post<Huesped>(this.apiUrl, huesped, this.httpOptions);
  }

  updateHuesped(id: number, huesped: Huesped): Observable<Huesped> {
    return this.http.put<Huesped>(`${this.apiUrl}/${id}`, huesped, this.httpOptions);
  }

  deleteHuesped(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
