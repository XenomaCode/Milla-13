import { db } from '@/firebase/config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  Timestamp,
  updateDoc,
  doc,
  getDoc
} from 'firebase/firestore';
import { Inventario } from '@/models';

export const getInventario = async () => {
  try {
    const q = query(
      collection(db, 'inventario'), 
      orderBy('nombreInsumo')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Inventario[];
  } catch (error) {
    console.error('Error al obtener inventario:', error);
    throw error;
  }
};

export const getInsumoById = async (insumoId: string) => {
  try {
    const docRef = doc(db, 'inventario', insumoId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Inventario;
    } else {
      throw new Error('Insumo no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener insumo:', error);
    throw error;
  }
};

export const createInsumo = async (insumo: Omit<Inventario, 'id' | 'createdAt' | 'ultimaActualizacion'>) => {
  try {
    const timestamp = Timestamp.now();
    const insumoData = {
      ...insumo,
      ultimaActualizacion: timestamp,
      createdAt: timestamp
    };
    
    const docRef = await addDoc(collection(db, 'inventario'), insumoData);
    return docRef.id;
  } catch (error) {
    console.error('Error al crear insumo:', error);
    throw error;
  }
};

export const updateInsumo = async (insumoId: string, insumo: Partial<Inventario>) => {
  try {
    const insumoRef = doc(db, 'inventario', insumoId);
    await updateDoc(insumoRef, {
      ...insumo,
      ultimaActualizacion: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error al actualizar insumo:', error);
    throw error;
  }
};

export const actualizarStock = async (insumoId: string, nuevaCantidad: number) => {
  try {
    const insumoRef = doc(db, 'inventario', insumoId);
    await updateDoc(insumoRef, {
      cantidad: nuevaCantidad,
      ultimaActualizacion: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error al actualizar stock:', error);
    throw error;
  }
};
