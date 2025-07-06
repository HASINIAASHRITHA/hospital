
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Phone, Clock, Star, Shield, Award } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Excellence in Healthcare",
      subtitle: "World-Class Medical Care",
      description: "Experience premium healthcare with our team of expert doctors and state-of-the-art facilities.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=800&fit=crop&crop=center",
      cta: "Book Appointment",
      accent: "from-blue-600 to-cyan-600"
    },
    {
      title: "24/7 Emergency Care",
      subtitle: "Always Here for You",
      description: "Our emergency department is staffed around the clock with experienced medical professionals.",
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1200&h=800&fit=crop&crop=center",
      cta: "Emergency Services",
      accent: "from-red-600 to-pink-600"
    },
    {
      title: "Advanced Technology",
      subtitle: "Cutting-Edge Treatment",
      description: "We utilize the latest medical technology to provide accurate diagnoses and effective treatments.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=800&fit=crop&crop=center",
      cta: "Our Services",
      accent: "from-green-600 to-emerald-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-1000"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent}/80 via-slate-900/60 to-transparent`} />
        </div>
      ))}

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300/40 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-cyan-300/20 rounded-full animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="mb-8">
              {/* Animated subtitle badge */}
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/15 backdrop-blur-md rounded-full text-white text-sm font-medium mb-6 animate-fade-in border border-white/20">
                <Star className="w-4 h-4 text-yellow-300" />
                <span>{slides[currentSlide].subtitle}</span>
              </div>
              
              {/* Main title with enhanced typography */}
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight animate-fade-in">
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                  {slides[currentSlide].title}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed max-w-3xl animate-fade-in">
                {slides[currentSlide].description}
              </p>
            </div>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <Button 
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg rounded-xl border border-white/20"
              >
                <Link to="/appointments" className="flex items-center">
                  <Calendar className="w-6 h-6 mr-3" />
                  {slides[currentSlide].cta}
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 transition-all duration-300 px-8 py-4 text-lg rounded-xl hover:scale-105 transform"
              >
                <Phone className="w-6 h-6 mr-3" />
                Emergency: (555) 911-9111
              </Button>
            </div>

            {/* Enhanced stats with animations */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl">
              <div className="text-center group cursor-pointer">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                  <div className="text-4xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">50+</div>
                  <div className="text-blue-200 text-sm font-medium">Expert Doctors</div>
                </div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                  <div className="text-4xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">15+</div>
                  <div className="text-blue-200 text-sm font-medium">Specialties</div>
                </div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                  <div className="text-4xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">24/7</div>
                  <div className="text-blue-200 text-sm font-medium">Emergency Care</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'w-8 h-3 bg-white shadow-lg' 
                : 'w-3 h-3 bg-white/50 hover:bg-white/75 hover:scale-110'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Floating achievement badges */}
      <div className="absolute top-20 right-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 animate-fade-in hidden lg:block">
        <div className="flex items-center space-x-2 text-white">
          <Award className="w-6 h-6 text-yellow-300" />
          <div>
            <div className="text-sm font-bold">Award Winner</div>
            <div className="text-xs text-blue-200">Healthcare Excellence</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 right-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 animate-fade-in hidden lg:block">
        <div className="flex items-center space-x-2 text-white">
          <Shield className="w-6 h-6 text-green-300" />
          <div>
            <div className="text-sm font-bold">Safe & Secure</div>
            <div className="text-xs text-blue-200">Patient Privacy Protected</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator with enhanced animation */}
      <div className="absolute bottom-8 right-8 text-white animate-bounce">
        <div className="flex flex-col items-center space-y-3 bg-white/10 backdrop-blur-md rounded-full p-4 border border-white/20">
          <Clock className="w-6 h-6" />
          <div className="w-px h-6 bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
