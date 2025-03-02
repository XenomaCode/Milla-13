import { Producto } from './Producto';

export interface Postre extends Producto {
  disponibilidad: boolean;
  tamañoPorcion: string;
  ingredientes: string;
  tipo: 'postre';
}