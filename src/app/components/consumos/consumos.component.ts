import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consumos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid py-2">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="h3 fw-bold mb-0 text-primary">Consumos</h2>
          <p class="text-secondary small mb-0">Gestiona los cargos extra a la cuenta de los huéspedes.</p>
        </div>
      </div>
      
      <div class="card shadow-sm border-0 rounded-4">
        <div class="card-body text-center py-5">
          <i class="bi bi-cart fs-1 text-secondary opacity-50 mb-3 d-block"></i>
          <h4 class="fw-medium text-secondary">Módulo en construcción</h4>
          <p class="text-muted">Pronto podrás registrar consumos desde aquí.</p>
        </div>
      </div>
    </div>
  `
})
export class ConsumosComponent {}
