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
import { Pedido, EstadoPedido, ProductoPedido } from '@/models';
import { ProductItem } from '@/types';

// Interfaces
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  pickupTime: string;
  notes?: string;
}

export interface Order {
  id?: string;
  customerInfo: CustomerInfo;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Timestamp;
}

// Crear un nuevo pedido
export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
  try {
    const order = {
      ...orderData,
      status: 'pending' as const,
      createdAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, 'orders'), order);
    return docRef.id;
  } catch (error) {
    console.error('Error al crear pedido:', error);
    throw error;
  }
};

// Obtener todos los pedidos
export const getOrders = async (status?: string) => {
  try {
    let q;
    
    if (status) {
      q = query(
        collection(db, 'orders'),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(
        collection(db, 'orders'),
        orderBy('createdAt', 'desc')
      );
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    throw error;
  }
};

// Obtener un pedido por ID
export const getOrderById = async (orderId: string) => {
  try {
    const docRef = doc(db, 'orders', orderId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Pedido no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener pedido:', error);
    throw error;
  }
};

// Actualizar el estado de un pedido
export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status
    });
    return true;
  } catch (error) {
    console.error('Error al actualizar estado del pedido:', error);
    throw error;
  }
};

// Función para enviar notificación por WhatsApp
const sendWhatsAppNotification = async (order: Order, orderId: string) => {
  // Aquí implementarías la lógica para enviar un mensaje por WhatsApp
  // Puedes usar servicios como Twilio, MessageBird o la API de WhatsApp Business
  
  // Ejemplo con fetch a un servicio hipotético:
  try {
    const message = `Nuevo pedido #${orderId}:\n` +
      `Cliente: ${order.customerInfo.name}\n` +
      `Teléfono: ${order.customerInfo.phone}\n` +
      `Hora de recogida: ${order.customerInfo.pickupTime}\n` +
      `Total: $${order.total.toFixed(2)}\n` +
      `Productos: ${order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}`;
    
    // Esta es una implementación de ejemplo. Necesitarás reemplazarla con tu servicio real.
    /*
    const response = await fetch('https://tu-servicio-whatsapp-api.com/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WHATSAPP_API_KEY}`
      },
      body: JSON.stringify({
        phone: 'tu-numero-de-telefono',
        message
      })
    });
    
    if (!response.ok) {
      throw new Error('Error al enviar notificación por WhatsApp');
    }
    */
    
    console.log('Notificación WhatsApp (simulada):', message);
    return true;
  } catch (error) {
    console.error('Error al enviar notificación por WhatsApp:', error);
    return false;
  }
};
