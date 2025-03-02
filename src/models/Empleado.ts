import { Timestamp } from 'firebase/firestore';

export type RolEmpleado = 'administrador' | 'barista' | 'cajero' | 'mesero';

export interface Empleado {
  id?: string;
  nombre: string;
  correo: string;
  rol: RolEmpleado;
  salario: number;
  activo: boolean;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}