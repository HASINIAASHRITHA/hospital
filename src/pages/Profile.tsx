
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Download, Clock, User, Phone, Mail, MapPin, CreditCard, Edit, Save } from 'lucide-react';
import { Appointment, HealthRecord, PatientProfile } from '@/types/healthcare';
import { getFromLocalStorage, useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ phone: '', otp: '' });
  const [showOTP, setShowOTP] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [profile, setProfile] = useLocalStorage<PatientProfile>('currentPatientProfile', {
    id: '',
    name: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    medicalHistory: '',
    allergies: [],
    currentMedications: [],
    gender: 'male'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const { toast } = useToast();

  useEffect(() => {
    if (isLoggedIn) {
      // Load user-specific data
      const userAppointments = getFromLocalStorage<Appointment[]>('appointments', [])
        .filter(apt => apt.patientPhone === profile.phone);
      const userRecords = getFromLocalStorage<HealthRecord[]>('healthRecords', [])
        .filter(record => record.patientId === profile.id);
      
      setAppointments(userAppointments);
      setHealthRecords(userRecords);
    }
  }, [isLoggedIn, profile]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showOTP) {
      setShowOTP(true);
      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${loginData.phone}`,
      });
    } else {
      // Simulate OTP verification
      setIsLoggedIn(true);
      setProfile({
        ...profile,
        phone: loginData.phone,
        name: profile.name || 'Patient User'
      });
      toast({
        title: "Login Successful",
        description: "Welcome to your patient portal",
      });
    }
  };

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditingProfile(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'completed':
        return 'bg-info text-info-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-medical-blue/5">
        <Header />
        
        <section className="pt-24 pb-12 bg-gradient-to-r from-primary to-medical-blue text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Patient Profile
              </h1>
              <p className="text-xl text-primary-foreground/80 leading-relaxed">
                Access your medical records, appointments, and manage your healthcare profile
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-primary to-medical-blue text-primary-foreground">
                  <CardTitle className="text-2xl text-center">
                    Patient Login
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={loginData.phone}
                        onChange={(e) => setLoginData({...loginData, phone: e.target.value})}
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>
                    
                    {showOTP && (
                      <div>
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input
                          id="otp"
                          value={loginData.otp}
                          onChange={(e) => setLoginData({...loginData, otp: e.target.value})}
                          placeholder="Enter 6-digit OTP"
                          maxLength={6}
                          required
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          OTP sent to {loginData.phone}
                        </p>
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-medical-blue"
                    >
                      {showOTP ? 'Verify OTP' : 'Send OTP'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-medical-blue/5">
      <Header />
      
      <section className="pt-24 pb-8 bg-gradient-to-r from-primary to-medical-blue text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center max-w-6xl mx-auto">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome, {profile.name || 'Patient'}
              </h1>
              <p className="text-primary-foreground/80">Patient ID: {profile.id || 'Not Set'}</p>
            </div>
            <Button 
              variant="outline" 
              className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="appointments" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-card shadow-lg">
                <TabsTrigger value="appointments" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Appointments
                </TabsTrigger>
                <TabsTrigger value="reports" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Health Records
                </TabsTrigger>
                <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  My Profile
                </TabsTrigger>
                <TabsTrigger value="billing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Billing
                </TabsTrigger>
              </TabsList>

              <TabsContent value="appointments" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">My Appointments</h2>
                  <Button className="bg-gradient-to-r from-primary to-medical-blue">
                    Book New Appointment
                  </Button>
                </div>
                
                {appointments.length === 0 ? (
                  <Card className="shadow-lg">
                    <CardContent className="p-12 text-center">
                      <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No Appointments Found</h3>
                      <p className="text-muted-foreground">Your appointments will appear here once booked.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {appointments.map((appointment) => (
                      <Card key={appointment.id} className="shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                <span className="font-semibold">{appointment.date} at {appointment.time}</span>
                                <Badge className={getStatusBadge(appointment.status)}>
                                  {appointment.status}
                                </Badge>
                              </div>
                              <div className="text-lg font-semibold">{appointment.doctorName}</div>
                              <div className="text-muted-foreground">{appointment.department}</div>
                              {appointment.notes && (
                                <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                                  {appointment.notes}
                                </div>
                              )}
                            </div>
                            <div className="space-x-2">
                              <Button size="sm" variant="outline">Reschedule</Button>
                              <Button size="sm" variant="outline" className="text-destructive">Cancel</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <h2 className="text-2xl font-bold">Health Records</h2>
                
                {healthRecords.length === 0 ? (
                  <Card className="shadow-lg">
                    <CardContent className="p-12 text-center">
                      <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No Health Records Found</h3>
                      <p className="text-muted-foreground">Your medical reports and records will appear here.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {healthRecords.map((record) => (
                      <Card key={record.id} className="shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <FileText className="w-5 h-5 text-primary" />
                                <span className="font-semibold text-lg">{record.title}</span>
                                <Badge variant="outline">{record.type}</Badge>
                              </div>
                              <div className="text-muted-foreground">Date: {record.date}</div>
                              <div className="text-muted-foreground">Doctor: {record.doctorName}</div>
                            </div>
                            <Button size="sm" className="bg-gradient-to-r from-primary to-medical-blue">
                              <Download className="w-4 h-4 mr-2" />
                              View/Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Profile Information</h2>
                  <Button 
                    onClick={() => {
                      if (isEditingProfile) {
                        handleSaveProfile();
                      } else {
                        setEditedProfile(profile);
                        setIsEditingProfile(true);
                      }
                    }}
                    className="bg-gradient-to-r from-primary to-medical-blue"
                  >
                    {isEditingProfile ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
                
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          {isEditingProfile ? (
                            <Input
                              id="name"
                              value={editedProfile.name}
                              onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                            />
                          ) : (
                            <div className="flex items-center space-x-3 mt-1">
                              <User className="w-5 h-5 text-primary" />
                              <span>{profile.name || 'Not set'}</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          {isEditingProfile ? (
                            <Input
                              id="phone"
                              value={editedProfile.phone}
                              onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                            />
                          ) : (
                            <div className="flex items-center space-x-3 mt-1">
                              <Phone className="w-5 h-5 text-success" />
                              <span>{profile.phone || 'Not set'}</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email</Label>
                          {isEditingProfile ? (
                            <Input
                              id="email"
                              type="email"
                              value={editedProfile.email}
                              onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                            />
                          ) : (
                            <div className="flex items-center space-x-3 mt-1">
                              <Mail className="w-5 h-5 text-info" />
                              <span>{profile.email || 'Not set'}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="dob">Date of Birth</Label>
                          {isEditingProfile ? (
                            <Input
                              id="dob"
                              type="date"
                              value={editedProfile.dateOfBirth}
                              onChange={(e) => setEditedProfile({...editedProfile, dateOfBirth: e.target.value})}
                            />
                          ) : (
                            <div className="flex items-center space-x-3 mt-1">
                              <Calendar className="w-5 h-5 text-warning" />
                              <span>{profile.dateOfBirth || 'Not set'}</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="address">Address</Label>
                          {isEditingProfile ? (
                            <Input
                              id="address"
                              value={editedProfile.address}
                              onChange={(e) => setEditedProfile({...editedProfile, address: e.target.value})}
                            />
                          ) : (
                            <div className="flex items-center space-x-3 mt-1">
                              <MapPin className="w-5 h-5 text-destructive" />
                              <span>{profile.address || 'Not set'}</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="insurance">Insurance</Label>
                          {isEditingProfile ? (
                            <Input
                              id="insurance"
                              value={editedProfile.insuranceInfo?.provider || ''}
                              onChange={(e) => setEditedProfile({...editedProfile, insuranceInfo: { provider: e.target.value, policyNumber: editedProfile.insuranceInfo?.policyNumber || '' }})}
                            />
                          ) : (
                            <div className="flex items-center space-x-3 mt-1">
                              <CreditCard className="w-5 h-5 text-medical-blue" />
                              <span>{profile.insuranceInfo?.provider || 'Not set'}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-4">
                <h2 className="text-2xl font-bold">Billing History</h2>
                
                <Card className="shadow-lg">
                  <CardContent className="p-12 text-center">
                    <CreditCard className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No billing history found</h3>
                    <p className="text-muted-foreground">Your billing information and payment history will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;
