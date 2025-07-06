
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Clock, Award, Heart, Stethoscope, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Advanced Safety Protocols',
      description: 'State-of-the-art safety measures and infection control protocols to ensure patient wellbeing.',
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-100 to-emerald-100',
      hoverColor: 'hover:from-green-200 hover:to-emerald-200'
    },
    {
      icon: Clock,
      title: '24/7 Emergency Care',
      description: 'Round-the-clock emergency services with rapid response times and expert medical staff.',
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100',
      hoverColor: 'hover:from-blue-200 hover:to-cyan-200'
    },
    {
      icon: Award,
      title: 'Award-Winning Care',
      description: 'Recognized excellence in healthcare delivery with multiple national and international awards.',
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-100 to-violet-100',
      hoverColor: 'hover:from-purple-200 hover:to-violet-200'
    },
    {
      icon: Heart,
      title: 'Compassionate Service',
      description: 'Patient-centered care approach focusing on comfort, dignity, and personalized treatment plans.',
      color: 'text-red-600',
      bgColor: 'bg-gradient-to-br from-red-100 to-pink-100',
      hoverColor: 'hover:from-red-200 hover:to-pink-200'
    }
  ];

  const achievements = [
    { number: '99.8%', label: 'Patient Satisfaction', icon: Heart },
    { number: '50K+', label: 'Lives Saved', icon: Users },
    { number: '25+', label: 'Years of Excellence', icon: Award },
    { number: '500+', label: 'Medical Staff', icon: Stethoscope }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-200/20 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Content - Enhanced */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">Why Choose Us</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Care Hospital?
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                We combine cutting-edge medical technology with compassionate care to deliver 
                exceptional healthcare experiences that put patients first.
              </p>
            </div>
            
            {/* Enhanced feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className={`border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer overflow-hidden`}
                >
                  <CardContent className="p-8 relative">
                    <div className={`absolute inset-0 ${feature.bgColor} ${feature.hoverColor} transition-all duration-300 opacity-50 group-hover:opacity-70`}></div>
                    <div className="relative z-10">
                      <div className={`w-16 h-16 ${feature.bgColor} ${feature.hoverColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                        <feature.icon className={`w-8 h-8 ${feature.color}`} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 rounded-xl"
              >
                Learn More About Our Services
              </Button>
            </div>
          </div>

          {/* Right Image - Enhanced */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=700&fit=crop"
                alt="Modern hospital interior"
                className="w-full h-[700px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent" />
            </div>
            
            {/* Floating Achievement Cards - Enhanced */}
            <div className="absolute -top-8 -left-8 bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 transform hover:rotate-3 transition-transform duration-300">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">99.8%</div>
                <div className="text-sm text-gray-600 font-medium">Patient Satisfaction</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="w-4 h-4 text-red-500 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -right-8 bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 transform hover:-rotate-3 transition-transform duration-300">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">50K+</div>
                <div className="text-sm text-gray-600 font-medium">Lives Saved</div>
                <div className="flex justify-center mt-2">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>

            {/* Additional floating elements */}
            <div className="absolute top-1/3 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 shadow-xl animate-bounce">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Bottom achievements section */}
        <div className="mt-24 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <achievement.icon className="w-8 h-8 mx-auto mb-4 text-blue-600 group-hover:text-purple-600 transition-colors" />
                  <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {achievement.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{achievement.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
