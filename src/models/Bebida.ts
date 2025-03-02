import { Producto } from './Producto';

export type TamañoBebida = '10oz' | '12oz' | '16oz';

export interface Bebida extends Producto {
  tamaño: TamañoBebida;
  descripcion: string;
  tipo: 'bebida';
}