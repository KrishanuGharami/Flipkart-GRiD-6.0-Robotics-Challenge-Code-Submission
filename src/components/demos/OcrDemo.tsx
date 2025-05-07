import React, { useRef, useEffect, useState } from 'react';
import { Camera, RefreshCw } from 'lucide-react';
import Button from '../common/Button';

interface OcrResult {
  text: string;
  score: number;
  bbox: number[][];
  type: string | null;
  value?: string;
}

const OcrDemo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [results, setResults] = useState<OcrResult[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Prefer rear camera on mobile devices
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        setError('');
      }
    } catch (err) {
      setError('Failed to access camera. Please ensure camera permissions are granted.');
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
      setResults([]);
    }
  };

  const captureFrame = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw the current video frame
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to base64
        const frame = canvas.toDataURL('image/jpeg', 0.8);
        
        try {
          const response = await fetch('http://localhost:5000/api/ocr/realtime', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ frame }),
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          if (data.success) {
            setResults(data.results);
            setError(''); // Clear any previous errors
          } else {
            console.error('OCR processing failed:', data.error);
            setError('OCR processing failed. Please try again.');
          }
        } catch (err) {
          console.error('Error processing frame:', err);
          setError('Failed to process image. Please ensure the Flask backend is running on port 5000.');
        }
      }
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isStreaming) {
      // Process frame every 500ms
      interval = setInterval(captureFrame, 500);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isStreaming]);

  const renderDetections = () => {
    if (!results.length) return null;

    return (
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Detected Information</h3>
        <div className="space-y-3">
          {results.map((result, index) => (
            <div 
              key={index}
              className="flex items-start p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {result.type ? result.type.charAt(0).toUpperCase() + result.type.slice(1) : 'Text'}:
                  </span>
                  <span className="ml-2 text-sm text-gray-600">
                    {result.value || result.text}
                  </span>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Confidence: {(result.score * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Real-time OCR Demo</h2>
          <p className="text-gray-600 mt-1">
            Point your camera at text to see real-time OCR detection
          </p>
        </div>
        <Button
          onClick={isStreaming ? stopCamera : startCamera}
          variant={isStreaming ? "outline" : "primary"}
          icon={isStreaming ? <RefreshCw size={18} /> : <Camera size={18} />}
        >
          {isStreaming ? 'Stop Camera' : 'Start Camera'}
        </Button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-error-50 text-error-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          className="hidden"
        />
      </div>

      {renderDetections()}
    </div>
  );
};

export default OcrDemo;