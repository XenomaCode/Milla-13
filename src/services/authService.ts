import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  Timestamp 
} from 'firebase/firestore';
import { auth, db } from '@/firebase/config';

export type UserRole = 'user' | 'admin';

export interface User {
  uid: string;
  email: string;
  role: UserRole;
  nombre?: string;
  createdAt: Timestamp;
}

// Registro de usuario
export const registerUser = async (
  email: string, 
  password: string, 
  nombre: string
): Promise<User> => {
  try {
    // Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Crear documento de usuario en Firestore
    const userData: Omit<User, 'uid'> = {
      email: user.email!,
      role: 'user', // Por defecto, todos los usuarios nuevos son 'user'
      nombre,
      createdAt: Timestamp.now()
    };
    
    await setDoc(doc(db, 'users', user.uid), userData);
    
    return {
      uid: user.uid,
      ...userData
    };
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

// Inicio de sesión
export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    // Autenticar con Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Obtener datos adicionales del usuario desde Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('Usuario no encontrado en la base de datos');
    }
    
    const userData = userDoc.data() as Omit<User, 'uid'>;
    
    return {
      uid: user.uid,
      ...userData
    };
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

// Cerrar sesión
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

// Obtener usuario actual con datos de Firestore
export const getCurrentUser = async (firebaseUser: FirebaseUser): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    
    if (!userDoc.exists()) {
      return null;
    }
    
    const userData = userDoc.data() as Omit<User, 'uid'>;
    
    return {
      uid: firebaseUser.uid,
      ...userData
    };
  } catch (error) {
    console.error('Error al obtener usuario actual:', error);
    return null;
  }
};

// Verificar si un usuario es administrador
export const isAdmin = (user: User | null): boolean => {
  return user?.role === 'admin';
};
