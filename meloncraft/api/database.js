// Database connection and operations
import { firebaseConfig } from './config.js';

let firebase;
let database;
let initialized = false;

// Initialize Firebase database connection
export async function initializeDatabase() {
  if (initialized) return;
  
  try {
    if (typeof window !== 'undefined') {
      if (window.firebase) {
        firebase = window.firebase;
      } else {
        console.error('Firebase not loaded');
        return;
      }
      
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      
      database = firebase.database();
      initialized = true;
      console.log('Database initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Get all orders
export async function getOrders() {
  if (!initialized) await initializeDatabase();
  
  try {
    const snapshot = await database.ref('orders').once('value');
    return snapshot.val() || [];
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
}

// Add a new order
export async function addOrder(order) {
  if (!initialized) await initializeDatabase();
  
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