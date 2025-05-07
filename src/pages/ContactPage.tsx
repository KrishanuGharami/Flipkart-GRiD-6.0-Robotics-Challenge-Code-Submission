import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Mail, MapPin, Phone } from 'lucide-react';
import Button from '../components/common/Button';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    industry: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send the form data to a server
    console.log('Form submitted:', formState);
    setIsSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        industry: '',
      });
    }, 5000);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Have questions about our Smart Vision Technology? Contact us today to learn how we can help with your quality control needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Contact Information */}
                <div className="bg-primary-700 text-white p-8 md:p-12">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    <p className="text-primary-100 mb-8">
                      Fill out the form or reach out directly using the contact details below.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-primary-600 p-2 rounded-lg mr-4">
                          <Phone size={20} />
                        </div>
                        <div>
                          <p className="text-lg font-medium">Phone</p>
                          <p className="text-primary-200">+91 (123) 456-7890</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-primary-600 p-2 rounded-lg mr-4">
                          <Mail size={20} />
                        </div>
                        <div>
                          <p className="text-lg font-medium">Email</p>
                          <p className="text-primary-200">info@smartvision.tech</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-primary-600 p-2 rounded-lg mr-4">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <p className="text-lg font-medium">Office</p>
                          <p className="text-primary-200">Flipkart GRiD 6.0 Headquarters<br />Bangalore, India</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-12">
                      <p className="font-semibold mb-4">Follow Us</p>
                      <div className="flex space-x-4">
                        <a href="#" className="bg-primary-600 hover:bg-primary-500 p-2 rounded-full transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                        </a>
                        <a href="#" className="bg-primary-600 hover:bg-primary-500 p-2 rounded-full transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                          </svg>
                        </a>
                        <a href="#" className="bg-primary-600 hover:bg-primary-500 p-2 rounded-full transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </a>
                        <a href="#" className="bg-primary-600 hover:bg-primary-500 p-2 rounded-full transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Contact Form */}
                <div className="p-8 md:p-12">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Send us a message</h2>
                    
                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-success-50 border border-success-200 rounded-lg p-6 text-center"
                      >
                        <CheckCircle size={48} className="text-success-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                        <p className="text-gray-600 mb-4">
                          Thank you for reaching out. We'll get back to you as soon as possible.
                        </p>
                        <Button
                          onClick={() => setIsSubmitted(false)}
                          variant="outline"
                        >
                          Send Another Message
                        </Button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                              Your Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formState.name}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              placeholder="John Doe"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formState.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                              Company Name
                            </label>
                            <input
                              type="text"
                              id="company"
                              name="company"
                              value={formState.company}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              placeholder="Acme Inc."
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formState.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              placeholder="+1 (123) 456-7890"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                            Industry
                          </label>
                          <select
                            id="industry"
                            name="industry"
                            value={formState.industry}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option value="">Select your industry</option>
                            <option value="retail">Retail</option>
                            <option value="food">Food & Beverage</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="pharmaceuticals">Pharmaceuticals</option>
                            <option value="agriculture">Agriculture</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Tell us about your project and how we can help..."
                          ></textarea>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="privacy"
                            type="checkbox"
                            required
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                            I agree to the <a href="#" className="text-primary-600 hover:text-primary-700">Privacy Policy</a>
                          </label>
                        </div>
                        
                        <div>
                          <Button type="submit" variant="primary" fullWidth>
                            Send Message <ArrowRight size={16} className="ml-2" />
                          </Button>
                        </div>
                      </form>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Find answers to common questions about our Smart Vision Technology.
              </p>
            </motion.div>
            
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How accurate is the OCR technology?
                </h3>
                <p className="text-gray-600">
                  Our OCR technology achieves over 99% accuracy in controlled environments and 95%+ in real-world conditions. The system continuously improves through machine learning.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can the system be integrated with our existing production line?
                </h3>
                <p className="text-gray-600">
                  Yes, our Smart Vision Technology is designed for seamless integration with existing production lines. Our team works with you to ensure minimal disruption during installation.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What types of products can the freshness detection analyze?
                </h3>
                <p className="text-gray-600">
                  The system is trained on a wide variety of fruits and vegetables, including apples, oranges, bananas, tomatoes, and leafy greens. Custom training for specific products is available.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How long does implementation typically take?
                </h3>
                <p className="text-gray-600">
                  A standard implementation takes 2-4 weeks, including installation, calibration, and training. More complex integrations may require additional time.
                </p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center mt-12"
            >
              <p className="text-gray-600 mb-4">
                Still have questions? We're here to help.
              </p>
              <Button to="#" variant="primary">
                Contact Support
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;