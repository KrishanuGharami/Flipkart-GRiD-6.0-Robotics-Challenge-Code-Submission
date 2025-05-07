import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import { Camera, Cpu, Edit, ImagePlus, Monitor, PieChart } from 'lucide-react';

const steps = [
  {
    title: 'Image Capture',
    description: 'Products pass through high-resolution cameras for detailed visual analysis',
    icon: <Camera size={24} />,
    color: 'bg-primary-100 text-primary-600',
  },
  {
    title: 'OCR Processing',
    description: 'Text from product labels is extracted and analyzed using advanced OCR algorithms',
    icon: <Edit size={24} />,
    color: 'bg-secondary-100 text-secondary-600',
  },
  {
    title: 'IR Detection',
    description: 'Infrared sensors count and track products on the production line in real-time',
    icon: <PieChart size={24} />,
    color: 'bg-accent-100 text-accent-600',
  },
  {
    title: 'Quality Analysis',
    description: 'AI models assess freshness, defects, and overall product quality',
    icon: <ImagePlus size={24} />,
    color: 'bg-success-50 text-success-700',
  },
  {
    title: 'ML Processing',
    description: 'Machine learning algorithms classify products and detect anomalies',
    icon: <Cpu size={24} />,
    color: 'bg-warning-50 text-warning-700',
  },
  {
    title: 'Results & Reporting',
    description: 'Detailed quality metrics are displayed on the dashboard for analysis',
    icon: <Monitor size={24} />,
    color: 'bg-error-50 text-error-700',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="How It Works"
          subtitle="Our smart vision system processes products through multiple analysis stages to ensure comprehensive quality control."
          center={true}
        />

        <div className="relative mt-16">
          {/* Connection line */}
          <div className="absolute hidden lg:block left-1/2 top-12 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 z-0"></div>

          {/* Steps */}
          <div className="relative z-10 space-y-12 lg:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-8 lg:gap-16`}
              >
                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 flex items-center lg:block">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-2 lg:hidden ${step.color}`}>
                      {index + 1}
                    </span>
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                <div className="flex-shrink-0 relative">
                  <div className="hidden lg:flex items-center justify-center w-16 h-16 rounded-full border-4 border-white bg-white shadow-lg z-10">
                    <div className={`rounded-full p-3 ${step.color}`}>{step.icon}</div>
                  </div>
                  
                  <div className="lg:hidden flex items-center justify-center w-16 h-16 rounded-full border-4 border-white bg-white shadow-lg">
                    <div className={`rounded-full p-3 ${step.color}`}>{step.icon}</div>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 lg:opacity-60">
                  {index % 2 === 0 ? (
                    <div className="bg-gray-100 rounded-lg h-40 md:h-64 flex items-center justify-center">
                      <span className="text-gray-400">Step {index + 1} Illustration</span>
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-lg h-40 md:h-64 flex items-center justify-center">
                      <span className="text-gray-400">Step {index + 1} Illustration</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;