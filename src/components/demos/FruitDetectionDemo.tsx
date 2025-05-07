import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, RefreshCw, Apple } from 'lucide-react';
import Button from '../common/Button';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';

interface DetectionResult {
  label: string;
  confidence: number;
  explanation: string;
}

const FruitDetectionDemo: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isActive, setIsActive] = useState(false);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string>('');
  const detectionInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadModel();
    return () => {
      if (detectionInterval.current) {
        clearInterval(detectionInterval.current);
      }
    };
  }, []);

  const loadModel = async () => {
    try {
      const loadedModel = await tf.loadLayersModel('/model/model.json');
      setModel(loadedModel);
      setError('');
    } catch (err) {
      console.error('Error loading model:', err);
      setError('Failed to load detection model. Please try again later.');
    }
  };

  const startDetection = () => {
    if (!model) {
      setError('Model not loaded. Please wait and try again.');
      return;
    }

    setIsActive(true);
    detectionInterval.current = setInterval(detectFruit, 1000);
  };

  const stopDetection = () => {
    setIsActive(false);
    if (detectionInterval.current) {
      clearInterval(detectionInterval.current);
    }
  };

  const detectFruit = async () => {
    if (!webcamRef.current || !model) return;

    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;

      // Create an image element from the screenshot
      const img = new Image();
      img.src = imageSrc;
      await new Promise(resolve => img.onload = resolve);

      // Convert image to tensor
      const tensor = tf.browser.fromPixels(img)
        .resizeNearestNeighbor([100, 100])
        .toFloat()
        .expandDims();

      // Normalize the tensor
      const normalized = tensor.div(255.0);

      // Make prediction
      const prediction = await model.predict(normalized) as tf.Tensor;
      const probabilities = await prediction.data();
      
      // Get the predicted class
      const isFresh = probabilities[0] > probabilities[1];
      
      // Generate explanation based on confidence
      const confidence = Math.max(probabilities[0], probabilities[1]) * 100;
      let explanation = '';
      
      if (isFresh) {
        explanation = confidence > 90 
          ? 'The fruit appears to be very fresh with good color and texture.'
          : 'The fruit shows signs of freshness but may need closer inspection.';
      } else {
        explanation = confidence > 90
          ? 'The fruit shows clear signs of deterioration and should be discarded.'
          : 'The fruit may be starting to show signs of spoilage.';
      }

      setResult({
        label: isFresh ? 'Fresh' : 'Rotten',
        confidence: confidence,
        explanation
      });

      // Cleanup
      tensor.dispose();
      prediction.dispose();
      
    } catch (err) {
      console.error('Error during detection:', err);
      setError('Error processing image. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fruit Freshness Detection</h2>
          <p className="text-gray-600 mt-1">
            Real-time fruit quality analysis using computer vision
          </p>
        </div>
        <Button
          onClick={isActive ? stopDetection : startDetection}
          variant={isActive ? "outline" : "primary"}
          icon={isActive ? <RefreshCw size={18} /> : <Camera size={18} />}
        >
          {isActive ? 'Stop Detection' : 'Start Detection'}
        </Button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-error-50 text-error-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Camera Feed */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Camera Feed</h3>
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover"
            />
            {/* Detection overlay */}
            {isActive && (
              <div className="absolute inset-0 border-4 border-primary-500 rounded-lg">
                <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm">
                  Analyzing...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Display */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Detection Results</h3>
          {result ? (
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-2">
                  <Apple size={24} className={result.label === 'Fresh' ? 'text-success-500' : 'text-error-500'} />
                  <span className="text-xl font-semibold ml-2">{result.label}</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2 mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence}%` }}
                    className={`h-full rounded-full ${
                      result.label === 'Fresh' ? 'bg-success-500' : 'bg-error-500'
                    }`}
                  />
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Confidence: {result.confidence.toFixed(1)}%
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Analysis</h4>
                <p className="text-gray-600">{result.explanation}</p>
              </div>

              {result.label === 'Rotten' && (
                <div className="bg-error-50 border border-error-100 rounded-lg p-4">
                  <h4 className="font-medium text-error-700 mb-2">Recommendation</h4>
                  <p className="text-error-600 text-sm">
                    This fruit shows signs of spoilage and should not be used. Please dispose of it properly.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Start detection to see results
            </div>
          )}
        </div>
      </div>

      {/* Technical Information */}
      <div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Technical Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Detection System</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>TensorFlow.js CNN Model</li>
              <li>Real-time image processing</li>
              <li>Multi-feature analysis</li>
              <li>Color and texture detection</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Features</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Fresh/Rotten classification</li>
              <li>Confidence scoring</li>
              <li>Real-time analysis</li>
              <li>Detailed explanations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FruitDetectionDemo;