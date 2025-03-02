import { Timestamp } from 'firebase/firestore';
import { Pedido } from './Pedido';

export interface Cliente {
  id?: string;
  nombre: string;
  correo: string;
  contraseña?: string; // No almacenar en Firestore, solo para autenticación
  historialPedidos?: string[]; // Referencias a IDs de pedidos
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}