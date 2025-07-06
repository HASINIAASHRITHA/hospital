
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MapPin, Clock, Car, Ambulance, MessageCircle, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    preferredContact: 'phone'
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Message Sent Successfully!",
      description: "Your message has been sent successfully. Our team will contact you within 24 hours.",
    });

    setFormData({
      name: '', phone: '', email: '', subject: '', message: '', preferredContact: 'phone'
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: [
        { label: 'Emergency', value: '102', highlight: true },
        { label: 'Appointments', value: '+91 11 2345 6789' },
        { label: 'General Inquiry', value: '+91 11 2345 6790' }
      ],
      color: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'Email Addresses',
      details: [
        { label: 'General', value: 'info@carehospital.in' },
        { label: 'Appointments', value: 'appointments@carehospital.in' },
        { label: 'Support', value: 'support@carehospital.in' }
      ],
      color: 'text-blue-600'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: [
        { label: 'Main Hospital', value: 'Sector 12, New Delhi - 110001' },
        { label: 'Branch Clinic', value: 'Sector 18, Noida - 201301' },
        { label: 'Diagnostic Center', value: 'Connaught Place, New Delhi - 110001' }
      ],
      color: 'text-red-600'
    },
    {
      icon: Clock,
      title: 'Timings',
      details: [
        { label: 'OPD Hours', value: '9:00 AM - 8:00 PM' },
        { label: 'Emergency', value: '24/7 Open', highlight: true },
        { label: 'Lab Services', value: '7:00 AM - 10:00 PM' }
      ],
      color: 'text-purple-600'
    }
  ];

  const emergencyServices = [
    {
      icon: Ambulance,
      title: 'Ambulance Service',
      description: '24/7 emergency ambulance with trained paramedics',
      phone: '102',
      color: 'bg-red-500'
    },
    {
      icon: Phone,
      title: 'Emergency Helpline',
      description: 'Immediate medical consultation over phone',
      phone: '+91 11 2345 6789',
      color: 'bg-orange-500'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Support',
      description: 'Quick support and appointment booking',
      phone: '+91 98765 43210',
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-orange-600 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-orange-100 leading-relaxed">
              We're here to help you 24/7. Reach out to us for appointments, emergencies, 
              or any healthcare-related queries.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-12 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Emergency Services
            </h2>
            <p className="text-lg text-gray-600">Available 24/7 for your medical emergencies</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {emergencyServices.map((service, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <Button className={`${service.color} hover:opacity-90`}>
                    Call {service.phone}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div>
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-green-500 text-white">
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
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

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <Label>Subject *</Label>
                      <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="appointment">Appointment Booking</SelectItem>
                          <SelectItem value="complaint">Complaint</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="billing">Billing Query</SelectItem>
                          <SelectItem value="medical">Medical Query</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Preferred Contact Method</Label>
                      <Select value={formData.preferredContact} onValueChange={(value) => setFormData({...formData, preferredContact: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Describe your query in detail..."
                        rows={4}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white py-3"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-3">
                      <info.icon className={`w-6 h-6 ${info.color}`} />
                      <span>{info.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {info.details.map((detail, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{detail.label}:</span>
                          <span className={`font-semibold ${detail.highlight ? 'text-red-600' : 'text-gray-900'}`}>
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Directions Card */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <CardTitle className="flex items-center space-x-2">
                    <Car className="w-5 h-5" />
                    <span>How to Reach</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2 text-sm">
                    <div><strong>By Metro:</strong> Rajiv Chowk Metro Station (5 min walk)</div>
                    <div><strong>By Bus:</strong> Routes 620, 780, 910 stop nearby</div>
                    <div><strong>Parking:</strong> Free parking available for 200+ vehicles</div>
                    <div><strong>Landmarks:</strong> Near Connaught Place, opposite City Mall</div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews Card */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5" />
                    <span>Patient Reviews</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <span className="font-semibold">4.8/5</span>
                  </div>
                  <p className="text-sm text-gray-600">"Excellent service and caring staff. Clean facilities and modern equipment."</p>
                  <p className="text-xs text-gray-500 mt-1">- Verified Patient</p>
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

export default Contact;
