import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Video, Stethoscope, AlertCircle, CheckCircle, MapPin } from 'lucide-react';
import { professionals } from '@/data/mock';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId?: string;
  patientName?: string;
}

interface AppointmentFormData {
  professionalId: string;
  date: string;
  time: string;
  type: 'consultation' | 'exam' | 'teleconsultation';
  description: string;
  notes: string;
}

export default function AppointmentModal({ 
  isOpen, 
  onClose, 

  patientName = 'Paciente'
}: AppointmentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const [appointmentForm, setAppointmentForm] = useState<AppointmentFormData>({
    professionalId: '',
    date: '',
    time: '',
    type: 'consultation',
    description: '',
    notes: ''
  });

  const selectedProfessional = professionals.find(p => p.id === appointmentForm.professionalId);

  // Horários disponíveis (simulação)
  const availableTimes = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'teleconsultation':
        return <Video className="h-4 w-4" />;
      case 'exam':
        return <Stethoscope className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'teleconsultation':
        return 'bg-blue-100 text-blue-800';
      case 'exam':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validação
    if (!appointmentForm.professionalId || !appointmentForm.date || !appointmentForm.time || !appointmentForm.description) {
      setError('Por favor, preencha todos os campos obrigatórios');
      setIsLoading(false);
      return;
    }

    // Simular agendamento
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        // Reset form
        setAppointmentForm({
          professionalId: '',
          date: '',
          time: '',
          type: 'consultation',
          description: '',
          notes: ''
        });
        setStep(1);
      }, 2000);
    }, 1500);
  };

  const handleNext = () => {
    if (step === 1 && !appointmentForm.professionalId) {
      setError('Por favor, selecione um profissional');
      return;
    }
    if (step === 2 && (!appointmentForm.date || !appointmentForm.time)) {
      setError('Por favor, selecione data e horário');
      return;
    }
    setError('');
    setStep(step + 1);
  };

  const handleBack = () => {
    setError('');
    setStep(step - 1);
  };

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Agendamento Realizado!</h3>
            <p className="text-muted-foreground text-center">
              Sua {getTypeLabel(appointmentForm.type).toLowerCase()} foi agendada com sucesso.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg w-full">
              <div className="text-sm space-y-1">
                <div><strong>Profissional:</strong> {selectedProfessional?.name}</div>
                <div><strong>Data:</strong> {new Date(appointmentForm.date).toLocaleDateString('pt-BR')}</div>
                <div><strong>Horário:</strong> {appointmentForm.time}</div>
                <div><strong>Tipo:</strong> {getTypeLabel(appointmentForm.type)}</div>
              </div>
            </div>
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
            <Calendar className="h-5 w-5" />
            <span>Agendar Consulta/Exame</span>
          </DialogTitle>
          <DialogDescription>
            {patientName && `Agendamento para: ${patientName}`}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center space-x-4 mb-6">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-16 h-0.5 ${
                  step > stepNumber ? 'bg-primary' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Selecionar Profissional */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>1. Selecione o Profissional</CardTitle>
                <CardDescription>
                  Escolha o profissional de saúde para o atendimento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {professionals.map((professional) => (
                    <div
                      key={professional.id}
                      className={`p-4 border rounded-lg transition-colors cursor-pointer ${
                        appointmentForm.professionalId === professional.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setAppointmentForm({...appointmentForm, professionalId: professional.id})}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{professional.name}</h4>
                          <p className="text-sm text-muted-foreground">{professional.specialty}</p>
                          <p className="text-xs text-muted-foreground">{professional.crm}</p>
                        </div>
                        <Badge variant="outline">{professional.specialty}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Selecionar Data e Horário */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>2. Data e Horário</CardTitle>
                <CardDescription>
                  Escolha a data e horário disponível
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="appointment-date">Data *</Label>
                    <Input
                      id="appointment-date"
                      type="date"
                      value={appointmentForm.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointment-type">Tipo de Atendimento *</Label>
                    <Select 
                      value={appointmentForm.type} 
                      onValueChange={(value: 'consultation' | 'exam' | 'teleconsultation') => 
                        setAppointmentForm({...appointmentForm, type: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>Consulta Presencial</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="teleconsultation">
                          <div className="flex items-center space-x-2">
                            <Video className="h-4 w-4" />
                            <span>Teleconsulta</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="exam">
                          <div className="flex items-center space-x-2">
                            <Stethoscope className="h-4 w-4" />
                            <span>Exame</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {appointmentForm.date && (
                  <div className="space-y-2">
                    <Label>Horários Disponíveis</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {availableTimes.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={appointmentForm.time === time ? "default" : "outline"}
                          className="h-10"
                          onClick={() => setAppointmentForm({...appointmentForm, time})}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {appointmentForm.type === 'teleconsultation' && (
                  <Alert>
                    <Video className="h-4 w-4" />
                    <AlertDescription>
                      Para teleconsultas, você receberá um link de acesso por email antes do horário agendado.
                    </AlertDescription>
                  </Alert>
                )}

                {appointmentForm.type === 'consultation' && (
                  <Alert>
                    <MapPin className="h-4 w-4" />
                    <AlertDescription>
                      Consulta presencial no consultório. Chegue com 15 minutos de antecedência.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Detalhes */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>3. Detalhes do Agendamento</CardTitle>
                <CardDescription>
                  Adicione informações sobre o motivo da consulta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="appointment-description">Motivo da Consulta *</Label>
                  <Input
                    id="appointment-description"
                    placeholder="Ex: Consulta de rotina, dor no peito, check-up..."
                    value={appointmentForm.description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAppointmentForm({...appointmentForm, description: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appointment-notes">Observações Adicionais</Label>
                  <Textarea
                    id="appointment-notes"
                    placeholder="Descreva sintomas, histórico relevante ou outras informações importantes..."
                    value={appointmentForm.notes}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAppointmentForm({...appointmentForm, notes: e.target.value})}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                {/* Resumo */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3">Resumo do Agendamento</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Profissional:</span>
                      <span className="font-medium">{selectedProfessional?.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Especialidade:</span>
                      <span>{selectedProfessional?.specialty}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Data:</span>
                      <span className="font-medium">
                        {appointmentForm.date ? new Date(appointmentForm.date).toLocaleDateString('pt-BR') : '-'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Horário:</span>
                      <span className="font-medium">{appointmentForm.time || '-'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Tipo:</span>
                      <Badge className={getTypeColor(appointmentForm.type)}>
                        {getTypeIcon(appointmentForm.type)}
                        <span className="ml-1">{getTypeLabel(appointmentForm.type)}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <div>
              {step > 1 && (
                <Button type="button" variant="outline" onClick={handleBack}>
                  Voltar
                </Button>
              )}
            </div>
            <div className="flex space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              {step < 3 ? (
                <Button type="button" onClick={handleNext}>
                  Próximo
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Agendando...' : 'Confirmar Agendamento'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 