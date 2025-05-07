import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Cog, Cpu, EyeOff, ImagePlus, Play } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';

const DemoSection: React.FC = () => {
  const demos = [
    {
      title: 'OCR Label Detection',
      description: 'See how our system extracts product information from labels',
      icon: <Cpu size={24} />,
      image: 'https://images.pexels.com/photos/5428824/pexels-photo-5428824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/demos#ocr'
    },
    {
      title: 'Product Counting',
      description: 'Watch real-time tracking of products on a conveyor',
      icon: <Cog size={24} />,
      image: 'https://images.pexels.com/photos/3912979/pexels-photo-3912979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/demos#counting'
    },
    {
      title: 'Freshness Detection',
      description: 'Analyze the freshness of produce using computer vision',
      icon: <ImagePlus size={24} />,
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/demos#freshness'
    }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Interactive Demos"
          subtitle="Experience our technology in action through interactive demonstrations showcasing the capabilities of our quality control system."
          center={true}
          className="text-white"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {demos.map((demo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-xl"
            >
              <div className="aspect-video rounded-xl overflow-hidden">
                <img 
                  src={demo.image}
                  alt={demo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full w-10 h-10 flex items-center justify-center mb-4">
                  {demo.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{demo.title}</h3>
                <p className="text-gray-300 mb-4">{demo.description}</p>
                <Button 
                  to={demo.link}
                  variant="primary"
                  size="sm"
                  icon={<Play size={16} />}
                >
                  Watch Demo
                </Button>
              </div>
              
              <div className="absolute top-0 right-0 m-4">
                <div className="bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full flex items-center text-xs">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                  Live Demo
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button to="/demos" size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
            View All Demos <ChevronRight size={18} className="ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;