import React, { useState } from 'react';
import { FileText, Download, Search, Filter, Eye, Calendar, Pill, Stethoscope, User, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { medicalRecords, professionals, patients } from '@/data/mock';
import type { Patient as PatientType } from '@/types';

export default function ProntuarioPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedPatient, setSelectedPatient] = useState<string>(
    user?.role === 'patient' ? user.id : ''
  );

  // Filtrar registros baseado no tipo de usuário
  const getFilteredRecords = () => {
    let records = medicalRecords;
    
    if (user?.role === 'patient') {
      records = medicalRecords.filter(rec => rec.patientId === user.id);
    } else if (user?.role === 'professional') {
      records = medicalRecords.filter(rec => rec.professionalId === user.id);
    }
    
    if (selectedPatient && user?.role !== 'patient') {
      records = records.filter(rec => rec.patientId === selectedPatient);
    }
    
    return records;
  };

  const filteredRecords = getFilteredRecords().filter(record => {
    const matchesType = filterType === 'all' || record.type === filterType;
    const matchesSearch = !searchTerm || 
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.notes.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  const getProfessionalName = (id: string) => {
    return professionals.find(p => p.id === id)?.name || 'Profissional não encontrado';
  };



  const getPatientInfo = (id: string) => {
    return patients.find(p => p.id === id) as PatientType;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation':
        return <User className="h-4 w-4" />;
      case 'exam':
        return <Stethoscope className="h-4 w-4" />;
      case 'prescription':
        return <Pill className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'consultation':
        return 'Consulta';
      case 'exam':
        return 'Exame';
      case 'prescription':
        return 'Prescrição';
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation':
        return 'bg-blue-100 text-blue-800';
      case 'exam':
        return 'bg-purple-100 text-purple-800';
      case 'prescription':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Estatísticas do prontuário
  const stats = {
    total: filteredRecords.length,
    consultations: filteredRecords.filter(rec => rec.type === 'consultation').length,
    exams: filteredRecords.filter(rec => rec.type === 'exam').length,
    prescriptions: filteredRecords.filter(rec => rec.type === 'prescription').length,
  };

  // Informações do paciente selecionado
  const currentPatient = selectedPatient ? getPatientInfo(selectedPatient) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prontuário Médico</h1>
          <p className="text-muted-foreground">
            Histórico completo de consultas, exames e prescrições
          </p>
        </div>
        <Button className="flex items-center gap-2" variant="outline">
          <Download className="h-4 w-4" />
          Exportar PDF
        </Button>
      </div>

      {/* Seletor de Paciente (apenas para profissionais e admin) */}
      {user?.role !== 'patient' && (
        <Card>
          <CardHeader>
            <CardTitle>Selecionar Paciente</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um paciente" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name} - {patient.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {/* Informações do Paciente */}
      {currentPatient && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações do Paciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nome Completo</label>
                <p className="text-sm font-semibold text-gray-900">{currentPatient.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Data de Nascimento</label>
                <p className="text-sm">{new Date(currentPatient.dateOfBirth).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">CPF</label>
                <p className="text-sm">{currentPatient.cpf}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                <p className="text-sm">{currentPatient.phone}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Endereço</label>
                <p className="text-sm">{currentPatient.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Contato de Emergência</label>
                <p className="text-sm">{currentPatient.emergencyContact}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Alergias</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {currentPatient.allergies.length > 0 ? (
                    currentPatient.allergies.map((allergy, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {allergy}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">Nenhuma alergia registrada</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4" style={{ borderLeftColor: '#819A91' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Registros</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#819A91' }}>{stats.total}</div>
            <p className="text-xs text-muted-foreground">registros médicos</p>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: '#A7C1A8' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultas</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#A7C1A8' }}>{stats.consultations}</div>
            <p className="text-xs text-muted-foreground">consultas realizadas</p>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: '#D1D8BE' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exames</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#819A91' }}>{stats.exams}</div>
            <p className="text-xs text-muted-foreground">exames realizados</p>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: '#819A91' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prescrições</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#819A91' }}>{stats.prescriptions}</div>
            <p className="text-xs text-muted-foreground">prescrições médicas</p>
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
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por descrição, diagnóstico ou observações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Registro</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="consultation">Consultas</SelectItem>
                  <SelectItem value="exam">Exames</SelectItem>
                  <SelectItem value="prescription">Prescrições</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setFilterType('all');
                  setSearchTerm('');
                }}
                className="w-full"
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registros Médicos */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico Médico</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredRecords.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum registro encontrado</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterType !== 'all' || !selectedPatient
                  ? 'Tente ajustar os filtros para ver mais resultados.'
                  : 'Ainda não há registros médicos para este paciente.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRecords
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((record) => (
                  <Card key={record.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                              {getTypeIcon(record.type)}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="text-sm font-semibold text-gray-900">
                                {record.description}
                              </h4>
                              <Badge className={getTypeColor(record.type)}>
                                {getTypeLabel(record.type)}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(record.date).toLocaleDateString('pt-BR')}</span>
                                <Clock className="h-3 w-3 ml-2" />
                                <span>{new Date(record.date).toLocaleTimeString('pt-BR')}</span>
                              </div>
                              
                              {user?.role !== 'professional' && (
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <User className="h-3 w-3" />
                                  <span>Dr. {getProfessionalName(record.professionalId)}</span>
                                </div>
                              )}
                              
                              {record.diagnosis && (
                                <div>
                                  <span className="font-medium text-gray-900">Diagnóstico: </span>
                                  <span>{record.diagnosis}</span>
                                </div>
                              )}
                              
                              {record.notes && (
                                <div>
                                  <span className="font-medium text-gray-900">Observações: </span>
                                  <span>{record.notes}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3 mr-1" />
                                Ver Detalhes
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  {getTypeIcon(record.type)}
                                  {record.description}
                                </DialogTitle>
                                <DialogDescription>
                                  {new Date(record.date).toLocaleDateString('pt-BR')} • 
                                  Dr. {getProfessionalName(record.professionalId)}
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-4">
                                {record.diagnosis && (
                                  <div>
                                    <h4 className="font-semibold mb-2">Diagnóstico</h4>
                                    <p className="text-sm bg-gray-50 p-3 rounded-lg">{record.diagnosis}</p>
                                  </div>
                                )}
                                
                                {record.prescription && record.prescription.length > 0 && (
                                  <div>
                                    <h4 className="font-semibold mb-2">Prescrições</h4>
                                    <div className="space-y-2">
                                      {record.prescription.map((med, index) => (
                                        <div key={index} className="bg-green-50 p-3 rounded-lg border border-green-200">
                                          <div className="flex items-center gap-2 mb-1">
                                            <Pill className="h-4 w-4 text-green-600" />
                                            <span className="font-medium">{med.medication}</span>
                                          </div>
                                          <div className="text-sm space-y-1">
                                            <p><strong>Dosagem:</strong> {med.dosage}</p>
                                            <p><strong>Frequência:</strong> {med.frequency}</p>
                                            <p><strong>Duração:</strong> {med.duration}</p>
                                            <p><strong>Instruções:</strong> {med.instructions}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                {record.examResults && record.examResults.length > 0 && (
                                  <div>
                                    <h4 className="font-semibold mb-2">Resultados de Exames</h4>
                                    <div className="space-y-2">
                                      {record.examResults.map((exam, index) => (
                                        <div key={index} className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                          <div className="flex items-center gap-2 mb-1">
                                            <Stethoscope className="h-4 w-4 text-purple-600" />
                                            <span className="font-medium">{exam.examType}</span>
                                          </div>
                                          <p className="text-sm">{exam.result}</p>
                                          <p className="text-xs text-muted-foreground mt-1">
                                            {new Date(exam.date).toLocaleDateString('pt-BR')}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                {record.notes && (
                                  <div>
                                    <h4 className="font-semibold mb-2">Observações</h4>
                                    <p className="text-sm bg-gray-50 p-3 rounded-lg">{record.notes}</p>
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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 