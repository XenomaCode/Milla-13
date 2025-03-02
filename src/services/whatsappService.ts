interface OrderDetails {
    customerInfo: {
      name: string;
      phone: string;
      email: string;
      pickupTime: string;
      notes?: string;
    };
    items: Array<{
      id: number;
      name: string;
      quantity: number;
      price: number;
    }>;
    total: number;
  }
  
  export const sendWhatsAppNotification = async (orderId: string, orderDetails: OrderDetails) => {
    try {
      // Formatear el mensaje
      const message = `Nuevo pedido #${orderId}:\n` +
        `Cliente: ${orderDetails.customerInfo.name}\n` +
        `Teléfono: ${orderDetails.customerInfo.phone}\n` +
        `Hora de recogida: ${orderDetails.customerInfo.pickupTime}\n` +
        `Total: $${orderDetails.total.toFixed(2)}\n` +
        `Productos: ${orderDetails.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}`;
      
      // Aquí implementarías la lógica para enviar el mensaje por WhatsApp
      // Usando un servicio como Twilio, MessageBird o WhatsApp Business API
      
      // Ejemplo con console.log para desarrollo
      console.log('Mensaje WhatsApp:', message);
      
      // Cuando implementes la API real, descomenta este código:
      /*
      const response = await fetch('https://tu-api-whatsapp.com/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.WHATSAPP_API_KEY}`
        },
        body: JSON.stringify({
          to: process.env.ADMIN_WHATSAPP_NUMBER,
          message
        })
      });
      
      if (!response.ok) {
        throw new Error('Error al enviar notificación por WhatsApp');
      }
      */
      
      return true;
    } catch (error) {
      console.error('Error al enviar notificación por WhatsApp:', error);
      return false;
    }
  };