// Vercel Serverless Function - Proxy for ML API
// This bypasses CORS issues by proxying requests through the backend

const ML_API_BASE = 'https://machinelearningmodel-t8i3.onrender.com';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { endpoint, method = 'GET', body } = req.method === 'POST' ? req.body : req.query;

    if (!endpoint) {
      return res.status(400).json({ error: 'Endpoint parameter is required' });
    }

    const url = `${ML_API_BASE}${endpoint}`;

    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (method === 'POST' && body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch from ML API',
      message: error.message 
    });
  }
}

