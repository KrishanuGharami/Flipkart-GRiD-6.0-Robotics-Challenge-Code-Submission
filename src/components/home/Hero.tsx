import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Camera, Cpu } from 'lucide-react';
import Button from '../common/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/2 -left-32 w-96 h-96 bg-secondary-100 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2"></span>
              Flipkart GRiD 6.0 Robotics Challenge
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Smart Vision Technology for{' '}
              <span className="text-primary-600">Quality Control</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Automated product inspection and quality assurance using OCR, 
              infrared sensing, and machine learning for retail, food, and manufacturing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button to="/demos" size="lg">
                Explore Demos <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button to="/features" variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Smart Vision Technology in action" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Quality Control Demo</h3>
                  <p className="text-white/80">Real-time product inspection system</p>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
                <div className="flex items-center space-x-1">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-xs font-medium text-gray-700">Live Demo</span>
                </div>
              </div>
            </div>
            
            {/* Floating feature cards */}
            <motion.div 
              className="absolute -left-16 -bottom-6 bg-white shadow-lg rounded-lg p-4 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Camera size={20} className="text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">OCR Analysis</p>
                  <p className="text-xs text-gray-500">Automated label reading</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -right-10 top-10 bg-white shadow-lg rounded-lg p-4 border border-gray-100"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-secondary-100 p-2 rounded-lg">
                  <Cpu size={20} className="text-secondary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">ML Powered</p>
                  <p className="text-xs text-gray-500">Real-time detection</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute right-20 -bottom-5 bg-white shadow-lg rounded-lg p-4 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-accent-100 p-2 rounded-lg">
                  <BarChart3 size={20} className="text-accent-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Analytics</p>
                  <p className="text-xs text-gray-500">Data-driven insights</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;