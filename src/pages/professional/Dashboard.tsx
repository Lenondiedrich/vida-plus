import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  FileText, 
  Video, 
  Clock, 
  Users, 
  Stethoscope,
  FileEdit as Prescription,
  Plus
} from 'lucide-react';
import { appointments, medicalRecords, patients } from '@/data/mock';
import type { Professional } from '@/types';

export default function ProfessionalDashboard() {
  const { user } = useAuth();
  
  const professional = user as Professional;
  const professionalAppointments = appointments.filter(apt => apt.professionalId === professional.id);
  const professionalRecords = medicalRecords.filter(rec => rec.professionalId === professional.id);
  
  const todayAppointments = professionalAppointments.filter(apt => 
    apt.date === new Date().toISOString().split('T')[0] && apt.status === 'scheduled'
  );

  const upcomingAppointments = professionalAppointments.filter(apt => 
    apt.status === 'scheduled' && new Date(apt.date + 'T' + apt.time) > new Date()
  );

  const myPatients = patients.filter(patient => 
    professionalAppointments.some(apt => apt.patientId === patient.id)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient?.name || 'Paciente não encontrado';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Bem-vindo, {professional.name}
        </h1>
        <p className="text-muted-foreground">
          {professional.specialty} - {professional.crm}
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Consultas Hoje
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              agendadas para hoje
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Próximas Consultas
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              nos próximos dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Meus Pacientes
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myPatients.length}</div>
            <p className="text-xs text-muted-foreground">
              pacientes ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Prontuários
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{professionalRecords.length}</div>
            <p className="text-xs text-muted-foreground">
              registros criados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Conteúdo Principal com Tabs */}
      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schedule">Agenda</TabsTrigger>
          <TabsTrigger value="patients">Pacientes</TabsTrigger>
          <TabsTrigger value="records">Prontuários</TabsTrigger>
          <TabsTrigger value="prescriptions">Receitas</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Agenda do Dia</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Agendamento
            </Button>
          </div>

          <div className="grid gap-4">
            {todayAppointments.length > 0 ? todayAppointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{getPatientName(appointment.patientId)}</h4>
                        <Badge className={getStatusColor(appointment.status)}>
                          {getStatusLabel(appointment.status)}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Stethoscope className="h-4 w-4" />
                          <span>{appointment.description}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {appointment.type === 'teleconsultation' && (
                        <Button size="sm" variant="outline">
                          <Video className="mr-2 h-4 w-4" />
                          Iniciar Consulta
                        </Button>
                      )}
                      <Button size="sm">
                        Atender Paciente
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhuma consulta hoje</h3>
                  <p className="text-muted-foreground">
                    Você não tem consultas agendadas para hoje.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Próximas Consultas */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Próximas Consultas</h3>
            <div className="grid gap-4">
              {upcomingAppointments.slice(0, 3).map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{getPatientName(appointment.patientId)}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                        </div>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {getStatusLabel(appointment.status)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Meus Pacientes</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Cadastrar Paciente
            </Button>
          </div>

          <div className="grid gap-4">
            {myPatients.map((patient) => {
              const patientAppointments = professionalAppointments.filter(
                apt => apt.patientId === patient.id
              );
              const lastAppointment = patientAppointments
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

              return (
                <Card key={patient.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-semibold">{patient.name}</h4>
                          <p className="text-sm text-muted-foreground">{patient.email}</p>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Idade:</span>{' '}
                            {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} anos
                          </div>
                          {lastAppointment && (
                            <div>
                              <span className="font-medium">Última consulta:</span>{' '}
                              {new Date(lastAppointment.date).toLocaleDateString('pt-BR')}
                            </div>
                          )}
                        </div>

                        {patient.allergies.length > 0 && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-red-600">Alergias:</span>
                            <div className="flex space-x-1">
                              {patient.allergies.map((allergy, index) => (
                                <Badge key={index} variant="destructive" className="text-xs">
                                  {allergy}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Prontuário
                        </Button>
                        <Button size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Nova Consulta
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="records" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Prontuários Recentes</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Prontuário
            </Button>
          </div>

          <div className="grid gap-4">
            {professionalRecords.map((record) => (
              <Card key={record.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{getPatientName(record.patientId)}</h4>
                        <p className="text-sm text-muted-foreground">{record.description}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(record.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    
                    {record.diagnosis && (
                      <div>
                        <span className="font-medium">Diagnóstico:</span> {record.diagnosis}
                      </div>
                    )}
                    
                    <div>
                      <span className="font-medium">Observações:</span> {record.notes}
                    </div>

                    {record.prescription && record.prescription.length > 0 && (
                      <div>
                        <span className="font-medium">Prescrições:</span>
                        <div className="mt-2 space-y-1">
                          {record.prescription.map((prescription) => (
                            <div key={prescription.id} className="text-sm bg-gray-50 p-2 rounded">
                              {prescription.medication} - {prescription.dosage} - {prescription.frequency}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Receitas Emitidas</h3>
            <Button>
              <Prescription className="mr-2 h-4 w-4" />
              Nova Receita
            </Button>
          </div>

          <div className="grid gap-4">
            {professionalRecords
              .filter(record => record.prescription && record.prescription.length > 0)
              .map((record) => (
                <Card key={record.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold">Receita para {getPatientName(record.patientId)}</h4>
                          <p className="text-sm text-muted-foreground">{record.description}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(record.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        {record.prescription?.map((prescription) => (
                          <div key={prescription.id} className="border-l-4 border-green-200 pl-4">
                            <div className="font-medium">{prescription.medication}</div>
                            <div className="text-sm text-muted-foreground">
                              <div>Dosagem: {prescription.dosage}</div>
                              <div>Frequência: {prescription.frequency}</div>
                              <div>Duração: {prescription.duration}</div>
                              {prescription.instructions && (
                                <div>Instruções: {prescription.instructions}</div>
                              )}
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
    </div>
  );
} 