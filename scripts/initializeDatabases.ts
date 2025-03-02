import { db } from '@/firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export const initializeDatabase = async () => {
  try {
    // Crear productos iniciales
    const productos = [
      {
        nombre: "Café Americano",
        precio: 50.0,
        cantidad: 100,
        descripcion: "Café negro tradicional",
        imagen: "/images/cafe-americano.jpg",
        disponible: true,
        tipo: "bebida" as const,
        createdAt: Timestamp.now()
      },
      {
        nombre: "Cappuccino",
        precio: 65.0,
        cantidad: 100,
        descripcion: "Café con espuma de leche",
        imagen: "/images/cappuccino.jpg",
        disponible: true,
        tipo: "bebida" as const,
        createdAt: Timestamp.now()
      },
      {
        nombre: "Brownie",
        precio: 30.0,
        cantidad: 20,
        descripcion: "Brownie de chocolate",
        imagen: "/images/brownie.jpg",
        disponible: true,
        tipo: "postre" as const,
        createdAt: Timestamp.now()
      }
    ];
    
    // Insertar productos
    for (const producto of productos) {
      await addDoc(collection(db, 'productos'), producto);
    }
    
    // Crear empleados iniciales
    const empleados = [
      {
        nombre: "Donovan Lara",
        correo: "donovanvincelara@gmail.com",
        rol: "admin" as const,
        salario: 8000,
        activo: true,
        createdAt: Timestamp.now()
      }
    ];
    
    // Insertar empleados
    for (const empleado of empleados) {
      await addDoc(collection(db, 'empleados'), empleado);
    }
    
    // Crear inventario inicial
    const inventario = [
      {
        nombreInsumo: "Granos de café",
        cantidad: 1,
        unidadMedida: "kg",
        stockMinimo: 2,
        proveedor: "blue flame",
        ultimaActualizacion: Timestamp.now(),
        createdAt: Timestamp.now()
      },
      {
        nombreInsumo: "Leche",
        cantidad: 12,
        unidadMedida: "L",
        stockMinimo: 5,
        proveedor: "Bove",
        ultimaActualizacion: Timestamp.now(),
        createdAt: Timestamp.now()
      }
    ];
    
    // Insertar inventario
    for (const item of inventario) {
      await addDoc(collection(db, 'inventario'), item);
    }
    
    console.log("Base de datos inicializada correctamente");
    return true;
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
    throw error;
  }
};