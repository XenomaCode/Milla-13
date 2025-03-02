import { Timestamp } from 'firebase/firestore';

export interface Inventario {
  id?: string;
  nombreInsumo: string;
  cantidad: number;
  unidadMedida: string;
  stockMinimo: number;
  proveedor: string;
  ultimaActualizacion: Timestamp;
  createdAt: Timestamp;
}