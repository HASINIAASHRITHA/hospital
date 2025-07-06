import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, Download, Eye, Trash2 } from 'lucide-react';
import { HealthRecord } from '@/types/healthcare';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from '@/hooks/use-toast';

interface HealthRecordUploadProps {
  patientId?: string;
  patientName?: string;
  onRecordUploaded?: (record: HealthRecord) => void;
}

const HealthRecordUpload = ({ patientId, patientName, onRecordUploaded }: HealthRecordUploadProps) => {
  const [records, setRecords] = useLocalStorage<HealthRecord[]>('healthRecords', []);
  const [uploadForm, setUploadForm] = useState({
    type: '',
    title: '',
    description: '',
    doctorName: '',
    department: '',
    date: new Date().toISOString().split('T')[0]
  });

  const recordTypes = [
    { value: 'lab_result', label: 'Lab Result' },
    { value: 'prescription', label: 'Prescription' },
    { value: 'medical_report', label: 'Medical Report' },
    { value: 'imaging', label: 'Imaging (X-Ray, MRI, CT)' },
    { value: 'vaccination', label: 'Vaccination Record' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // In a real app, you would upload to a file storage service
    // For now, we'll simulate file storage with a URL
    const fileUrl = URL.createObjectURL(file);
    
    const newRecord: HealthRecord = {
      id: Date.now().toString(),
      patientId: patientId || 'current-user',
      patientName: patientName || 'Current User',
      type: uploadForm.type as HealthRecord['type'],
      title: uploadForm.title,
      description: uploadForm.description,
      date: uploadForm.date,
      doctorName: uploadForm.doctorName,
      department: uploadForm.department,
      fileUrl: fileUrl,
      createdAt: new Date().toISOString()
    };

    setRecords([...records, newRecord]);
    onRecordUploaded?.(newRecord);
    
    // Reset form
    setUploadForm({
      type: '',
      title: '',
      description: '',
      doctorName: '',
      department: '',
      date: new Date().toISOString().split('T')[0]
    });

    toast({
      title: "Record Uploaded",
      description: "Health record has been successfully uploaded.",
    });
  };

  const deleteRecord = (recordId: string) => {
    setRecords(records.filter(r => r.id !== recordId));
    toast({
      title: "Record Deleted",
      description: "Health record has been deleted.",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lab_result':
        return '🧪';
      case 'prescription':
        return '💊';
      case 'medical_report':
        return '📋';
      case 'imaging':
        return '🔬';
      case 'vaccination':
        return '💉';
      default:
        return '📄';
    }
  };

  const filteredRecords = patientId 
    ? records.filter(r => r.patientId === patientId)
    : records;

  return (
    <div className="space-y-6">
      <Card className="bg-card shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardTitle className="flex items-center gap-2 text-primary">
            <Upload className="w-5 h-5" />
            Upload Health Record
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="record-type">Record Type</Label>
              <Select 
                value={uploadForm.type} 
                onValueChange={(value) => setUploadForm({...uploadForm, type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select record type" />
                </SelectTrigger>
                <SelectContent>
                  {recordTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="record-date">Date</Label>
              <Input
                id="record-date"
                type="date"
                value={uploadForm.date}
                onChange={(e) => setUploadForm({...uploadForm, date: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="record-title">Title</Label>
            <Input
              id="record-title"
              placeholder="e.g., Blood Test Results, X-Ray Chest"
              value={uploadForm.title}
              onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="doctor-name">Doctor Name</Label>
              <Input
                id="doctor-name"
                placeholder="Dr. Smith"
                value={uploadForm.doctorName}
                onChange={(e) => setUploadForm({...uploadForm, doctorName: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                placeholder="Cardiology, Radiology, etc."
                value={uploadForm.department}
                onChange={(e) => setUploadForm({...uploadForm, department: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Additional notes or description"
              value={uploadForm.description}
              onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload File</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileUpload}
              disabled={!uploadForm.type || !uploadForm.title}
            />
            <p className="text-sm text-muted-foreground">
              Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <FileText className="w-5 h-5" />
            Health Records ({filteredRecords.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {filteredRecords.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Records Found</h3>
              <p className="text-muted-foreground">Upload your first health record to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <Card key={record.id} className="border border-border/50 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{getTypeIcon(record.type)}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{record.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{record.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>📅 {new Date(record.date).toLocaleDateString()}</span>
                            <span>👨‍⚕️ {record.doctorName}</span>
                            <span>🏥 {record.department}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {record.fileUrl && (
                          <>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteRecord(record.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthRecordUpload;