import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Bell, Mail, MessageSquare, Send } from 'lucide-react';
import { NotificationTemplate } from '@/types/healthcare';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';

const NotificationManagement = () => {
  const [templates, setTemplates] = useLocalStorage<NotificationTemplate[]>('notificationTemplates', []);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<NotificationTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const [templateForm, setTemplateForm] = useState({
    name: '',
    type: 'appointment_reminder' as NotificationTemplate['type'],
    subject: '',
    body: '',
    variables: [] as string[],
    isActive: true,
    channel: 'email' as NotificationTemplate['channel'],
    triggerBefore: 24
  });

  const resetForm = () => {
    setTemplateForm({
      name: '',
      type: 'appointment_reminder',
      subject: '',
      body: '',
      variables: [],
      isActive: true,
      channel: 'email',
      triggerBefore: 24
    });
  };

  const handleSaveTemplate = () => {
    if (!templateForm.name || !templateForm.subject || !templateForm.body) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const templateData: NotificationTemplate = {
      id: editingTemplate?.id || `template-${Date.now()}`,
      name: templateForm.name,
      type: templateForm.type,
      subject: templateForm.subject,
      body: templateForm.body,
      variables: templateForm.variables,
      isActive: templateForm.isActive,
      channel: templateForm.channel,
      triggerBefore: templateForm.triggerBefore,
      createdAt: editingTemplate?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingTemplate) {
      const updatedTemplates = templates.map(template => 
        template.id === editingTemplate.id ? templateData : template
      );
      setTemplates(updatedTemplates);
      toast({
        title: "Success",
        description: "Template updated successfully",
      });
    } else {
      setTemplates([...templates, templateData]);
      toast({
        title: "Success",
        description: "Template added successfully",
      });
    }

    resetForm();
    setIsAddDialogOpen(false);
    setEditingTemplate(null);
  };

  const handleEditTemplate = (template: NotificationTemplate) => {
    setEditingTemplate(template);
    setTemplateForm({
      name: template.name,
      type: template.type,
      subject: template.subject,
      body: template.body,
      variables: template.variables,
      isActive: template.isActive,
      channel: template.channel,
      triggerBefore: template.triggerBefore || 24
    });
    setIsAddDialogOpen(true);
  };

  const handleDeleteTemplate = (templateId: string) => {
    const updatedTemplates = templates.filter(template => template.id !== templateId);
    setTemplates(updatedTemplates);
    toast({
      title: "Success",
      description: "Template deleted successfully",
    });
  };

  const toggleTemplateStatus = (templateId: string) => {
    const updatedTemplates = templates.map(template => 
      template.id === templateId 
        ? { ...template, isActive: !template.isActive, updatedAt: new Date().toISOString() }
        : template
    );
    setTemplates(updatedTemplates);
    toast({
      title: "Success",
      description: "Template status updated",
    });
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const defaultTemplates = [
    {
      type: 'appointment_reminder',
      name: 'Appointment Reminder',
      subject: 'Reminder: Your appointment at {hospitalName}',
      body: 'Dear {patientName}, this is a reminder for your appointment with {doctorName} on {appointmentDate} at {appointmentTime}. Please arrive 15 minutes early. Contact us at {hospitalPhone} if you need to reschedule.',
      variables: ['patientName', 'doctorName', 'appointmentDate', 'appointmentTime', 'hospitalName', 'hospitalPhone']
    },
    {
      type: 'appointment_confirmation',
      name: 'Appointment Confirmation',
      subject: 'Appointment Confirmed - {hospitalName}',
      body: 'Dear {patientName}, your appointment with {doctorName} has been confirmed for {appointmentDate} at {appointmentTime}. Department: {department}. Please bring your insurance card and arrive 15 minutes early.',
      variables: ['patientName', 'doctorName', 'appointmentDate', 'appointmentTime', 'department', 'hospitalName']
    }
  ];

  const addDefaultTemplate = (defaultTemplate: any) => {
    const templateData: NotificationTemplate = {
      id: `template-${Date.now()}`,
      name: defaultTemplate.name,
      type: defaultTemplate.type,
      subject: defaultTemplate.subject,
      body: defaultTemplate.body,
      variables: defaultTemplate.variables,
      isActive: true,
      channel: 'email',
      triggerBefore: 24,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTemplates([...templates, templateData]);
    toast({
      title: "Success",
      description: "Default template added successfully",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card shadow-sm border-0 rounded-xl">
        <CardHeader className="border-b border-border bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-semibold text-foreground">Notification Templates</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Manage templates for appointment reminders and alerts</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-500 to-purple-600" onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Template
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingTemplate ? 'Edit Template' : 'Add New Template'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Template Name *</Label>
                      <Input
                        id="name"
                        value={templateForm.name}
                        onChange={(e) => setTemplateForm({...templateForm, name: e.target.value})}
                        placeholder="Appointment Reminder"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Template Type *</Label>
                      <Select value={templateForm.type} onValueChange={(value: NotificationTemplate['type']) => setTemplateForm({...templateForm, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="appointment_reminder">Appointment Reminder</SelectItem>
                          <SelectItem value="appointment_confirmation">Appointment Confirmation</SelectItem>
                          <SelectItem value="prescription_ready">Prescription Ready</SelectItem>
                          <SelectItem value="follow_up">Follow Up</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="channel">Channel</Label>
                      <Select value={templateForm.channel} onValueChange={(value: NotificationTemplate['channel']) => setTemplateForm({...templateForm, channel: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email Only</SelectItem>
                          <SelectItem value="sms">SMS Only</SelectItem>
                          <SelectItem value="both">Email & SMS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="triggerBefore">Trigger Before (hours)</Label>
                      <Input
                        id="triggerBefore"
                        type="number"
                        value={templateForm.triggerBefore}
                        onChange={(e) => setTemplateForm({...templateForm, triggerBefore: parseInt(e.target.value) || 24})}
                        placeholder="24"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={templateForm.subject}
                      onChange={(e) => setTemplateForm({...templateForm, subject: e.target.value})}
                      placeholder="Your appointment reminder"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="body">Message Body *</Label>
                    <Textarea
                      id="body"
                      value={templateForm.body}
                      onChange={(e) => setTemplateForm({...templateForm, body: e.target.value})}
                      placeholder="Dear {patientName}, this is a reminder..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Available Variables</Label>
                    <div className="flex flex-wrap gap-2">
                      {['{patientName}', '{doctorName}', '{appointmentDate}', '{appointmentTime}', '{department}', '{hospitalName}', '{hospitalPhone}'].map(variable => (
                        <Badge key={variable} variant="outline" className="text-xs cursor-pointer" onClick={() => {
                          const textarea = document.getElementById('body') as HTMLTextAreaElement;
                          if (textarea) {
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const newValue = templateForm.body.substring(0, start) + variable + templateForm.body.substring(end);
                            setTemplateForm({...templateForm, body: newValue});
                          }
                        }}>
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={templateForm.isActive}
                      onCheckedChange={(checked) => setTemplateForm({...templateForm, isActive: checked})}
                    />
                    <Label htmlFor="isActive">Active Template</Label>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={() => {
                    setIsAddDialogOpen(false);
                    resetForm();
                    setEditingTemplate(null);
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveTemplate} className="bg-gradient-to-r from-purple-500 to-purple-600">
                    {editingTemplate ? 'Update Template' : 'Add Template'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <Input
              placeholder="Search templates by name, type, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            {templates.length === 0 && (
              <div className="flex space-x-2">
                {defaultTemplates.map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => addDefaultTemplate(template)}
                  >
                    Add {template.name}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {templates.length === 0 ? 'No Templates Created Yet' : 'No Matching Templates'}
              </h3>
              <p className="text-muted-foreground">
                {templates.length === 0 
                  ? 'Start by adding your first notification template' 
                  : 'Try adjusting your search criteria'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Template Details</TableHead>
                    <TableHead className="font-semibold">Type & Channel</TableHead>
                    <TableHead className="font-semibold">Content</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTemplates.map((template) => (
                    <TableRow key={template.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{template.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Trigger: {template.triggerBefore}h before
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs">
                            {template.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            {template.channel === 'email' && <Mail className="w-4 h-4 text-muted-foreground" />}
                            {template.channel === 'sms' && <MessageSquare className="w-4 h-4 text-muted-foreground" />}
                            {template.channel === 'both' && (
                              <>
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                              </>
                            )}
                            <span className="text-xs text-muted-foreground capitalize">{template.channel}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{template.subject}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {template.body.substring(0, 100)}...
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={template.isActive}
                            onCheckedChange={() => toggleTemplateStatus(template.id)}
                          />
                          <Badge className={template.isActive ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}>
                            {template.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteTemplate(template.id)} className="text-destructive hover:text-destructive">
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
    </div>
  );
};

export default NotificationManagement;
