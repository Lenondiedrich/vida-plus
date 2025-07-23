import AppointmentModal from '@/components/AppointmentModal';
import TelemedicineModal from '@/components/TelemedicineModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { appointments, medicalRecords } from '@/data/mock';
import { useAuth } from '@/hooks/useAuth';
import type { Patient } from '@/types';
import {
  Calendar,
  Clock,
  FileText,
  MapPin,
  Pill,
  Video
} from 'lucide-react';
import { useState } from 'react';

export default function PatientDashboard() {
  const { user } = useAuth();
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showTelemedicineModal, setShowTelemedicineModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<{
    id: string;
    patientName: string;
    professionalName: string;
    time: string;
    description: string;
  } | null>(null);
  
  const patient = user as Patient;
  const patientAppointments = appointments.filter(apt => apt.patientId === patient.id);
  const patientRecords = medicalRecords.filter(rec => rec.patientId === patient.id);

  const upcomingAppointments = patientAppointments.filter(apt => 
    apt.status === 'scheduled' && new Date(apt.date + 'T' + apt.time) > new Date()
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'text-white';
      case 'completed':
        return 'text-white';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'scheduled':
        return { backgroundColor: '#819A91' };
      case 'completed':
        return { backgroundColor: '#A7C1A8' };
      case 'in-progress':
        return { backgroundColor: '#D1D8BE', color: '#819A91' };
      default:
        return {};
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Agendada';
      case 'completed':
        return 'Concluída';
      case 'cancelled':
        return 'Cancelada';
      case 'in-progress':
        return 'Em andamento';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Bem-vindo, {patient.name}
        </h1>
        <p className="text-muted-foreground">
          Gerencie suas consultas, exames e acompanhe seu histórico médico
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4" style={{ borderLeftColor: '#819A91' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Próximas Consultas
            </CardTitle>
            <Calendar className="h-4 w-4" style={{ color: '#819A91' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#819A91' }}>{upcomingAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              agendadas este mês
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4" style={{ borderLeftColor: '#A7C1A8' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Histórico Médico
            </CardTitle>
            <FileText className="h-4 w-4" style={{ color: '#A7C1A8' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#A7C1A8' }}>{patientRecords.length}</div>
            <p className="text-xs text-muted-foreground">
              registros médicos
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: '#D1D8BE' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Teleconsultas
            </CardTitle>
            <Video className="h-4 w-4" style={{ color: '#819A91' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#819A91' }}>
              {patientAppointments.filter(apt => apt.type === 'teleconsultation').length}
            </div>
            <p className="text-xs text-muted-foreground">
              disponíveis
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: '#A7C1A8' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Prescrições Ativas
            </CardTitle>
            <Pill className="h-4 w-4" style={{ color: '#A7C1A8' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#A7C1A8' }}>
              {patientRecords.reduce((acc, rec) => acc + (rec.prescription?.length || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              medicamentos prescritos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Conteúdo Principal com Tabs */}
      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments">Consultas & Exames</TabsTrigger>
          <TabsTrigger value="history">Histórico Médico</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescrições</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Próximas Consultas</h3>
            <Button onClick={() => setShowAppointmentModal(true)}>
              <Calendar className="mr-2 h-4 w-4" />
              Agendar Consulta
            </Button>
          </div>

          <div className="grid gap-4">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{appointment.description}</h4>
                        <Badge 
                          className={getStatusColor(appointment.status)}
                          style={getStatusStyle(appointment.status)}
                        >
                          {getStatusLabel(appointment.status)}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(appointment.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </div>
                        {appointment.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{appointment.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {appointment.type === 'teleconsultation' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedAppointment({
                              id: appointment.id,
                              patientName: patient.name,
                              professionalName: 'Dr. Profissional',
                              time: appointment.time,
                              description: appointment.description
                            });
                            setShowTelemedicineModal(true);
                          }}
                        >
                          <Video className="mr-2 h-4 w-4" />
                          Entrar na Consulta
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            Ver Detalhes
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{appointment.description}</DialogTitle>
                            <DialogDescription>
                              Detalhes da consulta
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <strong>Data:</strong> {new Date(appointment.date).toLocaleDateString('pt-BR')}
                            </div>
                            <div>
                              <strong>Horário:</strong> {appointment.time}
                            </div>
                            <div>
                              <strong>Tipo:</strong> {appointment.type === 'teleconsultation' ? 'Teleconsulta' : 'Presencial'}
                            </div>
                            {appointment.location && (
                              <div>
                                <strong>Local:</strong> {appointment.location}
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {upcomingAppointments.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhuma consulta agendada</h3>
                  <p className="text-muted-foreground mb-4">
                    Você não tem consultas agendadas no momento.
                  </p>
                  <Button onClick={() => setShowAppointmentModal(true)}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Agendar Nova Consulta
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <h3 className="text-lg font-semibold">Histórico Médico</h3>
          
          <div className="grid gap-4">
            {patientRecords.map((record) => (
              <Card key={record.id}>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold">{record.description}</h4>
                      <span className="text-sm text-muted-foreground">
                        {new Date(record.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    
                    {record.diagnosis && (
                      <div>
                        <strong>Diagnóstico:</strong> {record.diagnosis}
                      </div>
                    )}
                    
                    <div>
                      <strong>Observações:</strong> {record.notes}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          <h3 className="text-lg font-semibold">Prescrições Médicas</h3>
          
          <div className="grid gap-4">
            {patientRecords
              .filter(record => record.prescription && record.prescription.length > 0)
              .map((record) => (
                <Card key={record.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Receita - {record.description}</h4>
                        <span className="text-sm text-muted-foreground">
                          {new Date(record.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        {record.prescription?.map((prescription) => (
                          <div key={prescription.id} className="border-l-4 border-blue-200 pl-4">
                            <div className="font-medium">{prescription.medication}</div>
                            <div className="text-sm text-muted-foreground">
                              <div>Dosagem: {prescription.dosage}</div>
                              <div>Frequência: {prescription.frequency}</div>
                              <div>Duração: {prescription.duration}</div>
                              <div>Instruções: {prescription.instructions}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AppointmentModal 
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        patientName={patient.name}
      />

      {selectedAppointment && (
        <TelemedicineModal
          isOpen={showTelemedicineModal}
          onClose={() => {
            setShowTelemedicineModal(false);
            setSelectedAppointment(null);
          }}
          appointment={selectedAppointment}
          userRole="patient"
        />
      )}
    </div>
  );
} 