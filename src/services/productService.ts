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
  deleteDoc,
  getDoc
} from 'firebase/firestore';
import { Producto, Bebida, Postre } from '@/models';

export const getProducts = async (tipo?: 'bebida' | 'postre' | 'otro') => {
  try {
    let q;
    if (tipo) {
      q = query(
        collection(db, 'productos'), 
        where('tipo', '==', tipo),
        where('disponible', '==', true),
        orderBy('nombre')
      );
    } else {
      q = query(
        collection(db, 'productos'),
        where('disponible', '==', true),
        orderBy('nombre')
      );
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Producto[];
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const getProductById = async (productId: string) => {
  try {
    const docRef = doc(db, 'productos', productId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Producto;
    } else {
      throw new Error('Producto no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener producto:', error);
    throw error;
  }
};

export const createProduct = async (product: Omit<Producto, 'id' | 'createdAt'>) => {
  try {
    const productData = {
      ...product,
      createdAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, 'productos'), productData);
    return docRef.id;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

export const updateProduct = async (productId: string, product: Partial<Producto>) => {
  try {
    const productRef = doc(db, 'productos', productId);
    await updateDoc(productRef, {
      ...product,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    // En lugar de eliminar, marcamos como no disponible
    const productRef = doc(db, 'productos', productId);
    await updateDoc(productRef, {
      disponible: false,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};
