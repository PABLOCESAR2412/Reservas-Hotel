import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estadias',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid py-2">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="h3 fw-bold mb-0 text-primary">Gestión de Estadías</h2>
          <p class="text-secondary small mb-0">Administra el check-in, check-out y el estado de los huéspedes en las habitaciones.</p>
        </div>
      </div>
      
      <div class="card shadow-sm border-0 rounded-4">
        <div class="card-body text-center py-5">
          <i class="bi bi-calendar-check fs-1 text-secondary opacity-50 mb-3 d-block"></i>
          <h4 class="fw-medium text-secondary">Módulo en construcción</h4>
          <p class="text-muted">Pronto podrás asignar habitaciones a los huéspedes desde aquí.</p>
        </div>
      </div>
    </div>
  `
})
export class EstadiasComponent {}
