import { Timestamp } from 'firebase/firestore';

export interface Producto {
  id?: string | number;
  nombre: string;
  precio: number;
  cantidad: number;
  descripcion?: string;
  imagen?: string;
  disponible: boolean;
  tipo: 'bebida' | 'postre' | 'otro';
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}