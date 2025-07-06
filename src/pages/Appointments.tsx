import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, Phone, Mail, MapPin, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Appointment } from '@/types/healthcare';

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    gender: '',
    department: '',
    doctor: '',
    symptoms: '',
    preferredLanguage: 'english'
  });
  
  const { toast } = useToast();

  const departments = [
    'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 
    'Ophthalmology', 'General Medicine', 'Gynecology', 'Dermatology'
  ];

  const doctors = {
    'Cardiology': ['Dr. Rajesh Kumar', 'Dr. Priya Sharma', 'Dr. Amit Patel'],
    'Neurology': ['Dr. Sanjay Gupta', 'Dr. Meera Singh', 'Dr. Vikram Rao'],
    'Pediatrics': ['Dr. Sunita Malhotra', 'Dr. Ravi Agarwal', 'Dr. Kavya Reddy'],
    'Orthopedics': ['Dr. Manoj Joshi', 'Dr. Deepika Nair', 'Dr. Suresh Kumar'],
    'Ophthalmology': ['Dr. Anita Verma', 'Dr. Rohit Bansal', 'Dr. Lakshmi Iyer'],
    'General Medicine': ['Dr. Ashok Tiwari', 'Dr. Rekha Jain', 'Dr. Mohan Das']
  };

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !formData.name || !formData.phone || !formData.department) {
      toast({
        title: "Please fill all required fields",
        description: "All mandatory fields must be completed",
        variant: "destructive"
      });
      return;
    }

    // Create appointment object that matches the Appointment interface
    const newAppointment: Appointment = {
      id: `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      patientId: `patient_${Date.now()}`,
      patientName: formData.name,
      patientEmail: formData.email,
      patientPhone: formData.phone,
      doctorId: `doctor_${formData.doctor?.replace(/\s+/g, '_').toLowerCase()}`,
      doctorName: formData.doctor || 'To be assigned',
      department: formData.department,
      date: selectedDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
      time: selectedTime,
      duration: 30,
      type: 'consultation',
      status: 'pending',
      symptoms: formData.symptoms,
      notes: `Age: ${formData.age}, Gender: ${formData.gender}, Language: ${formData.preferredLanguage}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to localStorage
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedAppointments = [...existingAppointments, newAppointment];
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    console.log('New appointment saved:', newAppointment);

    toast({
      title: "Appointment Booked Successfully!",
      description: "Your appointment has been successfully booked. Our team will contact you shortly for confirmation.",
    });

    // Reset form
    setFormData({
      name: '', phone: '', email: '', age: '', gender: '', 
      department: '', doctor: '', symptoms: '', preferredLanguage: 'english'
    });
    setSelectedDate(undefined);
    setSelectedTime('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-orange-600 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Book Your Appointment
            </h1>
            <p className="text-xl text-orange-100 leading-relaxed">
              Schedule your consultation with our expert doctors. 
              Easy booking process with instant confirmation.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-green-500 text-white">
                  <CardTitle className="text-2xl">Book Appointment</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Personal Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+91 XXXXX XXXXX"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          value={formData.age}
                          onChange={(e) => setFormData({...formData, age: e.target.value})}
                          placeholder="25"
                        />
                      </div>
                      <div>
                        <Label>Gender</Label>
                        <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Department and Doctor */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Department *</Label>
                        <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Doctor</Label>
                        <Select 
                          value={formData.doctor} 
                          onValueChange={(value) => setFormData({...formData, doctor: value})}
                          disabled={!formData.department}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select doctor" />
                          </SelectTrigger>
                          <SelectContent>
                            {formData.department && doctors[formData.department as keyof typeof doctors]?.map((doctor) => (
                              <SelectItem key={doctor} value={doctor}>{doctor}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Language Preference */}
                    <div>
                      <Label>Preferred Language</Label>
                      <Select value={formData.preferredLanguage} onValueChange={(value) => setFormData({...formData, preferredLanguage: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hindi">Hindi</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="bengali">Bengali</SelectItem>
                          <SelectItem value="tamil">Tamil</SelectItem>
                          <SelectItem value="telugu">Telugu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Symptoms */}
                    <div>
                      <Label htmlFor="symptoms">Symptoms / Reason for Visit</Label>
                      <Textarea
                        id="symptoms"
                        value={formData.symptoms}
                        onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                        placeholder="Describe your symptoms or reason for visit..."
                        rows={3}
                      />
                    </div>

                    {/* Date Selection */}
                    <div>
                      <Label>Select Date *</Label>
                      <div className="mt-2">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date() || date.getDay() === 0}
                          className="rounded-md border shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Time Selection */}
                    {selectedDate && (
                      <div>
                        <Label>Select Time *</Label>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              type="button"
                              variant={selectedTime === time ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedTime(time)}
                              className={selectedTime === time ? "bg-gradient-to-r from-orange-500 to-green-500" : ""}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white py-3 text-lg"
                    >
                      Book Appointment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Contact Card */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-semibold">Emergency: 102</div>
                      <div className="text-sm text-gray-600">Appointments: +91 98765 43210</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div className="text-sm">appointments@carehospital.in</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <div className="text-sm">123 Medical Center, New Delhi - 110001</div>
                  </div>
                </CardContent>
              </Card>

              {/* Timings Card */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                  <CardTitle>Hospital Timings</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between">
                    <span>OPD Hours:</span>
                    <span className="font-semibold">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergency:</span>
                    <Badge className="bg-red-500">24/7 Open</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Lab Services:</span>
                    <span className="font-semibold">7:00 AM - 10:00 PM</span>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Info */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <CardTitle>Payment Options</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span className="text-sm">Cash / Card / UPI</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Insurance: CGHS, ECHS, Cashless available
                  </div>
                  <Badge className="bg-green-100 text-green-800">Consultation: ₹200 onwards</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Appointments;
