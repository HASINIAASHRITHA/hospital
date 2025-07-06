
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MapPin, Calendar, Clock, Search, Phone, Award, GraduationCap, Users } from 'lucide-react';
import { Doctor } from '@/types/healthcare';
import { getFromLocalStorage } from '@/hooks/useLocalStorage';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<string[]>(['All']);

  useEffect(() => {
    const storedDoctors = getFromLocalStorage<Doctor[]>('doctors', []);
    const activeDoctors = storedDoctors.filter(doctor => doctor.status === 'active');
    setDoctors(activeDoctors);
    
    // Extract unique specialties from doctors
    const uniqueSpecialties = ['All', ...Array.from(new Set(activeDoctors.map(doctor => doctor.specialization)))];
    setSpecialties(uniqueSpecialties);
  }, []);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || 
                            doctor.specialization.toLowerCase() === selectedSpecialty.toLowerCase();
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
      <Header />
      
      {/* Premium Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white leading-tight">
              World-Class
              <span className="block bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
                Medical Experts
              </span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Connect with our finest doctors and specialists. Experience premium healthcare 
              with personalized treatment plans and cutting-edge medical technology.
            </p>
          </div>
        </div>
      </section>

      {/* Premium Search Section */}
      <section className="py-12 bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by doctor name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-sm"
              />
            </div>
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-full lg:w-64 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty.toLowerCase()}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Premium Doctors Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {doctors.length === 0 ? 'No Doctors Available' : 'No doctors found matching your criteria'}
              </h3>
              <p className="text-gray-500 text-lg mb-8">
                {doctors.length === 0 
                  ? 'Our medical team will be available soon. Please check back later.' 
                  : 'Try adjusting your search criteria or browse all doctors.'
                }
              </p>
              {doctors.length > 0 && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSpecialty('all');
                  }}
                  className="px-8 py-3 rounded-xl border-2 hover:bg-blue-50 hover:border-blue-500 transition-all duration-300"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="group hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 bg-white/90 backdrop-blur-sm border-0 shadow-xl overflow-hidden rounded-2xl">
                  <div className="relative overflow-hidden">
                    {doctor.image ? (
                      <img 
                        src={doctor.image} 
                        alt={doctor.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=random&size=400`;
                        }}
                      />
                    ) : (
                      <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <Users className="w-12 h-12 text-blue-600" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    
                    <div className="absolute top-6 right-6">
                      {doctor.available ? (
                        <Badge className="bg-emerald-500 text-white px-3 py-1 shadow-lg">
                          Available Today
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-500 text-white px-3 py-1 shadow-lg">
                          Busy Today
                        </Badge>
                      )}
                    </div>
                    
                    {doctor.rating && (
                      <div className="absolute bottom-6 left-6">
                        <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-bold text-gray-900">{doctor.rating}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50 px-3 py-1">
                          {doctor.specialization}
                        </Badge>
                        {doctor.consultationFee > 0 && (
                          <span className="text-lg font-bold text-emerald-600">₹{doctor.consultationFee}</span>
                        )}
                      </div>
                    </div>
                    
                    {doctor.bio && (
                      <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">
                        {doctor.bio}
                      </p>
                    )}
                    
                    <div className="space-y-3 mb-6">
                      {doctor.qualification && (
                        <div className="flex items-center space-x-3 text-sm text-gray-700">
                          <GraduationCap className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">{doctor.qualification}</span>
                        </div>
                      )}
                      {doctor.experience > 0 && (
                        <div className="flex items-center space-x-3 text-sm text-gray-700">
                          <Award className="w-4 h-4 text-purple-600" />
                          <span>{doctor.experience} Years Experience</span>
                        </div>
                      )}
                      {doctor.department && (
                        <div className="flex items-center space-x-3 text-sm text-gray-700">
                          <MapPin className="w-4 h-4 text-red-600" />
                          <span>{doctor.department}</span>
                        </div>
                      )}
                    </div>
                    
                    {doctor.languages && doctor.languages.length > 0 && (
                      <div className="mb-6">
                        <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                          Languages
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {doctor.languages.map((lang, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {doctor.achievements && doctor.achievements.length > 0 && (
                      <div className="mb-6">
                        <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                          Achievements
                        </div>
                        <div className="space-y-1">
                          {doctor.achievements.slice(0, 2).map((achievement, idx) => (
                            <div key={idx} className="text-xs text-gray-600 flex items-center">
                              <Award className="w-3 h-3 text-yellow-600 mr-2" />
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={!doctor.available}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        {doctor.available ? 'Book Now' : 'Schedule'}
                      </Button>
                      {doctor.phone && (
                        <Button 
                          variant="outline" 
                          className="px-4 rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                        >
                          <Phone className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Doctors;
