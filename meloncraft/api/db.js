// Simple in-memory database for orders
// In a production environment, this would be replaced with a real database

// Initialize orders collection
let orders = [];

// Load orders from localStorage if available (client-side only)
if (typeof window !== 'undefined') {
  try {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      orders = JSON.parse(storedOrders);
    }
  } catch (error) {
    console.error('Error loading orders from localStorage:', error);
  }
}

// Save orders to localStorage (client-side only)
function saveOrders() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('orders', JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving orders to localStorage:', error);
    }
  }
}

// Get all orders
export function getOrders() {
  return orders;
}

// Add a new order
export function addOrder(order) {
  orders.push(order);
  saveOrders();
  return order;
}

// Update an order
export function updateOrder(id, updates) {
  const index = orders.findIndex(order => order.id === id);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updates };
    saveOrders();
    return orders[index];
  }
  return null;
}

// Delete an order
export function deleteOrder(id) {
  const index = orders.findIndex(order => order.id === id);
  if (index !== -1) {
    const deletedOrder = orders[index];
    orders.splice(index, 1);
    saveOrders();
    return deletedOrder;
  }
  return null;
}

// Export the database
export default {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder
};