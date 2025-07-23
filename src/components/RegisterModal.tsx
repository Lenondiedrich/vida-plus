import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Stethoscope, User, AlertCircle, CheckCircle } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PatientFormData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  allergies: string;
}

interface ProfessionalFormData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  crm: string;
  specialty: string;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [activeTab, setActiveTab] = useState('patient');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const [patientForm, setPatientForm] = useState<PatientFormData>({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    allergies: ''
  });

  const [professionalForm, setProfessionalForm] = useState<ProfessionalFormData>({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    crm: '',
    specialty: ''
  });

  const handlePatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validação básica
    if (!patientForm.name || !patientForm.email || !patientForm.phone || !patientForm.cpf) {
      setError('Por favor, preencha todos os campos obrigatórios');
      setIsLoading(false);
      return;
    }

    // Simular registro
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        // Reset form
        setPatientForm({
          name: '',
          email: '',
          phone: '',
          cpf: '',
          dateOfBirth: '',
          address: '',
          emergencyContact: '',
          allergies: ''
        });
      }, 2000);
    }, 1500);
  };

  const handleProfessionalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validação básica
    if (!professionalForm.name || !professionalForm.email || !professionalForm.crm || !professionalForm.specialty) {
      setError('Por favor, preencha todos os campos obrigatórios');
      setIsLoading(false);
      return;
    }

    // Simular registro
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        // Reset form
        setProfessionalForm({
          name: '',
          email: '',
          phone: '',
          cpf: '',
          crm: '',
          specialty: ''
        });
      }, 2000);
    }, 1500);
  };

  const specialties = [
    'Cardiologia',
    'Dermatologia',
    'Endocrinologia',
    'Gastroenterologia',
    'Ginecologia',
    'Neurologia',
    'Oftalmologia',
    'Ortopedia',
    'Otorrinolaringologia',
    'Pediatria',
    'Psiquiatria',
    'Urologia',
    'Clínica Geral'
  ];

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Cadastro Realizado!</h3>
            <p className="text-muted-foreground text-center">
              {activeTab === 'patient' 
                ? 'O paciente foi cadastrado com sucesso.' 
                : 'O profissional foi cadastrado com sucesso.'
              }
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>Cadastrar Novo Usuário</span>
          </DialogTitle>
          <DialogDescription>
            Escolha o tipo de usuário e preencha as informações necessárias.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="patient" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Paciente</span>
            </TabsTrigger>
            <TabsTrigger value="professional" className="flex items-center space-x-2">
              <Stethoscope className="h-4 w-4" />
              <span>Profissional</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patient" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cadastro de Paciente</CardTitle>
                <CardDescription>
                  Preencha os dados pessoais do paciente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePatientSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-name">Nome Completo *</Label>
                      <Input
                        id="patient-name"
                        placeholder="Nome completo"
                        value={patientForm.name}
                        onChange={(e) => setPatientForm({...patientForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-email">Email *</Label>
                      <Input
                        id="patient-email"
                        type="email"
                        placeholder="email@exemplo.com"
                        value={patientForm.email}
                        onChange={(e) => setPatientForm({...patientForm, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-phone">Telefone *</Label>
                      <Input
                        id="patient-phone"
                        placeholder="(11) 99999-9999"
                        value={patientForm.phone}
                        onChange={(e) => setPatientForm({...patientForm, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-cpf">CPF *</Label>
                      <Input
                        id="patient-cpf"
                        placeholder="000.000.000-00"
                        value={patientForm.cpf}
                        onChange={(e) => setPatientForm({...patientForm, cpf: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-birth">Data de Nascimento</Label>
                      <Input
                        id="patient-birth"
                        type="date"
                        value={patientForm.dateOfBirth}
                        onChange={(e) => setPatientForm({...patientForm, dateOfBirth: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-emergency">Contato de Emergência</Label>
                      <Input
                        id="patient-emergency"
                        placeholder="(11) 99999-9999"
                        value={patientForm.emergencyContact}
                        onChange={(e) => setPatientForm({...patientForm, emergencyContact: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patient-address">Endereço</Label>
                    <Input
                      id="patient-address"
                      placeholder="Rua, número, bairro, cidade, estado"
                      value={patientForm.address}
                      onChange={(e) => setPatientForm({...patientForm, address: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patient-allergies">Alergias</Label>
                    <Input
                      id="patient-allergies"
                      placeholder="Liste as alergias separadas por vírgula"
                      value={patientForm.allergies}
                      onChange={(e) => setPatientForm({...patientForm, allergies: e.target.value})}
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Cadastrando...' : 'Cadastrar Paciente'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professional" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cadastro de Profissional</CardTitle>
                <CardDescription>
                  Preencha os dados do profissional de saúde
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfessionalSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="prof-name">Nome Completo *</Label>
                      <Input
                        id="prof-name"
                        placeholder="Dr(a). Nome completo"
                        value={professionalForm.name}
                        onChange={(e) => setProfessionalForm({...professionalForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prof-email">Email *</Label>
                      <Input
                        id="prof-email"
                        type="email"
                        placeholder="email@exemplo.com"
                        value={professionalForm.email}
                        onChange={(e) => setProfessionalForm({...professionalForm, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="prof-phone">Telefone</Label>
                      <Input
                        id="prof-phone"
                        placeholder="(11) 99999-9999"
                        value={professionalForm.phone}
                        onChange={(e) => setProfessionalForm({...professionalForm, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prof-cpf">CPF</Label>
                      <Input
                        id="prof-cpf"
                        placeholder="000.000.000-00"
                        value={professionalForm.cpf}
                        onChange={(e) => setProfessionalForm({...professionalForm, cpf: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="prof-crm">CRM *</Label>
                      <Input
                        id="prof-crm"
                        placeholder="CRM-SP 123456"
                        value={professionalForm.crm}
                        onChange={(e) => setProfessionalForm({...professionalForm, crm: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prof-specialty">Especialidade *</Label>
                      <Select 
                        value={professionalForm.specialty} 
                        onValueChange={(value: string) => setProfessionalForm({...professionalForm, specialty: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma especialidade" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialties.map((specialty) => (
                            <SelectItem key={specialty} value={specialty}>
                              {specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Cadastrando...' : 'Cadastrar Profissional'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 