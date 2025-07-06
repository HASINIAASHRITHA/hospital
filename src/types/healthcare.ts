
// Healthcare system types - no hardcoded data, all data comes from user input

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string;
  allergies: string[];
  currentMedications: string[];
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
  };
  registrationDate: string;
  lastVisit?: string;
  status: 'active' | 'inactive';
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  qualification: string;
  experience: number;
  email: string;
  phone: string;
  bio: string;
  image?: string;
  languages: string[];
  consultationFee: number;
  availability: {
    [key: string]: { // day of week
      start: string;
      end: string;
      isAvailable: boolean;
    };
  };
  achievements: string[];
  status: 'active' | 'inactive';
  department?: string;
  available?: boolean;
  rating?: number;
  createdAt?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  duration: number;
  type: 'consultation' | 'followup' | 'emergency' | 'checkup';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  symptoms?: string;
  notes?: string;
  prescription?: string;
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HealthRecord {
  id: string;
  patientId: string;
  patientName: string;
  type: 'lab_result' | 'prescription' | 'medical_report' | 'imaging' | 'vaccination';
  title: string;
  description: string;
  date: string;
  doctorName: string;
  department: string;
  fileUrl?: string;
  results?: {
    [key: string]: {
      value: string;
      unit?: string;
      normalRange?: string;
      status: 'normal' | 'abnormal' | 'critical';
    };
  };
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  services: string[];
  headOfDepartment?: string;
  contactNumber: string;
  location: string;
  openingHours: {
    [key: string]: {
      isOpen: boolean;
      start: string;
      end: string;
    };
  };
  emergencyAvailable: boolean;
  icon?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: 'general' | 'appointment' | 'complaint' | 'feedback';
  status: 'new' | 'read' | 'replied' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  response?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: 'appointment_reminder' | 'appointment_confirmation' | 'prescription_ready' | 'follow_up';
  subject: string;
  body: string;
  variables: string[]; // Available variables like {patientName}, {appointmentDate}
  isActive: boolean;
  channel: 'email' | 'sms' | 'both';
  triggerBefore?: number; // hours before appointment
  createdAt: string;
  updatedAt: string;
}

export interface HospitalInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  emergencyNumber: string;
  generalOpeningHours: {
    [key: string]: {
      isOpen: boolean;
      start: string;
      end: string;
    };
  };
  emergencyHours: string;
  facilities: string[];
  accreditations: string[];
}

export interface PatientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string;
  allergies: string[];
  currentMedications: string[];
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
  };
}
