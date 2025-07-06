
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
import { Plus, Edit, Trash2, User, Mail, Phone, MapPin, Stethoscope } from 'lucide-react';
import { Doctor, Department } from '@/types/healthcare';
import { useLocalStorage, getFromLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useLocalStorage<Doctor[]>('doctors', []);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Default medical departments
  const defaultDepartments = [
    'Cardiology',
    'Neurology', 
    'Pediatrics',
    'Orthopedics',
    'Dermatology',
    'Ophthalmology',
    'Oncology',
    'Gastroenterology',
    'Pulmonology',
    'Nephrology',
    'Endocrinology',
    'Psychiatry',
    'Emergency Medicine',
    'Radiology',
    'Anesthesiology',
    'Pathology',
    'Surgery',
    'Internal Medicine',
    'Obstetrics & Gynecology',
    'Urology'
  ];

  const [doctorForm, setDoctorForm] = useState({
    name: '',
    specialization: '',
    qualification: '',
    experience: 0,
    bio: '',
    email: '',
    phone: '',
    department: '',
    available: true,
    rating: 0,
    image: ''
  });

  useEffect(() => {
    const storedDepartments = getFromLocalStorage<Department[]>('departments', []);
    setDepartments(storedDepartments);
  }, []);

  // Get all available departments (stored + default)
  const getAllDepartments = () => {
    const storedDepartmentNames = departments.map(dept => dept.name);
    const allDepartments = [...storedDepartmentNames, ...defaultDepartments];
    return [...new Set(allDepartments)].sort();
  };

  const resetForm = () => {
    setDoctorForm({
      name: '',
      specialization: '',
      qualification: '',
      experience: 0,
      bio: '',
      email: '',
      phone: '',
      department: '',
      available: true,
      rating: 0,
      image: ''
    });
  };

  const handleSaveDoctor = () => {
    if (!doctorForm.name || !doctorForm.specialization) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const doctorData: Doctor = {
      id: editingDoctor?.id || `doctor-${Date.now()}`,
      name: doctorForm.name,
      specialization: doctorForm.specialization,
      qualification: doctorForm.qualification || '',
      experience: doctorForm.experience || 0,
      bio: doctorForm.bio || '',
      email: doctorForm.email || '',
      phone: doctorForm.phone || '',
      languages: [],
      consultationFee: 0,
      availability: {},
      achievements: [],
      status: 'active',
      department: doctorForm.department || '',
      available: doctorForm.available || true,
      rating: doctorForm.rating || 0,
      image: doctorForm.image || '',
      createdAt: editingDoctor?.createdAt || new Date().toISOString()
    };

    if (editingDoctor) {
      const updatedDoctors = doctors.map(doc => 
        doc.id === editingDoctor.id ? doctorData : doc
      );
      setDoctors(updatedDoctors);
      toast({
        title: "Success",
        description: "Doctor updated successfully",
      });
    } else {
      setDoctors([...doctors, doctorData]);
      toast({
        title: "Success",
        description: "Doctor added successfully",
      });
    }

    resetForm();
    setIsAddDialogOpen(false);
    setEditingDoctor(null);
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setDoctorForm({
      name: doctor.name,
      specialization: doctor.specialization,
      qualification: doctor.qualification,
      experience: doctor.experience,
      bio: doctor.bio,
      email: doctor.email,
      phone: doctor.phone,
      department: doctor.department || '',
      available: doctor.available || true,
      rating: doctor.rating || 0,
      image: doctor.image || ''
    });
    setIsAddDialogOpen(true);
  };

  const handleDeleteDoctor = (doctorId: string) => {
    const updatedDoctors = doctors.filter(doc => doc.id !== doctorId);
    setDoctors(updatedDoctors);
    toast({
      title: "Success",
      description: "Doctor deleted successfully",
    });
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doctor.department && doctor.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Card className="bg-card shadow-sm border-0 rounded-xl">
      <CardHeader className="border-b border-border bg-gradient-to-r from-medical-blue/5 to-primary/5 rounded-t-xl">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold text-foreground">Doctor Management</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Add, edit, and manage doctor profiles</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-medical-blue to-primary" onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Add Doctor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={doctorForm.name}
                    onChange={(e) => setDoctorForm({...doctorForm, name: e.target.value})}
                    placeholder="Dr. John Smith"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization *</Label>
                  <Input
                    id="specialization"
                    value={doctorForm.specialization}
                    onChange={(e) => setDoctorForm({...doctorForm, specialization: e.target.value})}
                    placeholder="Cardiologist"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input
                    id="qualification"
                    value={doctorForm.qualification}
                    onChange={(e) => setDoctorForm({...doctorForm, qualification: e.target.value})}
                    placeholder="MBBS, MD"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience (years)</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={doctorForm.experience}
                    onChange={(e) => setDoctorForm({...doctorForm, experience: parseInt(e.target.value) || 0})}
                    placeholder="10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={doctorForm.email}
                    onChange={(e) => setDoctorForm({...doctorForm, email: e.target.value})}
                    placeholder="doctor@hospital.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={doctorForm.phone}
                    onChange={(e) => setDoctorForm({...doctorForm, phone: e.target.value})}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={doctorForm.department} onValueChange={(value) => setDoctorForm({...doctorForm, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAllDepartments().map((deptName) => (
                        <SelectItem key={deptName} value={deptName}>
                          {deptName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (0-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={doctorForm.rating}
                    onChange={(e) => setDoctorForm({...doctorForm, rating: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="image">Profile Image URL</Label>
                  <Input
                    id="image"
                    value={doctorForm.image}
                    onChange={(e) => setDoctorForm({...doctorForm, image: e.target.value})}
                    placeholder="https://example.com/doctor-image.jpg"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Biography</Label>
                  <Textarea
                    id="bio"
                    value={doctorForm.bio}
                    onChange={(e) => setDoctorForm({...doctorForm, bio: e.target.value})}
                    placeholder="Brief description about the doctor..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => {
                  setIsAddDialogOpen(false);
                  resetForm();
                  setEditingDoctor(null);
                }}>
                  Cancel
                </Button>
                <Button onClick={handleSaveDoctor} className="bg-gradient-to-r from-medical-blue to-primary">
                  {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <Input
            placeholder="Search doctors by name, specialization, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {doctors.length === 0 ? 'No Doctors Added Yet' : 'No Matching Doctors'}
            </h3>
            <p className="text-muted-foreground">
              {doctors.length === 0 
                ? 'Start by adding your first doctor to the system' 
                : 'Try adjusting your search criteria'
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Doctor Details</TableHead>
                  <TableHead className="font-semibold">Specialization</TableHead>
                  <TableHead className="font-semibold">Contact</TableHead>
                  <TableHead className="font-semibold">Department</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoctors.map((doctor) => (
                  <TableRow key={doctor.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {doctor.image ? (
                          <img 
                            src={doctor.image} 
                            alt={doctor.name}
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=random&size=40`;
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-foreground">{doctor.name}</p>
                          <p className="text-sm text-muted-foreground">{doctor.qualification}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{doctor.specialization}</p>
                        <p className="text-sm text-muted-foreground">{doctor.experience} years</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {doctor.email && (
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{doctor.email}</span>
                          </div>
                        )}
                        {doctor.phone && (
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{doctor.phone}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{doctor.department || 'Not assigned'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={doctor.available ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}>
                        {doctor.available ? 'Available' : 'Unavailable'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditDoctor(doctor)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteDoctor(doctor.id)} className="text-destructive hover:text-destructive">
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
  );
};

export default DoctorManagement;
