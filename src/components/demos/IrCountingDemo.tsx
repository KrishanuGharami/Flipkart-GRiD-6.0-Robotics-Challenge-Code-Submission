import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity, RefreshCw } from 'lucide-react';
import Button from '../common/Button';

const IrCountingDemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [lastDetection, setLastDetection] = useState<Date | null>(null);
  const [sensorState, setSensorState] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCounting = () => {
    setIsActive(true);
    // Simulate IR sensor readings
    intervalRef.current = setInterval(() => {
      // Random detection simulation (20% chance of detection)
      if (Math.random() < 0.2) {
        setCount(prev => prev + 1);
        setLastDetection(new Date());
        setSensorState(true);
        // Reset sensor state after 500ms
        setTimeout(() => setSensorState(false), 500);
      }
    }, 1000);
  };

  const stopCounting = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetCount = () => {
    setCount(0);
    setLastDetection(null);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">IR Sensor Counting Demo</h2>
          <p className="text-gray-600 mt-1">
            Real-time object counting simulation using infrared sensors
          </p>
        </div>
        <Button
          onClick={isActive ? stopCounting : startCounting}
          variant={isActive ? "outline" : "primary"}
          icon={isActive ? <RefreshCw size={18} /> : <Activity size={18} />}
        >
          {isActive ? 'Stop Counting' : 'Start Counting'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sensor Visualization */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Sensor Status</h3>
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
            {/* IR Beam Visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0.3 }}
                animate={{ opacity: sensorState ? 1 : 0.3 }}
                className="w-full h-1 bg-red-500"
              />
              {sensorState && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute w-8 h-8 bg-red-500 rounded-full opacity-50"
                />
              )}
            </div>
            
            {/* Simulated Object */}
            {sensorState && (
              <motion.div
                initial={{ x: -100 }}
                animate={{ x: 400 }}
                transition={{ duration: 1 }}
                className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-md"
              />
            )}
          </div>
        </div>

        {/* Count Display */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Count Statistics</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 mb-1">Total Objects Counted</p>
              <div className="text-4xl font-bold text-primary-600">{count}</div>
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Last Detection</p>
              <div className="text-lg text-gray-800">
                {lastDetection 
                  ? lastDetection.toLocaleTimeString()
                  : 'No detections yet'}
              </div>
            </div>

            <div>
              <p className="text-gray-600 mb-1">Sensor State</p>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  sensorState ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                {sensorState ? 'Object Detected' : 'No Object'}
              </div>
            </div>

            <Button
              onClick={resetCount}
              variant="outline"
              className="mt-4"
              fullWidth
            >
              Reset Counter
            </Button>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Technical Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Hardware Setup</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Arduino Uno Microcontroller</li>
              <li>IR Sensor Module (Digital Output)</li>
              <li>Connected to Digital Pin 2</li>
              <li>5V Power Supply</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Features</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Real-time object detection</li>
              <li>Debounce protection</li>
              <li>Digital state monitoring</li>
              <li>Count persistence</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrCountingDemo;