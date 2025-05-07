import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import Technologies from '../components/home/Technologies';
import DemoSection from '../components/home/DemoSection';
import CallToAction from '../components/home/CallToAction';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Technologies />
      <DemoSection />
      <CallToAction />
    </>
  );
};

export default HomePage;