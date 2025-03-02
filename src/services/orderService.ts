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
  doc
} from 'firebase/firestore';
import { Pedido, EstadoPedido, ProductoPedido } from '@/models';
import { ProductItem } from '@/types';

interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  pickupTime: string;
  notes: string;
}

interface Order {
  items: ProductItem[];
  customerInfo: CustomerInfo;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Timestamp;
}

export const createOrder = async (
  items: ProductItem[], 
  customerInfo: CustomerInfo, 
  total: number
) => {
  try {
    const orderData: Order = {
      items,
      customerInfo,
      total,
      status: 'pending',
      createdAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, 'orders'), orderData);
    
    // Aquí puedes agregar la lógica para enviar notificación por WhatsApp
    await sendWhatsAppNotification(orderData, docRef.id);
    
    return docRef.id;
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    throw error;
  }
};

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

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { status });
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
