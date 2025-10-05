// Order Service - Handles order operations using Firebase Realtime Database
// This provides a central place for all order-related operations

// Import configuration from centralized config file
import { firebaseConfig, appSettings } from '../api/config.js';

// Initialize Firebase
let firebase;
let database;

// Load Firebase from CDN
function loadFirebase() {
  return new Promise((resolve, reject) => {
    if (window.firebase) {
      firebase = window.firebase;
      initializeDatabase();
      resolve();
    } else {
      // Load Firebase scripts dynamically
      const firebaseApp = document.createElement('script');
      firebaseApp.src = 'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js';
      
      const firebaseDatabase = document.createElement('script');
      firebaseDatabase.src = 'https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js';
      
      firebaseApp.onload = () => {
        document.head.appendChild(firebaseDatabase);
      };
      
      firebaseDatabase.onload = () => {
        firebase = window.firebase;
        initializeDatabase();
        resolve();
      };
      
      firebaseApp.onerror = firebaseDatabase.onerror = (err) => {
        console.error('Error loading Firebase:', err);
        reject(err);
      };
      
      document.head.appendChild(firebaseApp);
    }
  });
}

// Initialize Firebase database
function initializeDatabase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  database = firebase.database();
}

// Create a new order
export async function createOrder(orderData) {
  try {
    await loadFirebase();
    
    // Generate order ID
    const orderId = appSettings.orderPrefix + Date.now();
    
    // Create order object
    const order = {
      id: orderId,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // Save to Firebase
    await database.ref(`orders/${orderId}`).set(order);
    
    return { success: true, orderId };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: error.message };
  }
}

// Get order by ID
export async function getOrder(orderId) {
  try {
    await loadFirebase();
    
    const snapshot = await database.ref(`orders/${orderId}`).once('value');
    const order = snapshot.val();
    
    if (!order) {
      return { success: false, error: 'Order not found' };
    }
    
    return { success: true, order };
  } catch (error) {
    console.error('Error getting order:', error);
    return { success: false, error: error.message };
  }
}

// Update order status
export async function updateOrderStatus(orderId, status) {
  try {
    await loadFirebase();
    
    await database.ref(`orders/${orderId}`).update({
      status,
      updatedAt: new Date().toISOString()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { success: false, error: error.message };
  }
}

// Get all orders
export async function getAllOrders() {
  try {
    await loadFirebase();
    
    const snapshot = await database.ref('orders').once('value');
    const orders = snapshot.val() || {};
    
    return { success: true, orders: Object.values(orders) };
  } catch (error) {
    console.error('Error getting all orders:', error);
    return { success: false, error: error.message };
  }
}