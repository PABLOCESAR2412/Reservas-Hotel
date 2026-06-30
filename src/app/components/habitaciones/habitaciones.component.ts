import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HabitacionService } from '../../services/habitacion.service';
import { Habitacion } from '../../models/habitacion.model';

@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container-fluid py-2">
      <!-- Mensajes de Alerta -->
      <div *ngIf="message.text" class="alert shadow-sm alert-dismissible fade show d-flex align-items-center" [ngClass]="'alert-' + message.type" role="alert">
        <i class="bi me-2 fs-5" [ngClass]="message.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'"></i>
        <div>{{ message.text }}</div>
        <button type="button" class="btn-close" (click)="message.text = ''"></button>
      </div>

      <!-- Encabezado -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="h3 fw-bold mb-0 text-primary">Gestión de Habitaciones</h2>
          <p class="text-secondary small mb-0">Controla el inventario, capacidad y disponibilidad de las habitaciones.</p>
        </div>
        <div class="d-flex gap-2">
          <button (click)="loadHabitaciones()" class="btn btn-outline-secondary shadow-sm d-flex align-items-center">
            <i class="bi bi-arrow-clockwise me-1"></i> Refrescar
          </button>
          <button (click)="openModal()" class="btn btn-primary-custom shadow-sm d-flex align-items-center">
            <i class="bi bi-plus-lg me-1"></i> Nueva Habitación
          </button>
        </div>
      </div>

      <!-- Tabla de Datos -->
      <div class="card shadow-sm border-0 rounded-4">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th class="ps-4 text-secondary fw-semibold border-bottom-0 py-3 rounded-top-start" style="width: 80px;">ID</th>
                  <th class="text-secondary fw-semibold border-bottom-0 py-3">Número</th>
                  <th class="text-secondary fw-semibold border-bottom-0 py-3">Piso</th>
                  <th class="text-secondary fw-semibold border-bottom-0 py-3">Capacidad</th>
                  <th class="text-secondary fw-semibold border-bottom-0 py-3">Estrellas</th>
                  <th class="text-secondary fw-semibold border-bottom-0 py-3">Estado</th>
                  <th class="text-end pe-4 text-secondary fw-semibold border-bottom-0 py-3 rounded-top-end">Acciones</th>
                </tr>
              </thead>
              <tbody class="border-top-0">
                <tr *ngFor="let h of habitaciones">
                  <td class="ps-4">
                    <span class="badge bg-secondary rounded-pill shadow-sm">#{{ h.idHabitacion }}</span>
                  </td>
                  <td class="fw-bold">{{ h.numero }}</td>
                  <td>Piso {{ h.piso }}</td>
                  <td>
                    <i class="bi bi-person-fill me-1 text-secondary"></i>{{ h.capacidad }}
                  </td>
                  <td>
                    <span class="text-warning">
                      <i class="bi bi-star-fill me-1" *ngFor="let s of getStarsArray(h.estrellas)"></i>
                    </span>
                  </td>
                  <td>
                    <span class="badge" 
                          [ngClass]="{
                            'bg-success': h.estado === 'DISPONIBLE',
                            'bg-danger': h.estado === 'OCUPADA',
                            'bg-warning text-dark': h.estado === 'EN MANTENIMIENTO'
                          }">
                      {{ h.estado }}
                    </span>
                  </td>
                  <td class="text-end pe-4">
                    <button (click)="openModal(h)" class="btn btn-sm btn-outline-primary me-2 shadow-sm" title="Editar">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button (click)="deleteHabitacion(h)" class="btn btn-sm btn-outline-danger shadow-sm" title="Eliminar">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr *ngIf="habitaciones.length === 0">
                  <td colspan="7" class="text-center py-5 text-secondary">
                    <i class="bi bi-door-closed fs-1 d-block mb-3 opacity-50"></i>
                    <p class="fs-5 fw-medium mb-1">No hay habitaciones registradas</p>
                    <p class="small mb-0">Haz clic en "Nueva Habitación" para empezar.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Modal de Formulario -->
      <div *ngIf="showModal" class="modal fade show" tabindex="-1" style="display: block; background-color: rgba(0,0,0,0.6); backdrop-filter: blur(4px);">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 shadow-lg rounded-4">
            <div class="modal-header border-bottom-0 pb-0 pt-4 px-4">
              <h5 class="modal-title fw-bold text-primary">
                {{ isEditing ? 'Editar Habitación #' + currentId : 'Registrar Nueva Habitación' }}
              </h5>
              <button type="button" class="btn-close" (click)="closeModal()"></button>
            </div>
            
            <form [formGroup]="habitacionForm" (ngSubmit)="saveHabitacion()">
              <div class="modal-body px-4 pt-4">
                <div class="row g-3">
                  <div class="col-sm-6">
                    <label class="form-label fw-semibold text-secondary small mb-1">Número</label>
                    <input formControlName="numero" type="text" class="form-control" placeholder="Ej: 101" [ngClass]="{'is-invalid': habitacionForm.get('numero')?.invalid && habitacionForm.get('numero')?.touched}">
                  </div>
                  <div class="col-sm-6">
                    <label class="form-label fw-semibold text-secondary small mb-1">Estado</label>
                    <select formControlName="estado" class="form-select" [ngClass]="{'is-invalid': habitacionForm.get('estado')?.invalid && habitacionForm.get('estado')?.touched}">
                      <option value="DISPONIBLE">DISPONIBLE</option>
                      <option value="OCUPADA">OCUPADA</option>
                      <option value="EN MANTENIMIENTO">EN MANTENIMIENTO</option>
                    </select>
                  </div>
                  <div class="col-sm-4">
                    <label class="form-label fw-semibold text-secondary small mb-1">Piso</label>
                    <input formControlName="piso" type="number" class="form-control" [ngClass]="{'is-invalid': habitacionForm.get('piso')?.invalid && habitacionForm.get('piso')?.touched}">
                  </div>
                  <div class="col-sm-4">
                    <label class="form-label fw-semibold text-secondary small mb-1">Estrellas</label>
                    <input formControlName="estrellas" type="number" min="1" max="5" class="form-control" [ngClass]="{'is-invalid': habitacionForm.get('estrellas')?.invalid && habitacionForm.get('estrellas')?.touched}">
                  </div>
                  <div class="col-sm-4">
                    <label class="form-label fw-semibold text-secondary small mb-1">Capacidad</label>
                    <input formControlName="capacidad" type="number" min="1" class="form-control" [ngClass]="{'is-invalid': habitacionForm.get('capacidad')?.invalid && habitacionForm.get('capacidad')?.touched}">
                  </div>
                </div>
              </div>
              
              <div class="modal-footer border-top-0 px-4 pb-4 pt-3">
                <button type="button" class="btn btn-secondary shadow-sm" (click)="closeModal()">Cancelar</button>
                <button type="submit" [disabled]="habitacionForm.invalid" class="btn btn-primary-custom px-4 shadow-sm">
                  {{ isEditing ? 'Actualizar' : 'Guardar' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HabitacionesComponent implements OnInit {
  private habitacionService = inject(HabitacionService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  habitaciones: Habitacion[] = [];
  showModal = false;
  isEditing = false;
  currentId?: number;

  message: {text: string, type: 'success' | 'danger' | ''} = {text: '', type: ''};

  habitacionForm: FormGroup = this.fb.group({
    numero: ['', Validators.required],
    estado: ['DISPONIBLE', Validators.required],
    piso: [1, [Validators.required, Validators.min(0)]],
    estrellas: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
    capacidad: [2, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    this.loadHabitaciones();
  }

  getStarsArray(estrellas: number): number[] {
    return Array(estrellas || 0).fill(0);
  }

  showMessage(text: string, type: 'success' | 'danger'): void {
    this.message = {text, type};
    this.cdr.detectChanges();
    setTimeout(() => {
      this.message = {text: '', type: ''};
      this.cdr.detectChanges();
    }, 4000);
  }

  loadHabitaciones(): void {
    this.habitacionService.getHabitaciones().subscribe({
      next: (data) => {
        this.habitaciones = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando habitaciones', err);
        this.showMessage('No se pudo conectar al backend.', 'danger');
        this.cdr.detectChanges();
      }
    });
  }

  openModal(habitacion?: Habitacion): void {
    this.showModal = true;
    if (habitacion) {
      this.isEditing = true;
      this.currentId = habitacion.idHabitacion;
      this.habitacionForm.patchValue(habitacion);
    } else {
      this.isEditing = false;
      this.currentId = undefined;
      this.habitacionForm.reset({
        estado: 'DISPONIBLE',
        piso: 1,
        estrellas: 3,
        capacidad: 2
      });
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.habitacionForm.reset();
  }

  saveHabitacion(): void {
    if (this.habitacionForm.invalid) {
      this.habitacionForm.markAllAsTouched();
      return;
    }

    const data: Habitacion = this.habitacionForm.value;

    if (this.isEditing && this.currentId) {
      this.habitacionService.updateHabitacion(this.currentId, data).subscribe({
        next: () => {
          this.loadHabitaciones();
          this.closeModal();
          this.showMessage('Habitación actualizada correctamente.', 'success');
        },
        error: (err) => {
          console.error('Error actualizando', err);
          this.showMessage('Error 400: Revisa tu consola de Spring Boot.', 'danger');
        }
      });
    } else {
      this.habitacionService.createHabitacion(data).subscribe({
        next: () => {
          this.loadHabitaciones();
          this.closeModal();
          this.showMessage('Habitación registrada exitosamente.', 'success');
        },
        error: (err) => {
          console.error('Error creando', err);
          this.showMessage('Error 400: Revisa tu consola de Spring Boot.', 'danger');
        }
      });
    }
  }

  deleteHabitacion(habitacion: Habitacion): void {
    if (confirm(`¿Eliminar la habitación ${habitacion.numero}?`)) {
      if (habitacion.idHabitacion) {
        this.habitacionService.deleteHabitacion(habitacion.idHabitacion).subscribe({
          next: () => {
            this.loadHabitaciones();
            this.showMessage('Habitación eliminada.', 'success');
          },
          error: (err) => {
            console.error('Error eliminando', err);
            this.showMessage('Error al eliminar.', 'danger');
          }
        });
      }
    }
  }
}
