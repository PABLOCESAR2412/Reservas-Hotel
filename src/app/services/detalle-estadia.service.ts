import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleEstadia } from '../models/detalle-servicio';

@Injectable({
  providedIn: 'root'
})
export class DetalleEstadiaService {
  private apiUrl = 'http://localhost:8081/api/detalle'; 

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getDetalles(): Observable<DetalleEstadia[]> {
    return this.http.get<DetalleEstadia[]>(this.apiUrl);
  }

  // Opcional y muy útil: Obtener todos los consumos/detalles de una estadía específica
  getDetallesPorEstadia(idEstadia: number): Observable<DetalleEstadia[]> {
    return this.http.get<DetalleEstadia[]>(`${this.apiUrl}/estadia/${idEstadia}`);
  }

  getDetalle(id: number): Observable<DetalleEstadia> {
    return this.http.get<DetalleEstadia>(`${this.apiUrl}/${id}`);
  }

  createDetalle(detalle: DetalleEstadia): Observable<DetalleEstadia> {
    return this.http.post<DetalleEstadia>(this.apiUrl, detalle, this.httpOptions);
  }

  updateDetalle(id: number, detalle: DetalleEstadia): Observable<DetalleEstadia> {
    return this.http.put<DetalleEstadia>(`${this.apiUrl}/${id}`, detalle, this.httpOptions);
  }

  deleteDetalle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}