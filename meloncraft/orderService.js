// Order Service - Handles order operations using Firebase Realtime Database
// This provides a central place for all order-related operations

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYrcJmNxJCsGGgQNMwYI06wkYzIeXjWgM",
  authDomain: "meloncraft-store.firebaseapp.com",
  databaseURL: "https://meloncraft-store-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "meloncraft-store",
  storageBucket: "meloncraft-store.appspot.com",
  messagingSenderId: "1098476322376",
  appId: "1:1098476322376:web:3b4a5e1f3d98f5d4a7d3e5"
};

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

// Initialize Firebase Database
function initializeDatabase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  database = firebase.database();
}

// Order Service
const OrderService = {
  // Initialize the service
  init: async function() {
    try {
      await loadFirebase();
      console.log('Order service initialized');
      return true;
    } catch (error) {
      console.error('Failed to initialize order service:', error);
      return false;
    }
  },
  
  // Get all orders
  getAllOrders: async function() {
    try {
      const snapshot = await database.ref('orders').once('value');
      const orders = snapshot.val() || {};
      return Object.keys(orders).map(key => ({
        id: key,
        ...orders[key]
      }));
    } catch (error) {
      console.error('Error getting orders:', error);
      return [];
    }
  },
  
  // Add a new order
  addOrder: async function(order) {
    try {
      const newOrderRef = database.ref('orders').push();
      const orderId = newOrderRef.key;
      const newOrder = {
        ...order,
        id: orderId,
        date: new Date().toISOString(),
        status: 'Pending'
      };
      
      await newOrderRef.set(newOrder);
      
      // Also save to localStorage for backup and offline access
      const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localOrders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(localOrders));
      
      return newOrder;
    } catch (error) {
      console.error('Error adding order:', error);
      
      // Fallback to localStorage if Firebase fails
      try {
        const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const orderId = 'local_' + Date.now();
        const newOrder = {
          ...order,
          id: orderId,
          date: new Date().toISOString(),
          status: 'Pending'
        };
        
        localOrders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(localOrders));
        
        return newOrder;
      } catch (localError) {
        console.error('Error saving to localStorage:', localError);
        return null;
      }
    }
  },
  
  // Update an order
  updateOrder: async function(orderId, updates) {
    try {
      await database.ref(`orders/${orderId}`).update(updates);
      
      // Also update in localStorage
      const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const orderIndex = localOrders.findIndex(order => order.id === orderId);
      
      if (orderIndex !== -1) {
        localOrders[orderIndex] = { ...localOrders[orderIndex], ...updates };
        localStorage.setItem('orders', JSON.stringify(localOrders));
      }
      
      return true;
    } catch (error) {
      console.error('Error updating order:', error);
      
      // Fallback to localStorage if Firebase fails
      try {
        const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const orderIndex = localOrders.findIndex(order => order.id === orderId);
        
        if (orderIndex !== -1) {
          localOrders[orderIndex] = { ...localOrders[orderIndex], ...updates };
          localStorage.setItem('orders', JSON.stringify(localOrders));
          return true;
        }
        
        return false;
      } catch (localError) {
        console.error('Error updating in localStorage:', localError);
        return false;
      }
    }
  },
  
  // Listen for new orders (for admin dashboard)
  listenForOrders: function(callback) {
    try {
      const ordersRef = database.ref('orders');
      ordersRef.on('value', (snapshot) => {
        const orders = snapshot.val() || {};
        const ordersList = Object.keys(orders).map(key => ({
          id: key,
          ...orders[key]
        }));
        
        callback(ordersList);
      });
      
      // Return a function to unsubscribe
      return () => ordersRef.off();
    } catch (error) {
      console.error('Error setting up order listener:', error);
      return () => {};
    }
  }
};

// Export the service
window.OrderService = OrderService;