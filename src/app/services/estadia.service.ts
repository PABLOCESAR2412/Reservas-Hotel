import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estadia } from '../models/estadia'; // Asegúrate de que tu modelo esté en esta ruta

@Injectable({
  providedIn: 'root'
})
export class EstadiaService {
  private apiUrl = 'http://localhost:8081/api/estadia';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getEstadias(): Observable<Estadia[]> {
    return this.http.get<Estadia[]>(this.apiUrl);
  }

  getEstadia(id: number): Observable<Estadia> {
    return this.http.get<Estadia>(`${this.apiUrl}/${id}`);
  }

  createEstadia(estadia: Estadia): Observable<Estadia> {
    return this.http.post<Estadia>(this.apiUrl, estadia, this.httpOptions);
  }

  updateEstadia(id: number, estadia: Estadia): Observable<Estadia> {
    return this.http.put<Estadia>(`${this.apiUrl}/${id}`, estadia, this.httpOptions);
  }

  deleteEstadia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}