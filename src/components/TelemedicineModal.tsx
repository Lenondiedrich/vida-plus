import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  Settings,
  MessageSquare,
  Share,
  Users,
  Clock,
  PhoneOff,
} from "lucide-react";

interface TelemedicineModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: {
    id: string;
    patientName: string;
    professionalName: string;
    time: string;
    description: string;
  };
  userRole: "patient" | "professional";
}

export default function TelemedicineModal({
  isOpen,
  onClose,
  appointment,
  userRole,
}: TelemedicineModalProps) {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionTime, setConnectionTime] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender:
        userRole === "patient"
          ? appointment.professionalName
          : appointment.patientName,
      message: "Olá! Estou online e pronto para iniciar a consulta.",
      timestamp: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setConnectionTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleConnect = () => {
    setIsConnected(true);
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "Sistema",
        message: "Conexão estabelecida com sucesso!",
        timestamp: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const handleEndCall = () => {
    setIsConnected(false);
    setConnectionTime(0);
    onClose();
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender:
            userRole === "patient"
              ? appointment.patientName
              : appointment.professionalName,
          message: newMessage,
          timestamp: new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center justify-between">
            <div>
              <span>Teleconsulta - {appointment.description}</span>
              <div className="text-sm font-normal text-muted-foreground mt-1">
                {userRole === "patient"
                  ? `Dr(a). ${appointment.professionalName}`
                  : appointment.patientName}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isConnected && (
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Conectado - {formatTime(connectionTime)}
                </Badge>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex overflow-hidden">
          {/* Video Area */}
          <div className="flex-1 bg-gray-900 relative">
            {/* Main Video (Remote Participant) */}
            <div
              className="w-full h-full flex items-center justify-center text-white"
              style={{
                background: `linear-gradient(135deg, #819A91 0%, #A7C1A8 100%)`,
              }}
            >
              {isConnected ? (
                <div className="text-center">
                  {isVideoOn ? (
                    <div className="relative">
                      <Video className="h-24 w-24 mx-auto mb-4 opacity-80" />
                      <div className="text-lg font-medium">
                        {userRole === "patient"
                          ? `Dr(a). ${appointment.professionalName}`
                          : appointment.patientName}
                      </div>
                      <div className="text-sm opacity-75">Vídeo ativo</div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <VideoOff className="h-24 w-24 mx-auto mb-4 opacity-80" />
                      <div className="text-lg font-medium">
                        {userRole === "patient"
                          ? `Dr(a). ${appointment.professionalName}`
                          : appointment.patientName}
                      </div>
                      <div className="text-sm opacity-75">Vídeo desligado</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <Users className="h-24 w-24 mx-auto mb-4 opacity-50" />
                  <div className="text-xl font-medium mb-2">
                    Aguardando conexão...
                  </div>
                  <Button
                    onClick={handleConnect}
                    style={{
                      backgroundColor: "#819A91",
                      borderColor: "#819A91",
                    }}
                    className="hover:opacity-90"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Conectar Chamada
                  </Button>
                </div>
              )}
            </div>

            {/* Picture-in-Picture (Self Video) */}
            <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-gray-600 flex items-center justify-center text-white">
              {isVideoOn ? (
                <div className="text-center">
                  <Video className="h-8 w-8 mx-auto mb-2 opacity-80" />
                  <div className="text-xs">Você</div>
                </div>
              ) : (
                <div className="text-center">
                  <VideoOff className="h-8 w-8 mx-auto mb-2 opacity-80" />
                  <div className="text-xs">Vídeo off</div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-4 bg-gray-800/90 rounded-full px-6 py-3">
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full ${
                    isAudioOn
                      ? "bg-gray-700 text-white"
                      : "bg-red-600 text-white"
                  }`}
                  onClick={() => setIsAudioOn(!isAudioOn)}
                >
                  {isAudioOn ? (
                    <Mic className="h-5 w-5" />
                  ) : (
                    <MicOff className="h-5 w-5" />
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full ${
                    isVideoOn
                      ? "bg-gray-700 text-white"
                      : "bg-red-600 text-white"
                  }`}
                  onClick={() => setIsVideoOn(!isVideoOn)}
                >
                  {isVideoOn ? (
                    <Video className="h-5 w-5" />
                  ) : (
                    <VideoOff className="h-5 w-5" />
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-gray-700 text-white"
                >
                  <Share className="h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-gray-700 text-white"
                >
                  <Settings className="h-5 w-5" />
                </Button>

                <Button
                  variant="destructive"
                  size="icon"
                  className="rounded-full"
                  onClick={handleEndCall}
                >
                  <PhoneOff className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Panel */}
          <div className="w-80 bg-white border-l flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span className="font-medium">Chat da Consulta</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map((message) => (
                <div key={message.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {message.sender}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp}
                    </span>
                  </div>
                  <div className="text-sm bg-gray-50 p-2 rounded">
                    {message.message}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Digite uma mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button size="sm" onClick={handleSendMessage}>
                  Enviar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Horário: {appointment.time}</span>
              </div>
              <div>ID da Consulta: {appointment.id}</div>
            </div>
            <div className="text-xs">
              💡 Esta é uma simulação de telemedicina para fins de demonstração
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
