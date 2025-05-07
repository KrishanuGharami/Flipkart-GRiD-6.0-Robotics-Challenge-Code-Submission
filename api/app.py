from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import json
import random
import time
import datetime
import cv2
import easyocr
import re
import numpy as np
import base64

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173"],  # Updated to match Vite's default port
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Initialize EasyOCR reader
reader = easyocr.Reader(['en'], gpu=False)

# Regex patterns
brand_pattern = re.compile(r"(brand|manufacturer|company):?\s*(\w+)", re.IGNORECASE)
pack_size_pattern = re.compile(r"(pack size|size):?\s*(\d+\s*\w+)", re.IGNORECASE)
expiry_pattern = re.compile(r"(expiry|exp):?\s*(\d{2}[/-]\d{2}[/-]\d{4})", re.IGNORECASE)
mrp_pattern = re.compile(r"(MRP|price|₹):?\s*₹?\s*(\d+\.?\d*)", re.IGNORECASE)

def process_frame(frame_data):
    try:
        # Decode base64 image
        encoded_data = frame_data.split(',')[1]
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Perform OCR
        results = reader.readtext(frame)
        processed_results = []
        
        for bbox, text, score in results:
            if score > 0.25:  # Confidence threshold
                # Convert bbox points to integers
                bbox = [[int(x) for x in point] for point in bbox]
                
                # Check for specific details
                brand_match = re.search(brand_pattern, text)
                pack_size_match = re.search(pack_size_pattern, text)
                expiry_match = re.search(expiry_pattern, text)
                mrp_match = re.search(mrp_pattern, text)
                
                result = {
                    'text': text,
                    'score': float(score),
                    'bbox': bbox,
                    'type': None
                }
                
                if brand_match:
                    result['type'] = 'brand'
                    result['value'] = brand_match.group(2)
                elif pack_size_match:
                    result['type'] = 'pack_size'
                    result['value'] = pack_size_match.group(2)
                elif expiry_match:
                    result['type'] = 'expiry'
                    result['value'] = expiry_match.group(2)
                elif mrp_match:
                    result['type'] = 'mrp'
                    result['value'] = mrp_match.group(2)
                    
                processed_results.append(result)
        
        return processed_results
    except Exception as e:
        print(f"Error processing frame: {str(e)}")
        return []

@app.route('/api/ocr/realtime', methods=['POST', 'OPTIONS'])
def realtime_ocr():
    if request.method == 'OPTIONS':
        response = Response()
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'POST,OPTIONS')
        return response
        
    try:
        data = request.json
        frame_data = data.get('frame')
        
        if not frame_data:
            return jsonify({'error': 'No frame data provided'}), 400
            
        results = process_frame(frame_data)
        return jsonify({
            'success': True,
            'results': results
        })
        
    except Exception as e:
        print(f"Error in realtime_ocr: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/ocr', methods=['POST'])
def ocr_analysis():
    time.sleep(1)  # Simulate processing time
    
    return jsonify({
        "success": True,
        "results": {
            "brand": "Nature's Best",
            "product_type": "Organic Apples",
            "batch_number": "LOT2024-0512",
            "expiry_date": "2024-05-30",
            "price": "$4.99",
            "confidence_score": 0.94
        }
    })

@app.route('/api/count', methods=['GET'])
def product_count():
    count = random.randint(50, 200)
    time.sleep(0.5)  # Simulate processing time
    
    return jsonify({
        "success": True,
        "count": count,
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })

@app.route('/api/freshness', methods=['POST'])
def freshness_detection():
    time.sleep(1.5)  # Simulate processing time
    
    freshness_score = round(random.uniform(0.7, 0.98), 2)
    freshness_category = "Fresh" if freshness_score > 0.85 else "Acceptable" if freshness_score > 0.7 else "Poor"
    
    return jsonify({
        "success": True,
        "results": {
            "freshness_score": freshness_score,
            "category": freshness_category,
            "color_score": round(random.uniform(0.8, 0.98), 2),
            "texture_score": round(random.uniform(0.8, 0.98), 2),
            "estimated_shelf_life": f"{random.randint(3, 7)} days"
        }
    })

@app.route('/api/dashboard', methods=['GET'])
def dashboard_data():
    return jsonify(generate_random_data())

if __name__ == '__main__':
    app.run(debug=True, port=5000)