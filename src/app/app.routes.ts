import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
    pathMatch: 'full'
  },
  { 
    path: 'huespedes', 
    loadComponent: () => import('./components/huespedes/huespedes.component').then(m => m.HuespedesComponent) 
  },
  {
    path: 'estadias',
    loadComponent: () => import('./components/estadias/estadias.component').then(m => m.EstadiasComponent)
  },
  {
    path: 'habitaciones',
    loadComponent: () => import('./components/habitaciones/habitaciones.component').then(m => m.HabitacionesComponent)
  },
  {
    path: 'servicios',
    loadComponent: () => import('./components/servicios/servicios.component').then(m => m.ServiciosComponent)
  },
  {
    path: 'consumos',
    loadComponent: () => import('./components/consumos/consumos.component').then(m => m.ConsumosComponent)
  }
];

