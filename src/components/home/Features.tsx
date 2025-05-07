import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  Camera, 
  Cpu, 
  Database, 
  ImagePlus, 
  LineChart, 
  PieChart 
} from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

const featureItems = [
  {
    title: 'OCR-Based Label Analysis',
    description: 'Extract brand names, product types, and other key information from packaging using advanced OCR technology.',
    icon: <BookOpen size={24} />,
    color: 'bg-primary-100 text-primary-600',
  },
  {
    title: 'Price & Expiry Detection',
    description: 'Automatically identify MRP and expiry dates from product labels to ensure pricing accuracy and consumer safety.',
    icon: <Calendar size={24} />,
    color: 'bg-secondary-100 text-secondary-600',
  },
  {
    title: 'IR Sensor-Based Counting',
    description: 'Track product flow on conveyors in real-time with accurate infrared sensor technology for inventory management.',
    icon: <PieChart size={24} />,
    color: 'bg-accent-100 text-accent-600',
  },
  {
    title: 'Produce Freshness Detection',
    description: 'Analyze fruit freshness using advanced image processing to determine color and texture quality parameters.',
    icon: <ImagePlus size={24} />,
    color: 'bg-success-50 text-success-700',
  },
  {
    title: 'Computer Vision Analysis',
    description: 'Perform high-precision image processing for defect detection and quality assurance in manufacturing.',
    icon: <Camera size={24} />,
    color: 'bg-warning-50 text-warning-700',
  },
  {
    title: 'Machine Learning Models',
    description: 'Leverage advanced ML algorithms trained on extensive datasets for accurate product classification and anomaly detection.',
    icon: <Cpu size={24} />,
    color: 'bg-error-50 text-error-700',
  },
  {
    title: 'Real-Time Analytics',
    description: 'Gain instant insights with comprehensive dashboards displaying key performance metrics and quality control data.',
    icon: <LineChart size={24} />,
    color: 'bg-primary-100 text-primary-600',
  },
  {
    title: 'Secure Data Storage',
    description: 'Store and manage all quality control data securely with encrypted database systems and backup capabilities.',
    icon: <Database size={24} />,
    color: 'bg-secondary-100 text-secondary-600',
  },
];

const Features: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Powerful Features"
          subtitle="Our quality control system combines multiple technologies to deliver comprehensive product inspection and analysis."
          center={true}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {featureItems.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
            >
              <div className={`rounded-lg w-12 h-12 flex items-center justify-center mb-4 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;