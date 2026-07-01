import { Huesped } from './huesped.model'; // Ajusta la ruta según tu estructura de carpetas
import { Habitacion } from './habitacion.model';

export interface Estadia {
  idEstadia?: number;            
  huesped: Huesped;            
  habitacion: Habitacion;        
  fechaIngreso: Date | string;   
  fechaSalida: Date | string;    
  cantidadHuespedes: number;     
  totalPagar: number;            
}