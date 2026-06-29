import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid py-4">
      <!-- Banner Principal -->
      <div class="row align-items-center mb-5 text-white rounded-4 p-5 shadow-sm" style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);">
        <div class="col-md-8">
          <h1 class="display-5 fw-bold mb-3">Bienvenido a Hotel Master</h1>
          <p class="lead mb-0 text-white-50">El sistema integral de gestión hotelera. Administra tus huéspedes, habitaciones y estadías de forma rápida y eficiente.</p>
        </div>
        <div class="col-md-4 text-center d-none d-md-block">
          <i class="bi bi-buildings" style="font-size: 7rem; opacity: 0.2;"></i>
        </div>
      </div>
      
      <!-- Tarjetas Informativas -->
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card border-0 shadow-sm h-100 rounded-4 text-center p-4 dashboard-card transition-hover">
            <i class="bi bi-people text-primary fs-1 mb-3"></i>
            <h5 class="fw-bold">Gestión de Huéspedes</h5>
            <p class="text-secondary small">Registra y administra la información de los clientes del hotel de manera centralizada.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-0 shadow-sm h-100 rounded-4 text-center p-4 dashboard-card transition-hover">
            <i class="bi bi-door-closed text-primary fs-1 mb-3"></i>
            <h5 class="fw-bold">Habitaciones</h5>
            <p class="text-secondary small">Controla el inventario, estado y disponibilidad de todos los cuartos del establecimiento.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-0 shadow-sm h-100 rounded-4 text-center p-4 dashboard-card transition-hover">
            <i class="bi bi-calendar-check text-primary fs-1 mb-3"></i>
            <h5 class="fw-bold">Reservas y Estadías</h5>
            <p class="text-secondary small">Conecta a los huéspedes con las habitaciones para sus estadías de forma intuitiva.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .transition-hover {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .transition-hover:hover {
      transform: translateY(-5px);
      box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important;
    }
  `]
})
export class HomeComponent {}
