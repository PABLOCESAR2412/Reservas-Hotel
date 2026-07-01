import { Estadia } from './estadia';
import { CatalogoServicio } from './catalogo-servicio';

export interface DetalleEstadia {
  idDetalle?: number;
  estadia: Estadia;
  catalogo: CatalogoServicio;
  cantidad: number;
  subtotal: number;
}