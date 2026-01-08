# ML Models Testing Feature - README

## Overview
I've added a new "Test ML Models" feature to your portfolio that allows visitors to interactively test your machine learning models directly from the website.

## What's New

### 1. Navigation Menu
- Added "Test ML Models" button in the top navigation bar
- Opens a full-screen modal interface for testing ML models

### 2. ML Models Panel Features
- **Model Selection**: Easy switching between multiple ML models (currently configured for your Housing Price Predictor)
- **Health Status**: Real-time API health monitoring
- **Model Info Display**: Shows model details, features, and performance metrics
- **Interactive Input Form**: 5 input fields for the housing price prediction:
  - Square Feet (500-10,000)
  - Number of Bedrooms (1-10)
  - Number of Bathrooms (1-10)
  - Year Built (1900-2026)
  - Distance to City in miles (0-100)
- **Sample Data Button**: Quick-fill with example values
- **Prediction Display**: Beautiful formatted output showing predicted price with confidence metrics
- **Error Handling**: Clear error messages and CORS troubleshooting info

### 3. Extensible Design
The code is structured to easily add more ML models in the future. Simply add a new model configuration to the `ML_MODELS` array in [App.jsx](src/App.jsx).

## Current Status: CORS Issue ⚠️

### The Problem
Your ML API at `https://machinelearningmodel-t8i3.onrender.com` **works perfectly** but doesn't have CORS (Cross-Origin Resource Sharing) headers enabled. This means:
- ✅ The API works fine when called from backend/Node.js/Postman/curl
- ❌ Browser-based requests from your portfolio website are blocked for security reasons

### Proof the API Works
I've created `test-api.cjs` which successfully calls your API:
```bash
node test-api.cjs
```

This demonstrates that your API is fully functional and returns correct predictions.

## How to Fix CORS

You need to add CORS headers to your ML API server. Here's how:

### If using Flask (Python):
```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Or for specific origins:
CORS(app, origins=["https://your-portfolio-domain.com", "http://localhost:5173"])
```

### If using Express (Node.js):
```javascript
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());  // Enable CORS for all routes

// Or for specific origins:
app.use(cors({
  origin: ['https://your-portfolio-domain.com', 'http://localhost:5173']
}));
```

### Manual CORS Headers (any framework):
Add these headers to all API responses:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

## Testing the Feature

### Before CORS is Fixed:
1. Open your portfolio: `npm run dev`
2. Click "Test ML Models" in the navigation
3. Click "Load Sample Data"
4. Click "Predict"
5. You'll see a CORS error message with helpful instructions

### After CORS is Fixed:
1. The feature will work seamlessly
2. Visitors can input house features and get real-time price predictions
3. The UI displays:
   - Predicted price (formatted as currency)
   - Confidence score (R² value)
   - Model RMSE
   - Full JSON response

## Adding More Models

To add another ML model to test:

```javascript
// In App.jsx, add to ML_MODELS array:
{
  id: 'my-classification-model',
  name: 'Customer Churn Predictor',
  description: 'Predict customer churn probability',
  baseUrl: 'https://your-api-url.com',
  endpoints: {
    health: '/health',
    info: '/info',
    predict: '/predict'
  },
  inputFields: [
    { name: 'age', label: 'Customer Age', type: 'number', placeholder: 'e.g., 35', required: true },
    { name: 'tenure', label: 'Months as Customer', type: 'number', placeholder: 'e.g., 24', required: true },
    // ... more fields
  ],
  outputLabel: 'Churn Probability',
  sampleValues: {
    age: 35,
    tenure: 24
  }
}
```

## Files Modified/Created

### Modified:
- `src/App.jsx` - Added ML testing component and navigation

### Created:
- `test-api.cjs` - Node.js test script to verify API functionality
- `ML-MODELS-README.md` - This documentation

## Summary

✅ **What Works:**
- Beautiful UI for testing ML models
- Model info and health status display
- Input validation and sample data loading
- Formatted prediction output
- Extensible architecture for multiple models
- Comprehensive error handling

⚠️ **What Needs Fixing:**
- Enable CORS on your Render.com ML API server

Once CORS is enabled, visitors to your portfolio can interactively test your ML models, which is a great way to showcase your AI/ML skills!
