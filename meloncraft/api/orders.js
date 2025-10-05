// Enhanced serverless API for order management
import { getAllOrders, createOrder, updateOrderStatus, getOrder, removeOrder } from './database.js';
import { appSettings } from './config.js';

export default async function handler(req, res) {
  try {
    // CORS headers to allow requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    // GET request - retrieve orders
    if (req.method === 'GET') {
      const { id } = req.query;
      
      if (id) {
        // Get specific order
        const order = await getOrder(id);
        if (!order) {
          return res.status(404).json({ success: false, message: 'Order not found' });
        }
        return res.status(200).json({ success: true, order });
      } else {
        // Get all orders
        const orders = await getAllOrders();
        return res.status(200).json({ success: true, orders });
      }
    }
    
    // POST request - add new order
    if (req.method === 'POST') {
      const order = req.body;
      const result = await createOrder(order);
      return res.status(201).json({ success: true, message: 'Order created successfully', orderId: result.id });
    }
    
    // PUT request - update order status
    if (req.method === 'PUT') {
      const { id, status } = req.body;
      await updateOrderStatus(id, status);
      return res.status(200).json({ success: true, message: 'Order updated successfully' });
    }
    
    // DELETE request - remove order
    if (req.method === 'DELETE') {
      const { id } = req.query;
      await removeOrder(id);
      return res.status(200).json({ success: true, message: 'Order deleted successfully' });
    }
    
    // Method not allowed
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}