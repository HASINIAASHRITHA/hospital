
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Phone, Mail, MessageSquare, CheckCircle, XCircle, Clock, Send } from 'lucide-react';
import { Appointment } from '@/types/healthcare';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>('appointments', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  // Reload appointments every 2 seconds to show new bookings
  useEffect(() => {
    const interval = setInterval(() => {
      const storedAppointments = localStorage.getItem('appointments');
      if (storedAppointments) {
        const parsedAppointments = JSON.parse(storedAppointments);
        setAppointments(parsedAppointments);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [setAppointments]);

  const updateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: newStatus as Appointment['status'], updatedAt: new Date().toISOString() }
        : apt
    );
    
    setAppointments(updatedAppointments);
    
    // Find the updated appointment for WhatsApp notification
    const updatedAppointment = updatedAppointments.find(apt => apt.id === appointmentId);
    
    if (updatedAppointment) {
      // Send WhatsApp notification
      await sendWhatsAppNotification(updatedAppointment, newStatus);
      
      toast({
        title: "Status Updated",
        description: `Appointment ${newStatus} and WhatsApp message sent to ${updatedAppointment.patientPhone}`,
      });
    }
  };

  const sendWhatsAppNotification = async (appointment: Appointment, status: string) => {
    try {
      const message = generateStatusMessage(appointment, status);
      const phoneNumber = appointment.patientPhone.replace(/[^0-9]/g, ''); // Remove all non-numeric characters
      
      // Create WhatsApp URL with pre-filled message
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp in a new window
      window.open(whatsappUrl, '_blank');
      
      console.log('WhatsApp message to', appointment.patientPhone, ':', message);
      
      toast({
        title: "WhatsApp Opened",
        description: `WhatsApp opened with message for ${appointment.patientName}`,
      });
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      toast({
        title: "Error",
        description: "Failed to open WhatsApp",
        variant: "destructive",
      });
    }
  };

  const generateStatusMessage = (appointment: Appointment, status: string) => {
    const hospitalName = "Care Hospital";
    const baseMessage = `Hello ${appointment.patientName}, this is ${hospitalName}.`;
    
    const messages = {
      confirmed: `${baseMessage} Your appointment with ${appointment.doctorName} on ${appointment.date} at ${appointment.time} has been CONFIRMED. Please arrive 15 minutes early. For any queries, call us at +91 98765 43210.`,
      cancelled: `${baseMessage} We regret to inform you that your appointment with ${appointment.doctorName} scheduled for ${appointment.date} at ${appointment.time} has been CANCELLED. Please contact us to reschedule at +91 98765 43210.`,
      completed: `${baseMessage} Thank you for visiting us today. Your appointment with ${appointment.doctorName} has been completed. Take care and follow the prescribed treatment. Contact us for any follow-up needs.`,
      rescheduled: `${baseMessage} Your appointment with ${appointment.doctorName} has been RESCHEDULED. Our team will contact you shortly with the new date and time. Sorry for any inconvenience. Contact: +91 98765 43210`
    };
    
    return messages[status as keyof typeof messages] || `${baseMessage} Your appointment status has been updated to ${status}.`;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { class: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Pending' },
      confirmed: { class: 'bg-green-100 text-green-800 border-green-200', label: 'Confirmed' },
      completed: { class: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Completed' },
      cancelled: { class: 'bg-red-100 text-red-800 border-red-200', label: 'Cancelled' },
      rescheduled: { class: 'bg-purple-100 text-purple-800 border-purple-200', label: 'Rescheduled' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return { class: config.class, label: config.label };
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const appointmentStats = {
    total: appointments.length,
    pending: appointments.filter(apt => apt.status === 'pending').length,
    confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
    completed: appointments.filter(apt => apt.status === 'completed').length,
    cancelled: appointments.filter(apt => apt.status === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{appointmentStats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{appointmentStats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{appointmentStats.confirmed}</div>
              <div className="text-sm text-gray-600">Confirmed</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{appointmentStats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{appointmentStats.cancelled}</div>
              <div className="text-sm text-gray-600">Cancelled</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-sm border-0 rounded-xl">
        <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">Appointment Management</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Manage appointment statuses and send WhatsApp notifications</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              placeholder="Search appointments by patient name, email, department, or doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {appointments.length === 0 ? 'No Appointments Yet' : 'No Matching Appointments'}
              </h3>
              <p className="text-gray-600">
                {appointments.length === 0 
                  ? 'Appointments will appear here once patients book them' 
                  : 'Try adjusting your search criteria or filters'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Patient Details</TableHead>
                    <TableHead className="font-semibold">Appointment Info</TableHead>
                    <TableHead className="font-semibold">Contact</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => {
                    const statusConfig = getStatusBadge(appointment.status);
                    return (
                      <TableRow key={appointment.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{appointment.patientName}</p>
                            <p className="text-sm text-gray-600">{appointment.patientEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium">{appointment.date} at {appointment.time}</span>
                            </div>
                            <div className="text-sm text-gray-600">{appointment.department}</div>
                            <div className="text-sm font-medium text-gray-900">{appointment.doctorName}</div>
                            {appointment.symptoms && (
                              <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded mt-2">
                                <strong>Symptoms:</strong> {appointment.symptoms}
                              </div>
                            )}
                            {appointment.notes && (
                              <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded mt-1">
                                <strong>Notes:</strong> {appointment.notes}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{appointment.patientPhone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{appointment.patientEmail}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${statusConfig.class} border text-xs`}>
                            {statusConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {appointment.status === 'pending' && (
                              <>
                                <Button 
                                  size="sm" 
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="text-red-600 border-red-600 hover:bg-red-50"
                                  onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                                >
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Cancel
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="text-purple-600 border-purple-600 hover:bg-purple-50"
                                  onClick={() => updateAppointmentStatus(appointment.id, 'rescheduled')}
                                >
                                  <Clock className="w-3 h-3 mr-1" />
                                  Reschedule
                                </Button>
                              </>
                            )}
                            {appointment.status === 'confirmed' && (
                              <>
                                <Button 
                                  size="sm" 
                                  className="bg-blue-600 hover:bg-blue-700 text-white"
                                  onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Complete
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="text-purple-600 border-purple-600 hover:bg-purple-50"
                                  onClick={() => updateAppointmentStatus(appointment.id, 'rescheduled')}
                                >
                                  <Clock className="w-3 h-3 mr-1" />
                                  Reschedule
                                </Button>
                              </>
                            )}
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                              onClick={() => sendWhatsAppNotification(appointment, appointment.status)}
                            >
                              <MessageSquare className="w-3 h-3 mr-1" />
                              WhatsApp
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentManagement;
