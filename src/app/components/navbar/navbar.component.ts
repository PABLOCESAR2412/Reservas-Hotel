import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="d-flex flex-column flex-shrink-0 p-3 text-white shadow custom-sidebar" style="width: 260px; min-height: 100vh;">
      <a routerLink="/" class="d-flex align-items-center mb-4 mt-2 me-md-auto text-white text-decoration-none">
        <i class="bi bi-building fs-3 me-3 text-info"></i>
        <span class="fs-4 fw-bold tracking-wider">Hotel Master</span>
      </a>
      
      <ul class="nav nav-pills flex-column mb-auto gap-2">
        <li class="nav-item">
          <a routerLink="/" [routerLinkActiveOptions]="{exact: true}" routerLinkActive="active-nav" class="nav-link text-white d-flex align-items-center py-3">
            <i class="bi bi-house fs-5 me-3"></i> Inicio
          </a>
        </li>
        <li class="nav-item">
          <a routerLink="/estadias" routerLinkActive="active-nav" class="nav-link text-white d-flex align-items-center py-3">
            <i class="bi bi-calendar-check fs-5 me-3"></i> Estadías
          </a>
        </li>
        <li class="nav-item">
          <a routerLink="/huespedes" routerLinkActive="active-nav" class="nav-link text-white d-flex align-items-center py-3">
            <i class="bi bi-people fs-5 me-3"></i> Huéspedes
          </a>
        </li>
        <li class="nav-item">
          <a routerLink="/habitaciones" routerLinkActive="active-nav" class="nav-link text-white d-flex align-items-center py-3">
            <i class="bi bi-door-closed fs-5 me-3"></i> Habitaciones
          </a>
        </li>
        <li class="nav-item">
          <a routerLink="/servicios" routerLinkActive="active-nav" class="nav-link text-white d-flex align-items-center py-3">
            <i class="bi bi-list-stars fs-5 me-3"></i> Catálogo
          </a>
        </li>
        <li class="nav-item">
          <a routerLink="/consumos" routerLinkActive="active-nav" class="nav-link text-white d-flex align-items-center py-3">
            <i class="bi bi-cart fs-5 me-3"></i> Consumos
          </a>
        </li>
      </ul>
      <hr class="text-white-50 border-secondary">
      
      <!-- Modo oscuro switch adaptado -->
      <div class="d-flex justify-content-between align-items-center mb-3 px-2">
        <span class="small text-white-50 fw-semibold">Apariencia</span>
        <button (click)="toggleDarkMode()" class="btn btn-sm btn-outline-light rounded-pill border-0 d-flex align-items-center transition-colors">
          <i class="bi me-2" [ngClass]="isDarkMode ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill'"></i>
          {{ isDarkMode ? 'Claro' : 'Oscuro' }}
        </button>
      </div>

      <div class="text-center text-white-50 small">
        &copy; 2026 Hotel Master
      </div>
    </nav>
  `,
  styles: [`
    .active-nav {
      background-color: rgba(255, 255, 255, 0.15) !important;
      font-weight: 600;
      border-left: 4px solid #60a5fa;
      border-radius: 4px 8px 8px 4px !important;
    }
    .nav-link:hover:not(.active-nav) {
      background-color: rgba(255,255,255,0.08);
    }
    .nav-link {
      transition: all 0.2s;
      border-radius: 8px;
    }
  `]
})
export class NavbarComponent {
  isDarkMode = false;

  constructor() {
    if (typeof document !== 'undefined') {
      this.isDarkMode = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }
}
