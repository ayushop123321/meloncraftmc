// Simple serverless API for order management
export default function handler(req, res) {
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
      // Get orders from database (using Vercel KV storage)
      const orders = process.env.VERCEL_ENV === 'development' 
        ? JSON.parse(process.env.MOCK_ORDERS || '[]') 
        : [];
      
      return res.status(200).json({ success: true, orders });
    }
    
    // POST request - add new order
    if (req.method === 'POST') {
      const order = req.body;
      
      // In a real implementation, we would store this in a database
      // For now, we'll just return success
      return res.status(201).json({ success: true, message: 'Order created successfully' });
    }
    
    // PUT request - update order status
    if (req.method === 'PUT') {
      const { id, status } = req.body;
      
      // In a real implementation, we would update the order in a database
      return res.status(200).json({ success: true, message: 'Order updated successfully' });
    }
    
    // Method not allowed
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}