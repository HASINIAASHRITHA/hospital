
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Calendar, Users } from 'lucide-react';
import { Doctor } from '@/types/healthcare';
import { getFromLocalStorage } from '@/hooks/useLocalStorage';

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const storedDoctors = getFromLocalStorage<Doctor[]>('doctors', []);
    // Only show active doctors
    const activeDoctors = storedDoctors.filter(doctor => doctor.status === 'active');
    setDoctors(activeDoctors);
  }, []);

  if (doctors.length === 0) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Badge className="bg-medical-blue/10 text-medical-blue px-4 py-2 mb-4">
              Meet Our Experts
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Distinguished Doctors
            </h2>
            <div className="max-w-md mx-auto">
              <Card className="border-dashed border-2 border-border">
                <CardContent className="p-12 text-center">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Doctors Added Yet</h3>
                  <p className="text-muted-foreground">
                    Doctors will be displayed here once added by the administrator.
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-medical-blue/10 text-medical-blue px-4 py-2 mb-4">
            Meet Our Experts
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Distinguished Doctors
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our team of experienced physicians brings expertise and compassion to provide you with the highest quality medical care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {doctors.slice(0, 8).map((doctor) => (
            <Card key={doctor.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg overflow-hidden">
              <div className="relative">
                {doctor.image && (
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=random&size=400`;
                    }}
                  />
                )}
                <div className="absolute top-4 right-4">
                  <Badge className={doctor.available ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}>
                    {doctor.available ? 'Available' : 'Busy'}
                  </Badge>
                </div>
                {doctor.rating && (
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center space-x-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 text-warning fill-current" />
                      <span className="text-sm font-semibold text-foreground">{doctor.rating}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{doctor.name}</h3>
                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant="outline" className="text-medical-blue border-medical-blue/20">
                    {doctor.specialization}
                  </Badge>
                  {doctor.experience && (
                    <span className="text-sm text-muted-foreground">{doctor.experience} years exp</span>
                  )}
                </div>
                
                {doctor.bio && (
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                    {doctor.bio}
                  </p>
                )}
                
                <div className="space-y-2 mb-6">
                  {doctor.department && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{doctor.department}</span>
                    </div>
                  )}
                  {doctor.qualification && (
                    <div className="text-xs text-muted-foreground">
                      {doctor.qualification}
                    </div>
                  )}
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-medical-blue to-primary hover:shadow-lg transition-all duration-300"
                  disabled={!doctor.available}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {doctor.available ? 'Book Appointment' : 'Schedule Later'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {doctors.length > 8 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-medical-blue/20 text-medical-blue hover:bg-medical-blue/5">
              View All Doctors
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorsSection;
