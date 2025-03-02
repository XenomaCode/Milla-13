import { db } from '@/firebase/config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  orderBy, 
  Timestamp,
  updateDoc,
  doc,
  getDoc
} from 'firebase/firestore';
import { Empleado, RolEmpleado } from '@/models';

export const getEmpleados = async (rol?: RolEmpleado) => {
  try {
    let q;
    if (rol) {
      q = query(
        collection(db, 'empleados'), 
        where('rol', '==', rol),
        where('activo', '==', true),
        orderBy('nombre')
      );
    } else {
      q = query(
        collection(db, 'empleados'),
        where('activo', '==', true),
        orderBy('nombre')
      );
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Empleado[];
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    throw error;
  }
};

export const getEmpleadoById = async (empleadoId: string) => {
  try {
    const docRef = doc(db, 'empleados', empleadoId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Empleado;
    } else {
      throw new Error('Empleado no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener empleado:', error);
    throw error;
  }
};

export const createEmpleado = async (empleado: Omit<Empleado, 'id' | 'createdAt'>) => {
  try {
    const empleadoData = {
      ...empleado,
      activo: true,
      createdAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, 'empleados'), empleadoData);
    return docRef.id;
  } catch (error) {
    console.error('Error al crear empleado:', error);
    throw error;
  }
};

export const updateEmpleado = async (empleadoId: string, empleado: Partial<Empleado>) => {
  try {
    const empleadoRef = doc(db, 'empleados', empleadoId);
    await updateDoc(empleadoRef, {
      ...empleado,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
    throw error;
  }
};

export const desactivarEmpleado = async (empleadoId: string) => {
  try {
    const empleadoRef = doc(db, 'empleados', empleadoId);
    await updateDoc(empleadoRef, {
      activo: false,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error al desactivar empleado:', error);
    throw error;
  }
};
