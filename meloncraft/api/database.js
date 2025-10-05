// File-based database operations using orders.json
import { appSettings } from './config.js';

// Path to orders.json file
const ORDERS_FILE_PATH = './api/orders.json';

// Get all orders
export async function getOrders() {
  try {
    // Fetch the orders.json file
    const response = await fetch(ORDERS_FILE_PATH);
    if (!response.ok) {
      throw new Error(`Failed to load orders: ${response.status}`);
    }
    
    const data = await response.json();
    return data.orders || [];
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
}

// Add a new order
export async function addOrder(order) {
  try {
    // Get current orders
    const currentOrders = await getOrders();
    
    // Generate order ID if not provided
    if (!order.id) {
      order.id = appSettings.orderPrefix + Date.now();
    }
    
    // Add timestamp if not provided
    if (!order.createdAt) {
      order.createdAt = new Date().toISOString();
    }
    
    // Add new order
    const updatedOrders = [...currentOrders, order];
    
    // Save to file using fetch API
    const response = await fetch(ORDERS_FILE_PATH, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orders: updatedOrders })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to save order: ${response.status}`);
    }
    
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error('Error adding order:', error);
    
    // Fallback: Save to localStorage
    try {
      const currentOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      currentOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(currentOrders));
      return { success: true, orderId: order.id, source: 'localStorage' };
    } catch (localError) {
      console.error('Error saving to localStorage:', localError);
      return { success: false, error: error.message };
    }
  }
}

// Update an existing order
export async function updateOrder(orderId, updates) {
  try {
    // Get current orders
    const currentOrders = await getOrders();
    
    // Find order index
    const orderIndex = currentOrders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
      return { success: false, error: 'Order not found' };
    }
    
    // Update order
    const updatedOrder = { ...currentOrders[orderIndex], ...updates, updatedAt: new Date().toISOString() };
    currentOrders[orderIndex] = updatedOrder;
    
    // Save to file
    const response = await fetch(ORDERS_FILE_PATH, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orders: currentOrders })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update order: ${response.status}`);
    }
    
    return { success: true, order: updatedOrder };
  } catch (error) {
    console.error('Error updating order:', error);
    return { success: false, error: error.message };
  }
}

// Delete an order
export async function deleteOrder(orderId) {
  try {
    // Get current orders
    const currentOrders = await getOrders();
    
    // Filter out the order to delete
    const updatedOrders = currentOrders.filter(order => order.id !== orderId);
    
    // If no order was removed, return error
    if (updatedOrders.length === currentOrders.length) {
      return { success: false, error: 'Order not found' };
    }
    
    // Save to file
    const response = await fetch(ORDERS_FILE_PATH, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orders: updatedOrders })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete order: ${response.status}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting order:', error);
    return { success: false, error: error.message };
  }
}
  
  try {
    const newOrderRef = database.ref('orders').push();
    const orderId = newOrderRef.key;
    const orderWithId = { ...order, id: orderId };
    
    await newOrderRef.set(orderWithId);
    return orderWithId;
  } catch (error) {
    console.error('Error adding order:', error);
    throw error;
  }
}

// Update an order
export async function updateOrder(id, updates) {
  if (!initialized) await initializeDatabase();
  
  try {
    await database.ref(`orders/${id}`).update(updates);
    const snapshot = await database.ref(`orders/${id}`).once('value');
    return snapshot.val();
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
}

// Delete an order
export async function deleteOrder(id) {
  if (!initialized) await initializeDatabase();
  
  try {
    await database.ref(`orders/${id}`).remove();
    return true;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
}

// Get order by ID
export async function getOrderById(id) {
  if (!initialized) await initializeDatabase();
  
  try {
    const snapshot = await database.ref(`orders/${id}`).once('value');
    return snapshot.val();
  } catch (error) {
    console.error('Error getting order:', error);
    return null;
  }
}