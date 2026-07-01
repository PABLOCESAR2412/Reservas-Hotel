import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogoServicio } from '../models/catalogo-servicio'; // <- Revisa que esta ruta y nombre coincidan con tu archivo en models

@Injectable({
  providedIn: 'root'
})
export class CatalogoServicioService {
  private apiUrl = 'http://localhost:8081/api/catalogo-servicio';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getServicios(): Observable<CatalogoServicio[]> {
    return this.http.get<CatalogoServicio[]>(this.apiUrl);
  }

  getServicio(id: number): Observable<CatalogoServicio> {
    return this.http.get<CatalogoServicio>(`${this.apiUrl}/${id}`);
  }

  createServicio(servicio: CatalogoServicio): Observable<CatalogoServicio> {
    return this.http.post<CatalogoServicio>(this.apiUrl, servicio, this.httpOptions);
  }

  updateServicio(id: number, servicio: CatalogoServicio): Observable<CatalogoServicio> {
    return this.http.put<CatalogoServicio>(`${this.apiUrl}/${id}`, servicio, this.httpOptions);
  }

  deleteServicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}