import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';
import { Doctor } from '@/types/healthcare';
import { cn } from '@/lib/utils';

interface DoctorAvailabilityCalendarProps {
  doctor: Doctor;
  onTimeSlotSelect?: (date: Date, time: string) => void;
}

const DoctorAvailabilityCalendar = ({ doctor, onTimeSlotSelect }: DoctorAvailabilityCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();

  const getDayOfWeek = (date: Date) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[date.getDay()];
  };

  const generateTimeSlots = (start: string, end: string) => {
    const slots = [];
    const startTime = new Date(`2000-01-01T${start}:00`);
    const endTime = new Date(`2000-01-01T${end}:00`);
    
    while (startTime < endTime) {
      slots.push(startTime.toTimeString().slice(0, 5));
      startTime.setMinutes(startTime.getMinutes() + 30);
    }
    
    return slots;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const isDateAvailable = (date: Date) => {
    const dayOfWeek = getDayOfWeek(date);
    const availability = doctor.availability[dayOfWeek];
    return availability?.isAvailable && date >= new Date();
  };

  const getAvailableTimeSlots = () => {
    if (!selectedDate) return [];
    
    const dayOfWeek = getDayOfWeek(selectedDate);
    const availability = doctor.availability[dayOfWeek];
    
    if (!availability?.isAvailable) return [];
    
    return generateTimeSlots(availability.start, availability.end);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (onTimeSlotSelect && selectedDate) {
      onTimeSlotSelect(selectedDate, time);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <CalendarIcon className="w-5 h-5" />
            Select Date
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => !isDateAvailable(date)}
            className="rounded-md border shadow-sm"
          />
        </CardContent>
      </Card>

      {selectedDate && (
        <Card className="bg-card shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Clock className="w-5 h-5" />
              Available Time Slots
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {getAvailableTimeSlots().map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className={cn(
                    "h-12 text-sm",
                    selectedTime === time && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => handleTimeSelect(time)}
                >
                  {formatTime(time)}
                </Button>
              ))}
              {getAvailableTimeSlots().length === 0 && (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No available slots for this date</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-card shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-primary">Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(doctor.availability).map(([day, schedule]) => (
              <div key={day} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                <span className="font-medium capitalize">{day}</span>
                {schedule.isAvailable ? (
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    {formatTime(schedule.start)} - {formatTime(schedule.end)}
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-muted text-muted-foreground">
                    Not Available
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorAvailabilityCalendar;