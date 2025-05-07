import React from 'react';
import { motion } from 'framer-motion';
import { Book, ChevronRight, Cpu, Database, Globe, Lightbulb } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';

const Technologies: React.FC = () => {
  const techList = [
    {
      icon: <Book className="h-6 w-6 text-primary-600" />,
      name: 'Optical Character Recognition',
      description: 'Advanced OCR for text extraction from product labels and packaging',
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-secondary-600" />,
      name: 'Infrared Sensing',
      description: 'Precise IR sensors for real-time product counting and tracking',
    },
    {
      icon: <Cpu className="h-6 w-6 text-accent-600" />,
      name: 'TensorFlow & Keras',
      description: 'Deep learning frameworks for building and training AI models',
    },
    {
      icon: <Globe className="h-6 w-6 text-success-700" />,
      name: 'OpenCV',
      description: 'Computer vision library for image processing and analysis',
    },
    {
      icon: <Database className="h-6 w-6 text-warning-700" />,
      name: 'Python Ecosystem',
      description: 'Comprehensive libraries for data processing and analysis',
    },
  ];

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
    <section className="py-20 bg-gradient-to-br from-primary-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Cutting-Edge Technology Stack
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Our smart vision system leverages a comprehensive technology stack to deliver reliable, 
              accurate, and efficient quality control solutions for various industries.
            </p>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="divide-y divide-gray-100"
              >
                {techList.map((tech, index) => (
                  <motion.li key={index} variants={itemVariants} className="p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-4 bg-gray-50 rounded-lg p-2">
                        {tech.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{tech.name}</h3>
                        <p className="text-sm text-gray-500">{tech.description}</p>
                      </div>
                      <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            
            <Button to="/features" variant="primary">
              Explore Our Technologies
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-xl overflow-hidden shadow-xl border border-gray-200"
          >
            <img
              src="https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Advanced technology demonstration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent flex items-end">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Machine Learning Models</h3>
                <p className="text-white/90 mb-4">
                  Our custom-trained AI models can detect quality issues with exceptional accuracy
                </p>
                <Button to="/demos" variant="primary" size="sm">
                  View Demo
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;