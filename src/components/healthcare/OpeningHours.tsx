import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Phone } from 'lucide-react';
import { getFromLocalStorage } from '@/hooks/useLocalStorage';
import { HospitalInfo } from '@/types/healthcare';

const OpeningHours = () => {
  const hospitalInfo = getFromLocalStorage<HospitalInfo>('hospitalInfo', {
    name: 'Care Hospital',
    tagline: 'Your Health, Our Priority',
    address: '123 Healthcare Street, Medical District',
    phone: '+91 98765 43210',
    email: 'contact@carehospital.com',
    website: 'www.carehospital.com',
    emergencyNumber: '+91 98765 00000',
    generalOpeningHours: {
      monday: { isOpen: true, start: '08:00', end: '20:00' },
      tuesday: { isOpen: true, start: '08:00', end: '20:00' },
      wednesday: { isOpen: true, start: '08:00', end: '20:00' },
      thursday: { isOpen: true, start: '08:00', end: '20:00' },
      friday: { isOpen: true, start: '08:00', end: '20:00' },
      saturday: { isOpen: true, start: '09:00', end: '17:00' },
      sunday: { isOpen: false, start: '', end: '' }
    },
    emergencyHours: '24/7 Available',
    facilities: ['Emergency Care', 'ICU', 'Operation Theatre', 'Laboratory', 'Pharmacy'],
    accreditations: ['NABH Accredited', 'ISO 9001:2015']
  });

  const dayNames = {
    monday: 'Monday',
    tuesday: 'Tuesday', 
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  };

  const formatTime = (time: string) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="bg-card shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardTitle className="flex items-center gap-2 text-primary">
            <Clock className="w-5 h-5" />
            General Hours
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {Object.entries(hospitalInfo.generalOpeningHours).map(([day, hours]) => (
              <div key={day} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                <span className="font-medium text-foreground capitalize">
                  {dayNames[day as keyof typeof dayNames]}
                </span>
                <span className="text-muted-foreground">
                  {hours.isOpen ? (
                    `${formatTime(hours.start)} - ${formatTime(hours.end)}`
                  ) : (
                    <span className="text-destructive">Closed</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-destructive/10 to-destructive/5">
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Phone className="w-5 h-5" />
            Emergency Services
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center p-4 bg-destructive/10 rounded-lg">
              <p className="text-lg font-bold text-destructive mb-2">
                {hospitalInfo.emergencyHours}
              </p>
              <p className="text-sm text-muted-foreground">Emergency services available</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Emergency Hotline:</span>
                <a 
                  href={`tel:${hospitalInfo.emergencyNumber}`}
                  className="text-destructive font-bold hover:underline"
                >
                  {hospitalInfo.emergencyNumber}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">General Inquiries:</span>
                <a 
                  href={`tel:${hospitalInfo.phone}`}
                  className="text-primary font-bold hover:underline"
                >
                  {hospitalInfo.phone}
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OpeningHours;