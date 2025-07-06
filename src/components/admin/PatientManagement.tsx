
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, User, Mail, Phone, MapPin, Eye } from 'lucide-react';
import { Patient } from '@/types/healthcare';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';

const PatientManagement = () => {
  const [patients, setPatients] = useLocalStorage<Patient[]>('patients', []);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [viewingPatient, setViewingPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const [patientForm, setPatientForm] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'male' as 'male' | 'female' | 'other',
    address: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    medicalHistory: '',
    allergies: [] as string[],
    currentMedications: [] as string[],
    insuranceInfo: {
      provider: '',
      policyNumber: ''
    }
  });

  const resetForm = () => {
    setPatientForm({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: 'male',
      address: '',
      emergencyContact: {
        name: '',
        phone: '',
        relationship: ''
      },
      medicalHistory: '',
      allergies: [],
      currentMedications: [],
      insuranceInfo: {
        provider: '',
        policyNumber: ''
      }
    });
  };

  const handleSavePatient = () => {
    if (!patientForm.name || !patientForm.email || !patientForm.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const patientData: Patient = {
      id: editingPatient?.id || `patient-${Date.now()}`,
      name: patientForm.name,
      email: patientForm.email,
      phone: patientForm.phone,
      dateOfBirth: patientForm.dateOfBirth,
      gender: patientForm.gender,
      address: patientForm.address,
      emergencyContact: patientForm.emergencyContact,
      medicalHistory: patientForm.medicalHistory,
      allergies: patientForm.allergies,
      currentMedications: patientForm.currentMedications,
      insuranceInfo: patientForm.insuranceInfo.provider ? patientForm.insuranceInfo : undefined,
      registrationDate: editingPatient?.registrationDate || new Date().toISOString(),
      lastVisit: editingPatient?.lastVisit,
      status: 'active'
    };

    if (editingPatient) {
      const updatedPatients = patients.map(patient => 
        patient.id === editingPatient.id ? patientData : patient
      );
      setPatients(updatedPatients);
      toast({
        title: "Success",
        description: "Patient updated successfully",
      });
    } else {
      setPatients([...patients, patientData]);
      toast({
        title: "Success",
        description: "Patient added successfully",
      });
    }

    resetForm();
    setIsAddDialogOpen(false);
    setEditingPatient(null);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setPatientForm({
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      address: patient.address,
      emergencyContact: patient.emergencyContact,
      medicalHistory: patient.medicalHistory,
      allergies: patient.allergies,
      currentMedications: patient.currentMedications,
      insuranceInfo: patient.insuranceInfo || { provider: '', policyNumber: '' }
    });
    setIsAddDialogOpen(true);
  };

  const handleDeletePatient = (patientId: string) => {
    const updatedPatients = patients.filter(patient => patient.id !== patientId);
    setPatients(updatedPatients);
    toast({
      title: "Success",
      description: "Patient deleted successfully",
    });
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="bg-card shadow-sm border-0 rounded-xl">
        <CardHeader className="border-b border-border bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-semibold text-foreground">Patient Management</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Add, edit, and manage patient profiles and records</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600" onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Patient
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingPatient ? 'Edit Patient' : 'Add New Patient'}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={patientForm.name}
                      onChange={(e) => setPatientForm({...patientForm, name: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={patientForm.email}
                      onChange={(e) => setPatientForm({...patientForm, email: e.target.value})}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={patientForm.phone}
                      onChange={(e) => setPatientForm({...patientForm, phone: e.target.value})}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={patientForm.dateOfBirth}
                      onChange={(e) => setPatientForm({...patientForm, dateOfBirth: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={patientForm.gender} onValueChange={(value: 'male' | 'female' | 'other') => setPatientForm({...patientForm, gender: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={patientForm.address}
                      onChange={(e) => setPatientForm({...patientForm, address: e.target.value})}
                      placeholder="Complete address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">Emergency Contact Name</Label>
                    <Input
                      id="emergencyName"
                      value={patientForm.emergencyContact.name}
                      onChange={(e) => setPatientForm({
                        ...patientForm, 
                        emergencyContact: {...patientForm.emergencyContact, name: e.target.value}
                      })}
                      placeholder="Emergency contact name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                    <Input
                      id="emergencyPhone"
                      value={patientForm.emergencyContact.phone}
                      onChange={(e) => setPatientForm({
                        ...patientForm, 
                        emergencyContact: {...patientForm.emergencyContact, phone: e.target.value}
                      })}
                      placeholder="Emergency contact phone"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship</Label>
                    <Input
                      id="relationship"
                      value={patientForm.emergencyContact.relationship}
                      onChange={(e) => setPatientForm({
                        ...patientForm, 
                        emergencyContact: {...patientForm.emergencyContact, relationship: e.target.value}
                      })}
                      placeholder="Spouse, Parent, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                    <Input
                      id="insuranceProvider"
                      value={patientForm.insuranceInfo.provider}
                      onChange={(e) => setPatientForm({
                        ...patientForm, 
                        insuranceInfo: {...patientForm.insuranceInfo, provider: e.target.value}
                      })}
                      placeholder="Insurance company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="policyNumber">Policy Number</Label>
                    <Input
                      id="policyNumber"
                      value={patientForm.insuranceInfo.policyNumber}
                      onChange={(e) => setPatientForm({
                        ...patientForm, 
                        insuranceInfo: {...patientForm.insuranceInfo, policyNumber: e.target.value}
                      })}
                      placeholder="Policy number"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="medicalHistory">Medical History</Label>
                    <Textarea
                      id="medicalHistory"
                      value={patientForm.medicalHistory}
                      onChange={(e) => setPatientForm({...patientForm, medicalHistory: e.target.value})}
                      placeholder="Previous medical conditions, surgeries, etc."
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={() => {
                    setIsAddDialogOpen(false);
                    resetForm();
                    setEditingPatient(null);
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={handleSavePatient} className="bg-gradient-to-r from-emerald-500 to-emerald-600">
                    {editingPatient ? 'Update Patient' : 'Add Patient'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <Input
              placeholder="Search patients by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          {filteredPatients.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {patients.length === 0 ? 'No Patients Added Yet' : 'No Matching Patients'}
              </h3>
              <p className="text-muted-foreground">
                {patients.length === 0 
                  ? 'Start by adding your first patient to the system' 
                  : 'Try adjusting your search criteria'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Patient Details</TableHead>
                    <TableHead className="font-semibold">Contact</TableHead>
                    <TableHead className="font-semibold">Emergency Contact</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">DOB: {patient.dateOfBirth}</p>
                          <p className="text-sm text-muted-foreground capitalize">{patient.gender}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{patient.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{patient.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{patient.emergencyContact.name}</p>
                          <p className="text-sm text-muted-foreground">{patient.emergencyContact.phone}</p>
                          <p className="text-sm text-muted-foreground">{patient.emergencyContact.relationship}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={patient.status === 'active' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}>
                          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => setViewingPatient(patient)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditPatient(patient)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeletePatient(patient.id)} className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Patient Details Dialog */}
      <Dialog open={!!viewingPatient} onOpenChange={() => setViewingPatient(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
          </DialogHeader>
          {viewingPatient && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Name</Label>
                  <p>{viewingPatient.name}</p>
                </div>
                <div>
                  <Label className="font-semibold">Email</Label>
                  <p>{viewingPatient.email}</p>
                </div>
                <div>
                  <Label className="font-semibold">Phone</Label>
                  <p>{viewingPatient.phone}</p>
                </div>
                <div>
                  <Label className="font-semibold">Date of Birth</Label>
                  <p>{viewingPatient.dateOfBirth}</p>
                </div>
              </div>
              <div>
                <Label className="font-semibold">Address</Label>
                <p>{viewingPatient.address}</p>
              </div>
              <div>
                <Label className="font-semibold">Medical History</Label>
                <p className="bg-muted p-3 rounded">{viewingPatient.medicalHistory || 'No medical history recorded'}</p>
              </div>
              {viewingPatient.insuranceInfo && (
                <div>
                  <Label className="font-semibold">Insurance</Label>
                  <p>{viewingPatient.insuranceInfo.provider} - {viewingPatient.insuranceInfo.policyNumber}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientManagement;
