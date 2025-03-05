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
  getDoc,
  deleteDoc
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Interfaces
export interface Producto {
  id?: string;
  nombre: string;
  precio: number;
  cantidad: number;
  descripcion: string;
  imagen: string;
  disponible: boolean;
  tipo: 'bebida' | 'postre' | 'comida';
  createdAt: Timestamp;
}

// Obtener todos los productos
export const getProducts = async (tipo?: 'bebida' | 'postre' | 'comida') => {
  try {
    let q;
    
    if (tipo) {
      q = query(
        collection(db, 'productos'),
        where('tipo', '==', tipo),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(
        collection(db, 'productos'),
        orderBy('createdAt', 'desc')
      );
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

// Obtener un producto por ID
export const getProductById = async (productId: string): Promise<Producto> => {
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

// Crear un nuevo producto
export const createProduct = async (productData: Omit<Producto, 'id' | 'createdAt'>, imageFile?: File) => {
  try {
    let imageUrl = productData.imagen;
    
    // Si hay un archivo de imagen, subirlo a Firebase Storage
    if (imageFile) {
      const storage = getStorage();
      const storageRef = ref(storage, `productos/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }
    
    const product = {
      ...productData,
      imagen: imageUrl,
      createdAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, 'productos'), product);
    return docRef.id;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

// Actualizar un producto
export const updateProduct = async (productId: string, productData: Partial<Producto>, imageFile?: File) => {
  try {
    let updateData = { ...productData };
    
    // Si hay un archivo de imagen, subirlo a Firebase Storage
    if (imageFile) {
      const storage = getStorage();
      
      // Primero, intentar eliminar la imagen anterior si existe
      try {
        const oldProduct = await getProductById(productId);
        if (oldProduct.imagen && oldProduct.imagen.includes('firebasestorage')) {
          const oldImageRef = ref(storage, oldProduct.imagen);
          await deleteObject(oldImageRef);
        }
      } catch (error) {
        console.warn('No se pudo eliminar la imagen anterior:', error);
      }
      
      // Subir la nueva imagen
      const storageRef = ref(storage, `productos/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);
      
      updateData.imagen = imageUrl;
    }
    
    const productRef = doc(db, 'productos', productId);
    await updateDoc(productRef, updateData);
    return true;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

// Eliminar un producto
export const deleteProduct = async (productId: string) => {
  try {
    // Primero, intentar eliminar la imagen si existe
    try {
      const product = await getProductById(productId);
      if (product.imagen && product.imagen.includes('firebasestorage')) {
        const storage = getStorage();
        const imageRef = ref(storage, product.imagen);
        await deleteObject(imageRef);
      }
    } catch (error) {
      console.warn('No se pudo eliminar la imagen:', error);
    }
    
    // Eliminar el documento
    await deleteDoc(doc(db, 'productos', productId));
    return true;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};