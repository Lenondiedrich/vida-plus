import { useState } from "react";
import {
  Video,
  Clock,
  Users,
  FileText,
  TrendingUp,
  Pill,
  Calendar,
  Activity,
  Star,
  Download,
  MessageSquare,
  PhoneCall,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import {
  appointments,
  telemedicineSessions,
  digitalPrescriptions,
  waitingRooms,
  patients,
  professionals,
} from "@/data/mock";
import TelemedicineModal from "@/components/TelemedicineModal";

export default function TelemedicinePage() {
  const { user } = useAuth();
  const [showTelemedicineModal, setShowTelemedicineModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<{
    id: string;
    patientName: string;
    professionalName: string;
    time: string;
    description: string;
  } | null>(null);

  // Filtrar appointments de teleconsulta baseado no usuário
  const userTeleconsultations = appointments.filter((apt) => {
    if (user?.role === "patient") {
      return apt.patientId === user.id && apt.type === "teleconsultation";
    } else if (user?.role === "professional") {
      return apt.professionalId === user.id && apt.type === "teleconsultation";
    }
    return apt.type === "teleconsultation"; // Admin vê todas
  });

  // Estatísticas
  const stats = {
    total: userTeleconsultations.length,
    completed: userTeleconsultations.filter((apt) => apt.status === "completed")
      .length,
    scheduled: userTeleconsultations.filter((apt) => apt.status === "scheduled")
      .length,
    inProgress: userTeleconsultations.filter(
      (apt) => apt.status === "in-progress"
    ).length,
    waiting: userTeleconsultations.filter((apt) => apt.status === "waiting")
      .length,
  };

  const getPatientName = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient?.name || "Paciente não encontrado";
  };

  const getProfessionalName = (professionalId: string) => {
    const professional = professionals.find((p) => p.id === professionalId);
    return professional?.name || "Profissional não encontrado";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "waiting":
        return "bg-orange-100 text-orange-800";
      case "connecting":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Agendada";
      case "completed":
        return "Concluída";
      case "in-progress":
        return "Em andamento";
      case "waiting":
        return "Na sala de espera";
      case "connecting":
        return "Conectando";
      default:
        return status;
    }
  };

  const handleStartTeleconsultation = (
    appointment: (typeof userTeleconsultations)[0]
  ) => {
    setSelectedAppointment({
      id: appointment.id,
      patientName:
        user?.role === "professional"
          ? getPatientName(appointment.patientId)
          : user?.name || "",
      professionalName:
        user?.role === "patient"
          ? getProfessionalName(appointment.professionalId)
          : user?.name || "",
      time: appointment.time,
      description: appointment.description,
    });
    setShowTelemedicineModal(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Telemedicina</h1>
        <p className="text-muted-foreground">
          Plataforma completa para teleconsultas e atendimento médico remoto
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4" style={{ borderLeftColor: "#819A91" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Teleconsultas
            </CardTitle>
            <Video className="h-4 w-4" style={{ color: "#819A91" }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "#819A91" }}>
              {stats.total}
            </div>
            <p className="text-xs text-muted-foreground">
              todas as teleconsultas
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: "#A7C1A8" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <Activity className="h-4 w-4" style={{ color: "#A7C1A8" }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "#A7C1A8" }}>
              {stats.completed}
            </div>
            <p className="text-xs text-muted-foreground">
              consultas finalizadas
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: "#D1D8BE" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendadas</CardTitle>
            <Calendar className="h-4 w-4" style={{ color: "#819A91" }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "#819A91" }}>
              {stats.scheduled}
            </div>
            <p className="text-xs text-muted-foreground">próximas consultas</p>
          </CardContent>
        </Card>

        <Card className="border-l-4" style={{ borderLeftColor: "#FFA500" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Espera</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">
              {stats.waiting}
            </div>
            <p className="text-xs text-muted-foreground">
              aguardando atendimento
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Conteúdo Principal com Tabs */}
      <Tabs defaultValue="sessions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sessions">Sessões Ativas</TabsTrigger>
          <TabsTrigger value="scheduled">Agendadas</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="prescriptions">Receitas Digitais</TabsTrigger>
          {user?.role === "admin" && (
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="sessions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              Sessões Ativas e Pendentes
            </h3>
          </div>

          <div className="grid gap-4">
            {/* Teleconsultas em andamento ou aguardando */}
            {userTeleconsultations
              .filter((apt) =>
                ["in-progress", "waiting", "connecting"].includes(apt.status)
              )
              .map((appointment) => (
                <Card
                  key={appointment.id}
                  className="border-l-4 border-l-green-500"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">
                            {user?.role === "patient"
                              ? getProfessionalName(appointment.professionalId)
                              : getPatientName(appointment.patientId)}
                          </h4>
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
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(appointment.date).toLocaleDateString(
                                "pt-BR"
                              )}
                            </span>
                          </div>
                          <div className="text-sm">
                            {appointment.description}
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          onClick={() =>
                            handleStartTeleconsultation(appointment)
                          }
                          style={{ backgroundColor: "#819A91" }}
                          className="hover:opacity-90"
                        >
                          <Video className="mr-2 h-4 w-4" />
                          {appointment.status === "in-progress"
                            ? "Entrar na Sessão"
                            : "Iniciar Consulta"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {/* Salas de espera */}
            {waitingRooms
              .filter((room) =>
                userTeleconsultations.some(
                  (apt) => apt.id === room.appointmentId
                )
              )
              .map((room) => {
                const appointment = appointments.find(
                  (apt) => apt.id === room.appointmentId
                );
                if (!appointment) return null;

                return (
                  <Card
                    key={room.id}
                    className="border-l-4 border-l-orange-500"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Users className="h-5 w-5 text-orange-500" />
                            <span className="font-semibold">
                              Sala de Espera Virtual
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Tempo estimado de espera: {room.estimatedWaitTime}{" "}
                            minutos
                          </div>
                          <div className="text-sm">
                            Paciente: {getPatientName(room.patientId)}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Chat
                          </Button>
                          {user?.role === "professional" && (
                            <Button
                              onClick={() =>
                                handleStartTeleconsultation(appointment)
                              }
                              style={{ backgroundColor: "#819A91" }}
                            >
                              <PhoneCall className="mr-2 h-4 w-4" />
                              Chamar Paciente
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

            {userTeleconsultations.filter((apt) =>
              ["in-progress", "waiting", "connecting"].includes(apt.status)
            ).length === 0 &&
              waitingRooms.length === 0 && (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Nenhuma sessão ativa
                    </h3>
                    <p className="text-muted-foreground">
                      Não há teleconsultas em andamento no momento.
                    </p>
                  </CardContent>
                </Card>
              )}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Teleconsultas Agendadas</h3>
          </div>

          <div className="grid gap-4">
            {userTeleconsultations
              .filter((apt) => apt.status === "scheduled")
              .map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">
                            {user?.role === "patient"
                              ? getProfessionalName(appointment.professionalId)
                              : getPatientName(appointment.patientId)}
                          </h4>
                          <Badge className={getStatusColor(appointment.status)}>
                            {getStatusLabel(appointment.status)}
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(appointment.date).toLocaleDateString(
                                "pt-BR"
                              )}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>

                        <div className="text-sm">{appointment.description}</div>
                        {appointment.price && (
                          <div className="text-sm font-medium text-green-600">
                            R$ {appointment.price.toFixed(2)}
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleStartTeleconsultation(appointment)
                          }
                        >
                          <Video className="mr-2 h-4 w-4" />
                          Testar Conexão
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              Histórico de Teleconsultas
            </h3>
          </div>

          <div className="grid gap-4">
            {userTeleconsultations
              .filter((apt) => apt.status === "completed")
              .map((appointment) => {
                const session = telemedicineSessions.find(
                  (s) => s.appointmentId === appointment.id
                );

                return (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">
                              {user?.role === "patient"
                                ? getProfessionalName(
                                    appointment.professionalId
                                  )
                                : getPatientName(appointment.patientId)}
                            </h4>
                            <div className="text-sm text-muted-foreground">
                              {new Date(appointment.date).toLocaleDateString(
                                "pt-BR"
                              )}{" "}
                              às {appointment.time}
                            </div>
                          </div>
                          <Badge className={getStatusColor(appointment.status)}>
                            {getStatusLabel(appointment.status)}
                          </Badge>
                        </div>

                        <div className="text-sm">{appointment.description}</div>

                        {session && (
                          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>
                                Duração da sessão: {session.duration} minutos
                              </span>
                              <div className="flex items-center space-x-1">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    session.connectionQuality === "excellent"
                                      ? "bg-green-500"
                                      : session.connectionQuality === "good"
                                      ? "bg-blue-500"
                                      : session.connectionQuality === "fair"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                  }`}
                                ></div>
                                <span className="capitalize">
                                  {session.connectionQuality}
                                </span>
                              </div>
                            </div>

                            {session.prescriptionIssued && (
                              <div className="flex items-center space-x-1 text-sm text-green-600">
                                <Pill className="h-4 w-4" />
                                <span>Receita digital emitida</span>
                              </div>
                            )}

                            {session.sessionNotes && (
                              <div className="text-sm">
                                <strong>Observações:</strong>{" "}
                                {session.sessionNotes}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            Ver Detalhes
                          </Button>
                          {session?.prescriptionIssued && (
                            <Button variant="outline" size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              Baixar Receita
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

        <TabsContent value="prescriptions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Receitas Digitais</h3>
          </div>

          <div className="grid gap-4">
            {digitalPrescriptions
              .filter(
                (prescription) =>
                  user?.role === "patient"
                    ? prescription.patientId === user.id
                    : user?.role === "professional"
                    ? prescription.professionalId === user.id
                    : true // Admin vê todas
              )
              .map((prescription) => (
                <Card key={prescription.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">
                            Receita #{prescription.id}
                          </h4>
                          <div className="text-sm text-muted-foreground">
                            {user?.role === "patient"
                              ? getProfessionalName(prescription.professionalId)
                              : getPatientName(prescription.patientId)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Emitida em:{" "}
                            {new Date(
                              prescription.createdAt
                            ).toLocaleDateString("pt-BR")}
                          </div>
                        </div>
                        <Badge
                          variant={
                            prescription.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {prescription.status === "active"
                            ? "Ativa"
                            : prescription.status}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        {prescription.medications.map((medication) => (
                          <div
                            key={medication.id}
                            className="border-l-4 border-blue-200 pl-4"
                          >
                            <div className="font-medium">
                              {medication.medication}
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div>Dosagem: {medication.dosage}</div>
                              <div>Frequência: {medication.frequency}</div>
                              <div>Duração: {medication.duration}</div>
                              <div>Instruções: {medication.instructions}</div>
                              <div className="font-medium text-green-600">
                                Preço estimado: R${" "}
                                {medication.estimatedPrice.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {prescription.pharmacyDelivery && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">
                                {prescription.pharmacyDelivery.pharmacyName}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Status: {prescription.pharmacyDelivery.status}
                              </div>
                              {prescription.pharmacyDelivery.trackingCode && (
                                <div className="text-sm">
                                  Código de rastreamento:{" "}
                                  {prescription.pharmacyDelivery.trackingCode}
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-sm">Taxa de entrega:</div>
                              <div className="font-medium">
                                R${" "}
                                {prescription.pharmacyDelivery.deliveryFee.toFixed(
                                  2
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Baixar PDF
                        </Button>
                        {prescription.status === "active" &&
                          user?.role === "patient" && (
                            <Button
                              size="sm"
                              style={{ backgroundColor: "#819A91" }}
                            >
                              <Pill className="mr-2 h-4 w-4" />
                              Solicitar Entrega
                            </Button>
                          )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        {user?.role === "admin" && (
          <TabsContent value="analytics" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Analytics de Telemedicina
              </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Qualidade das Conexões
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Excelente</span>
                      </span>
                      <span className="font-medium">45 sessões</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Boa</span>
                      </span>
                      <span className="font-medium">18 sessões</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span>Regular</span>
                      </span>
                      <span className="font-medium">3 sessões</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Especialidades Mais Ativas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Clínica Geral</span>
                      <span className="font-medium">28 consultas</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Pediatria</span>
                      <span className="font-medium">22 consultas</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Cardiologia</span>
                      <span className="font-medium">15 consultas</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Dermatologia</span>
                      <span className="font-medium">12 consultas</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Satisfação dos Pacientes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-4">
                    <Star className="h-6 w-6 text-yellow-500 fill-current" />
                    <span className="text-3xl font-bold">4.7</span>
                    <span className="text-muted-foreground">/ 5.0</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Baseado em 67 avaliações de teleconsultas
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Receita Gerada</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                    <span className="text-3xl font-bold">R$ 12.650</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Receita total em teleconsultas este mês
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}
      </Tabs>

      {/* Modal de Teleconsulta */}
      {selectedAppointment && (
        <TelemedicineModal
          isOpen={showTelemedicineModal}
          onClose={() => {
            setShowTelemedicineModal(false);
            setSelectedAppointment(null);
          }}
          appointment={selectedAppointment}
          userRole={user?.role === "patient" ? "patient" : "professional"}
        />
      )}
    </div>
  );
}
