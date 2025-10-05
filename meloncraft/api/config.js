// Centralized configuration file for the application

// Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDYrcJmNxJCsGGgQNMwYI06wkYzIeXjWgM",
  authDomain: "meloncraft-store.firebaseapp.com",
  databaseURL: "https://meloncraft-store-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "meloncraft-store",
  storageBucket: "meloncraft-store.appspot.com",
  messagingSenderId: "1098476322376",
  appId: "1:1098476322376:web:3b4a5e1f3d98f5d4a7d3e5"
};

// Application settings
export const appSettings = {
  storeName: "MelonCraft",
  currency: "₹",
  adminEmail: "admin@meloncraft.com",
  supportEmail: "support@meloncraft.com",
  orderPrefix: "MC-",
  taxRate: 0.18, // 18% tax
  enableLogging: true
};

// Security settings
export const securitySettings = {
  enableAntiDevTools: true,
  enableAntiCopy: true,
  enableAntiScreenCapture: true,
  enableAntiSourceView: true,
  enableAntiInspection: true,
  enableCodeObfuscation: true,
  enableTamperDetection: true,
  redirectOnViolation: 'about:blank',
  maxViolations: 3,
  alertTimeout: 3000,
  checkInterval: 1000
};

// API endpoints
export const apiEndpoints = {
  orders: "/api/orders",
  products: "/api/products",
  users: "/api/users",
  auth: "/api/auth"
};