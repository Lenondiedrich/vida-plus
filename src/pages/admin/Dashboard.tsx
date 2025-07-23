import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { appointments, medicalRecords, patients, professionals, reports } from '@/data/mock';
import RegisterModal from '@/components/RegisterModal';
import {
    Activity,
    BarChart3,
    Calendar,
    Download,
    FileText,
    Plus,
    Settings,
    TrendingUp,
    UserCheck,
    Users
} from 'lucide-react';

export default function AdminDashboard() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  
  // Estatísticas gerais
  const totalPatients = patients.length;
  const totalProfessionals = professionals.length;
  const totalAppointments = appointments.length;
  const totalRecords = medicalRecords.length;
  
  const todayAppointments = appointments.filter(apt => 
    apt.date === new Date().toISOString().split('T')[0]
  );

  const completedAppointments = appointments.filter(apt => apt.status === 'completed');
  const scheduledAppointments = appointments.filter(apt => apt.status === 'scheduled');
  const cancelledAppointments = appointments.filter(apt => apt.status === 'cancelled');

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Painel Administrativo
        </h1>
        <p className="text-muted-foreground">
          Visão geral do sistema e ferramentas de gestão
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4" style={{ borderLeftColor: '#819A91' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Pacientes
            </CardTitle>
            <Users className="h-4 w-4" style={{ color: '#819A91' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#819A91' }}>{totalPatients}</div>
            <p className="text-xs text-muted-foreground">
              pacientes cadastrados
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4" style={{ borderLeftColor: '#A7C1A8' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Profissionais
            </CardTitle>
            <UserCheck className="h-4 w-4" style={{ color: '#A7C1A8' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#A7C1A8' }}>{totalProfessionals}</div>
            <p className="text-xs text-muted-foreground">
              profissionais ativos
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: '#D1D8BE' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Consultas Hoje
            </CardTitle>
            <Calendar className="h-4 w-4" style={{ color: '#819A91' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#819A91' }}>{todayAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              agendadas para hoje
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: '#A7C1A8' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Prontuários
            </CardTitle>
            <FileText className="h-4 w-4" style={{ color: '#A7C1A8' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#A7C1A8' }}>{totalRecords}</div>
            <p className="text-xs text-muted-foreground">
              registros médicos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas de Consultas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Consultas Concluídas
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              {((completedAppointments.length / totalAppointments) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Consultas Agendadas
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{scheduledAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              {((scheduledAppointments.length / totalAppointments) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Consultas Canceladas
            </CardTitle>
            <Activity className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{cancelledAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              {((cancelledAppointments.length / totalAppointments) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Conteúdo Principal com Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="users">Gerenciar Usuários</TabsTrigger>
          <TabsTrigger value="appointments">Consultas</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Atividade Recente */}
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Consulta concluída</div>
                      <div className="text-xs text-muted-foreground">
                        Maria Silva com Dr. Carlos Mendes
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">2h atrás</div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Nova consulta agendada</div>
                      <div className="text-xs text-muted-foreground">
                        João Santos com Dra. Fernanda Lima
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">4h atrás</div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Prontuário atualizado</div>
                      <div className="text-xs text-muted-foreground">
                        Ana Costa - Dr. Roberto Oliveira
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">6h atrás</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Especialidades Mais Procuradas */}
            <Card>
              <CardHeader>
                <CardTitle>Especialidades Mais Procuradas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Clínica Geral</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                      <span className="text-xs text-muted-foreground">80%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cardiologia</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-xs text-muted-foreground">65%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pediatria</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="text-xs text-muted-foreground">45%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Gerenciar Usuários</h3>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowRegisterModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Usuário
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Pacientes */}
            <Card>
              <CardHeader>
                <CardTitle>Pacientes Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {patients.slice(0, 5).map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{patient.name}</div>
                        <div className="text-xs text-muted-foreground">{patient.email}</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Profissionais */}
            <Card>
              <CardHeader>
                <CardTitle>Profissionais de Saúde</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {professionals.map((professional) => (
                    <div key={professional.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{professional.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {professional.specialty} - {professional.crm}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Consultas e Exames</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Consulta
            </Button>
          </div>

          <div className="grid gap-4">
            {appointments.slice(0, 10).map((appointment) => {
              const patient = patients.find(p => p.id === appointment.patientId);
              const professional = professionals.find(p => p.id === appointment.professionalId);

              return (
                <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{patient?.name}</span>
                          <span className="text-muted-foreground">com</span>
                          <span className="font-medium">{professional?.name}</span>
                          <Badge className={getStatusColor(appointment.status)}>
                            {getStatusLabel(appointment.status)}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                        </div>
                        <div className="text-sm">{appointment.description}</div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Editar
                        </Button>
                        {appointment.status === 'scheduled' && (
                          <Button size="sm" variant="destructive">
                            Cancelar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Relatórios do Sistema</h3>
            <Button>
              <BarChart3 className="mr-2 h-4 w-4" />
              Gerar Novo Relatório
            </Button>
          </div>

          <div className="grid gap-4">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h4 className="font-semibold">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Gerado em {new Date(report.generatedAt).toLocaleDateString('pt-BR')}
                      </p>
                      
                      {/* Exibir alguns dados do relatório */}
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {Object.entries(report.data).slice(0, 4).map(([key, value]) => (
                          <div key={key} className="text-sm">
                            <span className="font-medium capitalize">
                              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                            </span>{' '}
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button size="sm">
                        Visualizar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de Registro */}
      <RegisterModal 
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />
    </div>
  );
} 