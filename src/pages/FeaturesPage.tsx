import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/common/SectionHeading';
import { BookOpen, Calendar, Camera, Cpu, Database, Eye, ImagePlus, LineChart, PieChart } from 'lucide-react';
import Button from '../components/common/Button';

const featureGroups = [
  {
    id: 'ocr',
    title: 'OCR-Based Label Analysis',
    description: 'Our advanced OCR technology extracts and processes text information from product labels, packaging, and documentation with exceptional accuracy.',
    features: [
      'Brand name and product type extraction',
      'Batch code and serial number identification',
      'Multi-language support for global products',
      'Integration with inventory management systems',
      'Automated authenticity verification'
    ],
    icon: <BookOpen size={24} />,
    color: 'bg-primary-600',
    textColor: 'text-primary-600',
    image: 'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'price-expiry',
    title: 'Price & Expiry Date Detection',
    description: 'Automatically detect and verify price information and expiry dates on product packaging to ensure accuracy and consumer safety.',
    features: [
      'MRP detection and verification',
      'Expiry date extraction and validation',
      'Date format recognition across standards',
      'Automated alerts for approaching expiry',
      'Pricing compliance verification'
    ],
    icon: <Calendar size={24} />,
    color: 'bg-secondary-600',
    textColor: 'text-secondary-600',
    image: 'https://images.pexels.com/photos/3943869/pexels-photo-3943869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'ir-sensors',
    title: 'IR Sensor-Based Counting',
    description: 'Our infrared sensing technology provides accurate, real-time counting and tracking of products as they move through production and packaging lines.',
    features: [
      'High-precision product counting',
      'Real-time inventory tracking',
      'Production line monitoring',
      'Throughput analytics',
      'Anomaly detection in product flow'
    ],
    icon: <PieChart size={24} />,
    color: 'bg-accent-600',
    textColor: 'text-accent-600',
    image: 'https://images.pexels.com/photos/1624704/pexels-photo-1624704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'freshness',
    title: 'Produce Freshness Detection',
    description: 'Advanced image processing algorithms analyze the color, texture, and visual characteristics of fruits and vegetables to determine freshness levels.',
    features: [
      'Color analysis for ripeness assessment',
      'Texture recognition for freshness indicators',
      'Defect and blemish detection',
      'Shelf-life prediction',
      'Quality grading and classification'
    ],
    icon: <ImagePlus size={24} />,
    color: 'bg-success-700',
    textColor: 'text-success-700',
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision Analysis',
    description: 'Our computer vision system uses state-of-the-art image processing techniques to detect defects, verify packaging, and ensure overall product quality.',
    features: [
      'Packaging integrity verification',
      'Label alignment and positioning checks',
      'Foreign object detection',
      'Surface defect identification',
      'Dimensional analysis and measurement'
    ],
    icon: <Eye size={24} />,
    color: 'bg-warning-700',
    textColor: 'text-warning-700',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning & AI',
    description: 'Powerful machine learning algorithms trained on extensive datasets provide intelligent analysis and decision-making for quality control processes.',
    features: [
      'Product classification and categorization',
      'Anomaly detection and flagging',
      'Predictive quality analytics',
      'Continuous learning and improvement',
      'Custom model training for specific products'
    ],
    icon: <Cpu size={24} />,
    color: 'bg-error-700',
    textColor: 'text-error-700',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'analytics',
    title: 'Real-Time Analytics',
    description: 'Comprehensive dashboards and reporting tools provide instant insights into quality control metrics, trends, and performance indicators.',
    features: [
      'Real-time quality metrics dashboard',
      'Historical performance analysis',
      'Customizable reporting tools',
      'Trend identification and forecasting',
      'Alert systems for quality issues'
    ],
    icon: <LineChart size={24} />,
    color: 'bg-primary-600',
    textColor: 'text-primary-600',
    image: 'https://images.pexels.com/photos/106344/pexels-photo-106344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'data-management',
    title: 'Secure Data Management',
    description: 'Our system includes robust data storage and management capabilities, ensuring all quality control information is securely stored and easily accessible.',
    features: [
      'Encrypted data storage',
      'Comprehensive audit trails',
      'Data backup and recovery',
      'Compliance with data regulations',
      'Seamless integration with existing systems'
    ],
    icon: <Database size={24} />,
    color: 'bg-secondary-600',
    textColor: 'text-secondary-600',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const FeaturesPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            >
              Comprehensive Quality Control Features
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 mb-8"
            >
              Explore the powerful capabilities of our Smart Vision Technology system for automated product inspection and quality assurance.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-32">
            {featureGroups.map((feature, index) => (
              <div key={index} id={feature.id} className="scroll-mt-20">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={index % 2 === 1 ? 'lg:col-start-2' : ''}
                  >
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: `${feature.color}20`, color: feature.color }}>
                      <div className="mr-2">{feature.icon}</div>
                      Feature {index + 1}
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">{feature.title}</h2>
                    <p className="text-xl text-gray-600 mb-8">{feature.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span className="ml-3 text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button to="/demos" variant="primary">
                      See it in action
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={index % 2 === 1 ? 'lg:col-start-1' : ''}
                  >
                    <div className="rounded-xl overflow-hidden shadow-xl border border-gray-100">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover aspect-video"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeading
              title="Ready to see our technology in action?"
              subtitle="Schedule a demo to see how our Smart Vision Technology can transform your quality control process."
              center={true}
            />
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Button to="/demos" size="lg">
                Explore Demos
              </Button>
              <Button to="/contact" variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesPage;