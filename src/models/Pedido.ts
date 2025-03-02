import { Timestamp } from 'firebase/firestore';
import { Producto } from './Producto';

export type EstadoPedido = 'pendiente' | 'en_proceso' | 'completado' | 'cancelado';

export interface Pedido {
  id?: string;
  clienteId: string;
  nombre: string;
  telefono: string;
  correo?: string;
  horaRecoleccion: string;
  notasAdicionales?: string;
  productos: ProductoPedido[];
  total: number;
  estado: EstadoPedido;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface ProductoPedido {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  tipo?: 'bebida' | 'postre' | 'otro';
}