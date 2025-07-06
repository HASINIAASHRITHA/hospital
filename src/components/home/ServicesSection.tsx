import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Hospital } from 'lucide-react';
import { Department } from '@/types/healthcare';
import { getFromLocalStorage } from '@/hooks/useLocalStorage';

const ServicesSection = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const storedDepartments = getFromLocalStorage<Department[]>('departments', []);
    setDepartments(storedDepartments);
  }, []);

  if (departments.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-medical-blue/5">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Badge className="bg-primary/10 text-primary px-4 py-2 mb-4">
              Our Specialties
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              World-Class Medical Services
            </h2>
            <div className="max-w-md mx-auto">
              <Card className="border-dashed border-2 border-border">
                <CardContent className="p-12 text-center">
                  <Hospital className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Services Added Yet</h3>
                  <p className="text-muted-foreground">
                    Medical services and departments will be displayed here once added by the administrator.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-medical-blue/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-primary/10 text-primary px-4 py-2 mb-4">
            Our Specialties
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            World-Class Medical Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We offer comprehensive healthcare services across multiple specialties, 
            combining expertise with compassionate care to ensure the best outcomes for our patients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((department) => (
            <Card 
              key={department.id} 
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-card/70 backdrop-blur-sm border-0 shadow-lg"
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-medical-blue flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {department.icon || '🏥'}
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {department.name}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {department.description}
                </p>
                
                {department.services && department.services.length > 0 && (
                  <div className="space-y-2">
                    {department.services.slice(0, 3).map((service, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{service}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-6 pt-6 border-t border-border">
                  <button className="text-primary font-semibold hover:text-primary/80 transition-colors group-hover:translate-x-2 transform duration-300">
                    Learn More →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;