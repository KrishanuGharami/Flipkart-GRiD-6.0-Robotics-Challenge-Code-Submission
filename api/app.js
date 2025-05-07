import express from 'express';
import cors from 'cors';
import { createWorker } from 'tesseract.js';

const app = express();
const port = 5000;

// Initialize Tesseract worker
const worker = await createWorker();
await worker.loadLanguage('eng');
await worker.initialize('eng');

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));

// Regular expressions for text extraction
const brandPattern = /(brand|manufacturer|company):?\s*(\w+)/i;
const packSizePattern = /(pack size|size):?\s*(\d+\s*\w+)/i;
const expiryPattern = /(expiry|exp):?\s*(\d{2}[/-]\d{2}[/-]\d{4})/i;
const mrpPattern = /(MRP|price|₹):?\s*₹?\s*(\d+\.?\d*)/i;

async function processImage(imageData) {
  try {
    // Remove data URL prefix if present
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Perform OCR
    const { data: { text } } = await worker.recognize(buffer);
    
    // Process results
    const results = [];
    const lines = text.split('\n');

    for (const line of lines) {
      if (line.trim()) {
        let result = {
          text: line,
          score: 0.9, // Default confidence score
          bbox: [[0, 0], [0, 100], [100, 100], [100, 0]], // Default bounding box
          type: null
        };

        // Check for specific patterns
        const brandMatch = line.match(brandPattern);
        const packSizeMatch = line.match(packSizePattern);
        const expiryMatch = line.match(expiryPattern);
        const mrpMatch = line.match(mrpPattern);

        if (brandMatch) {
          result.type = 'brand';
          result.value = brandMatch[2];
        } else if (packSizeMatch) {
          result.type = 'pack_size';
          result.value = packSizeMatch[2];
        } else if (expiryMatch) {
          result.type = 'expiry';
          result.value = expiryMatch[2];
        } else if (mrpMatch) {
          result.type = 'mrp';
          result.value = mrpMatch[2];
        }

        if (result.type) {
          results.push(result);
        }
      }
    }

    return results;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
}

app.post('/api/ocr/realtime', async (req, res) => {
  try {
    const { frame } = req.body;
    if (!frame) {
      return res.status(400).json({ error: 'No frame data provided' });
    }

    const results = await processImage(frame);
    res.json({
      success: true,
      results
    });
  } catch (error) {
    console.error('Error in realtime OCR:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/ocr', (req, res) => {
  res.json({
    success: true,
    results: {
      brand: "Nature's Best",
      product_type: "Organic Apples",
      batch_number: "LOT2024-0512",
      expiry_date: "2024-05-30",
      price: "$4.99",
      confidence_score: 0.94
    }
  });
});

app.get('/api/count', (req, res) => {
  const count = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
  res.json({
    success: true,
    count,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/freshness', (req, res) => {
  const freshness_score = Number((Math.random() * (0.98 - 0.7) + 0.7).toFixed(2));
  res.json({
    success: true,
    results: {
      freshness_score,
      category: freshness_score > 0.85 ? "Fresh" : freshness_score > 0.7 ? "Acceptable" : "Poor",
      color_score: Number((Math.random() * (0.98 - 0.8) + 0.8).toFixed(2)),
      texture_score: Number((Math.random() * (0.98 - 0.8) + 0.8).toFixed(2)),
      estimated_shelf_life: `${Math.floor(Math.random() * (7 - 3 + 1)) + 3} days`
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});