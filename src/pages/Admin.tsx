import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppointmentManagement from '@/components/admin/AppointmentManagement';
import PatientManagement from '@/components/admin/PatientManagement';
import DoctorManagement from '@/components/admin/DoctorManagement';
import NotificationManagement from '@/components/admin/NotificationManagement';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  Search, 
  Filter,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  Bell,
  Settings,
  Mail,
  Phone,
  Clock,
  MapPin,
  Star,
  Stethoscope,
  UserCheck
} from 'lucide-react';
import { Appointment, ContactMessage } from '@/types/healthcare';

interface PatientRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  address: string;
  emergencyContact: string;
  medicalHistory: string;
  registrationDate: string;
  lastVisit: string;
  status: 'active' | 'inactive';
}

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userAppointments, setUserAppointments] = useState<Appointment[]>([]);
  const [userContacts, setUserContacts] = useState<ContactMessage[]>([]);
  const [userPatients, setUserPatients] = useState<PatientRecord[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const loadData = () => {
      const appointmentsData = localStorage.getItem('appointments');
      const contacts = localStorage.getItem('contacts');
      const patients = localStorage.getItem('patients');

      console.log('Loading appointments data:', appointmentsData);

      if (appointmentsData) {
        const rawAppointments = JSON.parse(appointmentsData);
        console.log('Raw appointments:', rawAppointments);
        
        // Directly use the appointments as they are already in the correct format
        setUserAppointments(rawAppointments);
      }
      if (contacts) {
        setUserContacts(JSON.parse(contacts));
      }
      if (patients) {
        setUserPatients(JSON.parse(patients));
      }
    };

    loadData();
    // Set up interval to refresh data every 2 seconds to match AppointmentManagement
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, []);

  const dashboardStats = [
    {
      title: 'Total Appointments',
      value: userAppointments.length,
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      change: '+0%',
      description: 'Appointment bookings'
    },
    {
      title: 'Patient Records',
      value: userPatients.length,
      icon: Users,
      color: 'from-emerald-500 to-emerald-600',
      change: '+0%',
      description: 'Registered patients'
    },
    {
      title: 'Contact Messages',
      value: userContacts.length,
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600',
      change: '+0%',
      description: 'Inquiry messages'
    },
    {
      title: 'Today\'s Activity',
      value: userAppointments.filter(apt => 
        new Date(apt.date).toDateString() === new Date().toDateString()
      ).length,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      change: '+0%',
      description: 'Today\'s appointments'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmed: 'bg-green-100 text-green-800 border-green-200',
      completed: 'bg-blue-100 text-blue-800 border-blue-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
      new: 'bg-blue-100 text-blue-800 border-blue-200',
      read: 'bg-gray-100 text-gray-800 border-gray-200',
      replied: 'bg-green-100 text-green-800 border-green-200',
      active: 'bg-green-100 text-green-800 border-green-200',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const filteredContacts = userContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPatients = userPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      {/* Enhanced Premium Header */}
      <div className="bg-white shadow-lg border-b-2 border-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Care Hospital
                </h1>
                <p className="text-lg text-gray-600 mt-1 font-medium">Administrative Dashboard & Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80 border-gray-200 focus:border-blue-500 rounded-lg shadow-sm"
                />
              </div>
              <Button variant="outline" className="border-gray-200 hover:bg-gray-50 rounded-lg shadow-sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="icon" className="border-gray-200 hover:bg-gray-50 rounded-lg shadow-sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-200 hover:bg-gray-50 rounded-lg shadow-sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-sm hover:shadow-lg transition-all duration-300 border-0 rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Premium Content Tabs */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm rounded-xl p-1 border border-gray-100">
            <TabsTrigger 
              value="appointments" 
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Appointments
            </TabsTrigger>
            <TabsTrigger 
              value="patients" 
              className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200"
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Patients
            </TabsTrigger>
            <TabsTrigger 
              value="doctors" 
              className="data-[state=active]:bg-medical-blue data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200"
            >
              <Stethoscope className="w-4 h-4 mr-2" />
              Doctors
            </TabsTrigger>
            <TabsTrigger 
              value="messages" 
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Appointments Tab with Full CRUD Management */}
          <TabsContent value="appointments">
            <AppointmentManagement />
          </TabsContent>

          {/* Patients Tab with Full CRUD Management */}
          <TabsContent value="patients">
            <PatientManagement />
          </TabsContent>

          {/* Doctors Tab with Full CRUD Management */}
          <TabsContent value="doctors">
            <DoctorManagement />
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card className="bg-white shadow-sm border-0 rounded-xl">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900">Contact Messages</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">Messages and inquiries from website visitors</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-gray-200 hover:bg-gray-50 rounded-lg">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {filteredContacts.length === 0 ? (
                  <div className="text-center py-16">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {userContacts.length === 0 ? 'No Messages Yet' : 'No Matching Messages'}
                    </h3>
                    <p className="text-gray-500">
                      {userContacts.length === 0 
                        ? 'Contact form submissions will appear here' 
                        : 'Try adjusting your search criteria'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredContacts.map((contact) => (
                      <Card key={contact.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                                <Badge className={`${getStatusBadge(contact.status)} border text-xs`}>
                                  {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-sm font-medium text-gray-700 mb-2">{contact.subject}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                <div className="flex items-center space-x-1">
                                  <Mail className="w-4 h-4" />
                                  <span>{contact.email}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Phone className="w-4 h-4" />
                                  <span>{contact.phone}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{contact.createdAt}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-700 bg-gray-50 rounded-lg p-3 text-sm">
                            {contact.message}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <NotificationManagement />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm border-0 rounded-xl">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-xl">
                  <CardTitle className="text-lg font-semibold text-gray-900">Appointment Trends</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {userAppointments.length > 0 ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {userAppointments.length}
                        </div>
                        <p className="text-gray-600">Total Appointments</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-xl font-bold text-green-700">
                            {userAppointments.filter(apt => apt.status === 'confirmed').length}
                          </div>
                          <p className="text-sm text-green-600">Confirmed</p>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <div className="text-xl font-bold text-yellow-700">
                            {userAppointments.filter(apt => apt.status === 'pending').length}
                          </div>
                          <p className="text-sm text-yellow-600">Pending</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Analytics will be generated from appointment data</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border-0 rounded-xl">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
                  <CardTitle className="text-lg font-semibold text-gray-900">Department Utilization</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {userAppointments.length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(
                        userAppointments.reduce((acc, apt) => {
                          acc[apt.department] = (acc[apt.department] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      ).map(([department, count]) => (
                        <div key={department} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">{department}</span>
                          <Badge variant="secondary">{count} appointments</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Department statistics will show once appointments are made</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
