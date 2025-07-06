
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ServicesSection from '@/components/home/ServicesSection';
import DoctorsSection from '@/components/home/DoctorsSection';
import Features from '@/components/home/Features';
import OpeningHours from '@/components/healthcare/OpeningHours';
import ChatWidget from '@/components/healthcare/ChatWidget';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <ServicesSection />
        <DoctorsSection />
        <Features />
        <OpeningHours />
      </main>
      <ChatWidget />
      <Footer />
    </div>
  );
};

export default Index;
