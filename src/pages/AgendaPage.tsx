import React, { useState } from 'react';
import { Calendar, Clock, Plus, Filter, Search, Video, MapPin, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import AppointmentModal from '@/components/AppointmentModal';
import { useAuth } from '@/hooks/useAuth';
import { appointments, professionals, patients } from '@/data/mock';
import type { Appointment } from '@/types';

export default function AgendaPage() {
  const { user } = useAuth();
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Filtrar appointments baseado no tipo de usuário
  const userAppointments = appointments.filter(apt => {
    if (user?.role === 'patient') return apt.patientId === user.id;
    if (user?.role === 'professional') return apt.professionalId === user.id;
    return true; // Admin vê todos
  });

  // Aplicar filtros
  const filteredAppointments = userAppointments.filter(apt => {
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    const matchesDate = !selectedDate || apt.date === selectedDate;
    const matchesSearch = !searchTerm || 
      getProfessionalName(apt.professionalId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getPatientName(apt.patientId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesDate && matchesSearch;
  });

  const getProfessionalName = (id: string) => {
    return professionals.find(p => p.id === id)?.name || 'Profissional não encontrado';
  };

  const getPatientName = (id: string) => {
    return patients.find(p => p.id === id)?.name || 'Paciente não encontrado';
  };

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'teleconsultation':
        return <Video className="h-4 w-4" />;
      case 'exam':
        return <Calendar className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'teleconsultation':
        return 'Teleconsulta';
      case 'exam':
        return 'Exame';
      default:
        return 'Consulta';
    }
  };

  // Estatísticas da agenda
  const stats = {
    total: userAppointments.length,
    scheduled: userAppointments.filter(apt => apt.status === 'scheduled').length,
    completed: userAppointments.filter(apt => apt.status === 'completed').length,
    today: userAppointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]).length
  };

  // Agrupar por data
  const appointmentsByDate = filteredAppointments.reduce((acc, apt) => {
    const date = apt.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(apt);
    return acc;
  }, {} as Record<string, Appointment[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
          <p className="text-muted-foreground">
            Gerencie suas consultas e compromissos médicos
          </p>
        </div>
        {(user?.role === 'patient' || user?.role === 'admin') && (
          <Button onClick={() => setShowAppointmentModal(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Consulta
          </Button>
        )}
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4" style={{ borderLeftColor: '#819A91' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#819A91' }}>{stats.total}</div>
            <p className="text-xs text-muted-foreground">consultas e exames</p>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: '#A7C1A8' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendadas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#A7C1A8' }}>{stats.scheduled}</div>
            <p className="text-xs text-muted-foreground">próximas consultas</p>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: '#D1D8BE' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#819A91' }}>{stats.completed}</div>
            <p className="text-xs text-muted-foreground">este mês</p>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: '#819A91' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoje</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#819A91' }}>{stats.today}</div>
            <p className="text-xs text-muted-foreground">compromissos hoje</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por profissional, paciente ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="scheduled">Agendadas</SelectItem>
                  <SelectItem value="completed">Concluídas</SelectItem>
                  <SelectItem value="cancelled">Canceladas</SelectItem>
                  <SelectItem value="in-progress">Em andamento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Data</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setFilterStatus('all');
                  setSearchTerm('');
                  setSelectedDate('');
                }}
                className="w-full"
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Consultas */}
      <Card>
        <CardHeader>
          <CardTitle>Consultas e Exames</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(appointmentsByDate).length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhuma consulta encontrada</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterStatus !== 'all' || selectedDate 
                  ? 'Tente ajustar os filtros para ver mais resultados.'
                  : 'Você ainda não tem consultas agendadas.'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(appointmentsByDate)
                .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
                .map(([date, dateAppointments]) => (
                  <div key={date}>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">
                      {new Date(date).toLocaleDateString('pt-BR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h3>
                    <div className="space-y-3">
                      {dateAppointments
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map((appointment) => (
                          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-start space-x-4">
                                  <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                                      {getTypeIcon(appointment.type)}
                                    </div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="text-sm font-semibold text-gray-900">
                                        {appointment.description}
                                      </h4>
                                      <Badge
                                        className={getStatusColor(appointment.status)}
                                        style={getStatusStyle(appointment.status)}
                                      >
                                        {getStatusLabel(appointment.status)}
                                      </Badge>
                                    </div>
                                    <div className="space-y-1 text-sm text-muted-foreground">
                                      <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        <span>{appointment.time}</span>
                                      </div>
                                      {user?.role !== 'patient' && (
                                        <div className="flex items-center gap-1">
                                          <User className="h-3 w-3" />
                                          <span>{getPatientName(appointment.patientId)}</span>
                                        </div>
                                      )}
                                      {user?.role !== 'professional' && (
                                        <div className="flex items-center gap-1">
                                          <User className="h-3 w-3" />
                                          <span>{getProfessionalName(appointment.professionalId)}</span>
                                        </div>
                                      )}
                                      {appointment.location && (
                                        <div className="flex items-center gap-1">
                                          <MapPin className="h-3 w-3" />
                                          <span>{appointment.location}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline">
                                    {getTypeLabel(appointment.type)}
                                  </Badge>
                                  {appointment.type === 'teleconsultation' && appointment.videoCallLink && (
                                    <Button size="sm" variant="outline">
                                      <Video className="h-3 w-3 mr-1" />
                                      Entrar
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de Agendamento */}
      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        patientId={user?.role === 'patient' ? user.id : undefined}
        patientName={user?.role === 'patient' ? user.name : undefined}
      />
    </div>
  );
} 