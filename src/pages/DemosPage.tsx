import React from 'react';
import { Activity, Apple, Eye } from 'lucide-react';
import OcrDemo from '../components/demos/OcrDemo';
import IrCountingDemo from '../components/demos/IrCountingDemo';
import FruitDetectionDemo from '../components/demos/FruitDetectionDemo';

// Define the demos array
export const demos = [
  {
    id: 'ocr',
    title: 'Real-time OCR Demo',
    description: 'See how our system extracts text from product labels in real-time using your camera.',
    component: <OcrDemo />,
    icon: <Eye size={20} />,
    color: 'bg-primary-100 text-primary-600',
  },
  {
    id: 'ir-counting',
    title: 'IR Sensor Counting Demo',
    description: 'Watch our infrared sensor system count objects in real-time on a simulated production line.',
    component: <IrCountingDemo />,
    icon: <Activity size={20} />,
    color: 'bg-secondary-100 text-secondary-600',
  },
  {
    id: 'fruit-detection',
    title: 'Fruit Freshness Detection',
    description: 'Real-time analysis of fruit freshness using computer vision and machine learning.',
    component: <FruitDetectionDemo />,
    icon: <Apple size={20} />,
    color: 'bg-success-100 text-success-600',
  }
];

// Create and export the DemosPage component
const DemosPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6">
        {demos.map((demo) => (
          <div
            key={demo.id}
            className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-lg"
          >
            <div className={`inline-block rounded-full p-3 ${demo.color}`}>
              {demo.icon}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              {demo.title}
            </h3>
            <p className="mt-2 text-gray-600">
              {demo.description}
            </p>
            <div className="mt-4">
              {demo.component}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemosPage;