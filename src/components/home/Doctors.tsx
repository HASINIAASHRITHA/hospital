
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Calendar, Users } from 'lucide-react';
import { Doctor } from '@/types/healthcare';
import { getFromLocalStorage } from '@/hooks/useLocalStorage';

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const storedDoctors = getFromLocalStorage<Doctor[]>('doctors', []);
    // Only show active doctors, limit to 4 for home page
    const activeDoctors = storedDoctors.filter(doctor => doctor.status === 'active').slice(0, 4);
    setDoctors(activeDoctors);
  }, []);

  if (doctors.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Badge className="bg-green-100 text-green-800 px-4 py-2 mb-4">
              Meet Our Experts
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Distinguished Doctors
            </h2>
            <div className="max-w-md mx-auto">
              <Card className="border-dashed border-2 border-gray-200">
                <CardContent className="p-12 text-center">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Doctors Available</h3>
                  <p className="text-gray-600">
                    Our medical team will be available soon. Please check back later.
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-green-100 text-green-800 px-4 py-2 mb-4">
            Meet Our Experts
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Distinguished Doctors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our team of experienced physicians brings expertise and compassion 
            to provide you with the highest quality medical care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden">
              <div className="relative">
                {doctor.image ? (
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=random&size=400`;
                    }}
                  />
                ) : (
                  <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Users className="w-10 h-10 text-blue-600" />
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  {doctor.available ? (
                    <Badge className="bg-green-500 text-white">Available Today</Badge>
                  ) : (
                    <Badge className="bg-gray-500 text-white">Busy</Badge>
                  )}
                </div>
                {doctor.rating && (
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold text-gray-900">{doctor.rating}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    {doctor.specialization}
                  </Badge>
                  {doctor.experience > 0 && (
                    <span className="text-sm text-gray-500">{doctor.experience} years</span>
                  )}
                </div>
                
                {doctor.bio && (
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                    {doctor.bio}
                  </p>
                )}
                
                <div className="space-y-2 mb-6">
                  {doctor.department && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{doctor.department}</span>
                    </div>
                  )}
                  {doctor.qualification && (
                    <div className="text-xs text-gray-500">
                      {doctor.qualification}
                    </div>
                  )}
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                  disabled={!doctor.available}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {doctor.available ? 'Book Appointment' : 'Schedule Later'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-blue-200 text-blue-600 hover:bg-blue-50">
            View All Doctors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Doctors;
