import { Component } from '@angular/core';

interface Huesped {
  nombre: string;
  numeroPersonas: number;
  observaciones: string;
  habitacion: number;
}

@Component({
  selector: 'app-registro-huespedes',
  templateUrl: './registro-huespedes.component.html',
  styleUrls: ['./registro-huespedes.component.scss']
})
export class RegistroHuespedesComponent {
  habitacionesTotales = 12;
  registros: Huesped[] = [];

  nuevoRegistro: Huesped = {
    nombre: '',
    numeroPersonas: 1,
    observaciones: '',
    habitacion: 0
  };

  registrarHuesped() {
    if (this.registros.length < this.habitacionesTotales) {
      this.nuevoRegistro.habitacion = this.registros.length + 1;
      this.registros.push({ ...this.nuevoRegistro });
      this.nuevoRegistro = { nombre: '', numeroPersonas: 1, observaciones: '', habitacion: 0 };
    } else {
      alert('No hay habitaciones disponibles en QUITO AIRPORT SUITES.');
    }
  }
}
