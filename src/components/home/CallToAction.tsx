import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-800 to-primary-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to transform your quality control process?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Join innovative companies using Smart Vision Technology to ensure product quality, reduce waste, and improve efficiency.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button to="/contact" size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
              Request a Demo <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button to="/features" size="lg" className="bg-white text-primary-800 hover:bg-gray-100">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;