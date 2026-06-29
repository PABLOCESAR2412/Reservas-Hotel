import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HuespedService } from '../../services/huesped.service';
import { Huesped } from '../../models/huesped.model';

@Component({
  selector: 'app-huespedes',
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
          <h2 class="h3 fw-bold mb-0 text-primary">Gestión de Huéspedes</h2>
          <p class="text-secondary small mb-0">Administra los huéspedes registrados en el hotel.</p>
        </div>
        <div class="d-flex gap-2">
          <button (click)="loadHuespedes()" class="btn btn-outline-secondary shadow-sm d-flex align-items-center">
            <i class="bi bi-arrow-clockwise me-1"></i> Refrescar
          </button>
          <button (click)="openModal()" class="btn btn-primary-custom shadow-sm d-flex align-items-center">
            <i class="bi bi-plus-lg me-1"></i> Nuevo Huésped
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
                  <th class="text-secondary fw-semibold border-bottom-0 py-3">Cédula</th>
                  <th class="text-secondary fw-semibold border-bottom-0 py-3">Nombre</th>
                  <th class="text-secondary fw-semibold border-bottom-0 py-3">Apellido</th>
                  <th class="text-secondary fw-semibold border-bottom-0 py-3">Teléfono</th>
                  <th class="text-end pe-4 text-secondary fw-semibold border-bottom-0 py-3 rounded-top-end">Acciones</th>
                </tr>
              </thead>
              <tbody class="border-top-0">
                <tr *ngFor="let h of huespedes">
                  <td class="ps-4">
                    <span class="badge bg-secondary rounded-pill shadow-sm">#{{ h.idHuesped }}</span>
                  </td>
                  <td class="fw-medium">{{ h.cedula }}</td>
                  <td>{{ h.nombre }}</td>
                  <td>{{ h.apellido }}</td>
                  <td>{{ h.telefono }}</td>
                  <td class="text-end pe-4">
                    <button (click)="openModal(h)" class="btn btn-sm btn-outline-primary me-2 shadow-sm" title="Editar">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button (click)="deleteHuesped(h)" class="btn btn-sm btn-outline-danger shadow-sm" title="Eliminar">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr *ngIf="huespedes.length === 0">
                  <td colspan="6" class="text-center py-5 text-secondary">
                    <i class="bi bi-inbox fs-1 d-block mb-3 opacity-50"></i>
                    <p class="fs-5 fw-medium mb-1">No hay huéspedes registrados</p>
                    <p class="small mb-0">Comienza agregando un nuevo huésped al sistema.</p>
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
                {{ isEditing ? 'Editar Huésped #' + currentId : 'Registrar Nuevo Huésped' }}
              </h5>
              <button type="button" class="btn-close" (click)="closeModal()"></button>
            </div>
            
            <form [formGroup]="huespedForm" (ngSubmit)="saveHuesped()">
              <div class="modal-body px-4 pt-4">
                <div class="row g-3">
                  <div class="col-12">
                    <label class="form-label fw-semibold text-secondary small mb-1">Cédula</label>
                    <input formControlName="cedula" (input)="allowOnlyNumbers($event, 'cedula')" type="text" maxlength="10" class="form-control" [ngClass]="{'is-invalid': huespedForm.get('cedula')?.invalid && huespedForm.get('cedula')?.touched}">
                    <div class="invalid-feedback" *ngIf="huespedForm.get('cedula')?.hasError('pattern')">
                      La cédula solo debe contener números.
                    </div>
                    <div class="invalid-feedback" *ngIf="huespedForm.get('cedula')?.hasError('required') && !huespedForm.get('cedula')?.hasError('pattern')">
                      La cédula es requerida.
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="form-label fw-semibold text-secondary small mb-1">Nombre</label>
                    <input formControlName="nombre" (input)="allowOnlyLetters($event, 'nombre')" type="text" class="form-control" [ngClass]="{'is-invalid': huespedForm.get('nombre')?.invalid && huespedForm.get('nombre')?.touched}">
                    <div class="invalid-feedback" *ngIf="huespedForm.get('nombre')?.hasError('pattern')">Solo se permiten letras.</div>
                    <div class="invalid-feedback" *ngIf="huespedForm.get('nombre')?.hasError('required') && !huespedForm.get('nombre')?.hasError('pattern')">Requerido.</div>
                  </div>
                  <div class="col-sm-6">
                    <label class="form-label fw-semibold text-secondary small mb-1">Apellido</label>
                    <input formControlName="apellido" (input)="allowOnlyLetters($event, 'apellido')" type="text" class="form-control" [ngClass]="{'is-invalid': huespedForm.get('apellido')?.invalid && huespedForm.get('apellido')?.touched}">
                    <div class="invalid-feedback" *ngIf="huespedForm.get('apellido')?.hasError('pattern')">Solo se permiten letras.</div>
                    <div class="invalid-feedback" *ngIf="huespedForm.get('apellido')?.hasError('required') && !huespedForm.get('apellido')?.hasError('pattern')">Requerido.</div>
                  </div>
                  <div class="col-12">
                    <label class="form-label fw-semibold text-secondary small mb-1">Teléfono</label>
                    <input formControlName="telefono" (input)="allowOnlyNumbers($event, 'telefono')" type="text" maxlength="10" class="form-control" [ngClass]="{'is-invalid': huespedForm.get('telefono')?.invalid && huespedForm.get('telefono')?.touched}">
                    <div class="invalid-feedback" *ngIf="huespedForm.get('telefono')?.hasError('pattern')">Debe contener exactamente 10 números.</div>
                    <div class="invalid-feedback" *ngIf="huespedForm.get('telefono')?.hasError('required') && !huespedForm.get('telefono')?.hasError('pattern')">Requerido.</div>
                  </div>
                </div>
              </div>
              
              <div class="modal-footer border-top-0 px-4 pb-4 pt-3">
                <button type="button" class="btn btn-secondary shadow-sm" (click)="closeModal()">Cancelar</button>
                <button type="submit" [disabled]="huespedForm.invalid" class="btn btn-primary-custom px-4 shadow-sm">
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
export class HuespedesComponent implements OnInit {
  private huespedService = inject(HuespedService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  huespedes: Huesped[] = [];
  showModal = false;
  isEditing = false;
  currentId?: number;

  message: {text: string, type: 'success' | 'danger' | ''} = {text: '', type: ''};

  huespedForm: FormGroup = this.fb.group({
    cedula: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
    apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
    telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
  });

  ngOnInit(): void {
    this.loadHuespedes();
  }

  allowOnlyNumbers(event: any, controlName: string): void {
    const input = event.target;
    let newValue = input.value.replace(/[^0-9]/g, '');
    this.huespedForm.get(controlName)?.setValue(newValue, { emitEvent: false });
    input.value = newValue;
  }

  allowOnlyLetters(event: any, controlName: string): void {
    const input = event.target;
    let newValue = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '');
    this.huespedForm.get(controlName)?.setValue(newValue, { emitEvent: false });
    input.value = newValue;
  }

  showMessage(text: string, type: 'success' | 'danger'): void {
    this.message = {text, type};
    setTimeout(() => {
      this.message = {text: '', type: ''};
    }, 4000);
  }

  loadHuespedes(): void {
    this.huespedService.getHuespedes().subscribe({
      next: (data) => {
        this.huespedes = data;
        this.cdr.detectChanges(); // Fuerza a Angular a actualizar la tabla
      },
      error: (err) => {
        console.error('Error cargando huéspedes', err);
        this.showMessage('No se pudo conectar al backend (localhost:8081). Revisa tu consola de Spring Boot.', 'danger');
        this.cdr.detectChanges();
      }
    });
  }

  openModal(huesped?: Huesped): void {
    this.showModal = true;
    if (huesped) {
      this.isEditing = true;
      this.currentId = huesped.idHuesped;
      this.huespedForm.patchValue(huesped);
    } else {
      this.isEditing = false;
      this.currentId = undefined;
      this.huespedForm.reset();
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.huespedForm.reset();
  }

  saveHuesped(): void {
    if (this.huespedForm.invalid) {
      this.huespedForm.markAllAsTouched();
      return;
    }

    const huespedData: Huesped = this.huespedForm.value;
    console.log("JSON exacto que Angular está enviando al backend:", JSON.stringify(huespedData, null, 2));

    if (this.isEditing && this.currentId) {
      this.huespedService.updateHuesped(this.currentId, huespedData).subscribe({
        next: () => {
          this.loadHuespedes();
          this.closeModal();
          this.showMessage('¡El huésped fue actualizado correctamente!', 'success');
        },
        error: (err) => {
          console.error('Error actualizando', err);
          this.showMessage('Error 400: Revisa la consola de Spring Boot para ver qué validación falló.', 'danger');
        }
      });
    } else {
      this.huespedService.createHuesped(huespedData).subscribe({
        next: () => {
          this.loadHuespedes();
          this.closeModal();
          this.showMessage('¡El huésped fue registrado exitosamente!', 'success');
        },
        error: (err) => {
          console.error('Error creando', err);
          this.showMessage('Error 400: Revisa la consola de Spring Boot para ver qué validación falló.', 'danger');
        }
      });
    }
  }

  deleteHuesped(huesped: Huesped): void {
    if (confirm(`¿Estás seguro de que deseas eliminar permanentemente a ${huesped.nombre} ${huesped.apellido}?`)) {
      if(huesped.idHuesped) {
        this.huespedService.deleteHuesped(huesped.idHuesped).subscribe({
          next: () => {
            this.loadHuespedes();
            this.showMessage('El huésped ha sido eliminado del sistema.', 'success');
          },
          error: (err) => {
            console.error('Error eliminando', err);
            this.showMessage('Hubo un error al intentar eliminar el huésped.', 'danger');
          }
        });
      }
    }
  }
}
