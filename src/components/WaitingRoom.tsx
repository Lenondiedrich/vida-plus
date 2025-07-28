import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  Video,
  Users,
  MessageSquare,
  Settings,
  Mic,
  MicOff,
  VideoOff,
  Phone,
} from "lucide-react";

interface WaitingRoomProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: {
    id: string;
    patientName: string;
    professionalName: string;
    time: string;
    description: string;
  };
  estimatedWaitTime: number;
  onStartCall: () => void;
}

export default function WaitingRoom({
  isOpen,
  onClose,
  appointment,
  estimatedWaitTime,
  onStartCall,
}: WaitingRoomProps) {
  const [waitTime, setWaitTime] = useState(estimatedWaitTime);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<
    "testing" | "good" | "poor"
  >("good");

  useEffect(() => {
    if (isOpen && waitTime > 0) {
      const interval = setInterval(() => {
        setWaitTime((prev) => Math.max(0, prev - 1));
      }, 60000); // Decrementa a cada minuto

      return () => clearInterval(interval);
    }
  }, [isOpen, waitTime]);

  useEffect(() => {
    // Simular teste de conexão
    if (isOpen) {
      setConnectionStatus("testing");
      const timeout = setTimeout(() => {
        setConnectionStatus(Math.random() > 0.2 ? "good" : "poor");
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case "testing":
        return "bg-yellow-100 text-yellow-800";
      case "good":
        return "bg-green-100 text-green-800";
      case "poor":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getConnectionStatusLabel = () => {
    switch (connectionStatus) {
      case "testing":
        return "Testando conexão...";
      case "good":
        return "Conexão boa";
      case "poor":
        return "Conexão instável";
      default:
        return "Desconectado";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="flex items-center justify-between">
            <div>
              <span>Sala de Espera Virtual</span>
              <div className="text-sm font-normal text-muted-foreground mt-1">
                Aguardando {appointment.professionalName}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                <Clock className="w-3 h-3 mr-1" />
                {waitTime > 0 ? `${waitTime} min` : "Em breve"}
              </Badge>
              <Badge className={getConnectionStatusColor()}>
                {getConnectionStatusLabel()}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex">
          {/* Video Preview Area */}
          <div className="flex-1 bg-gray-900 relative flex items-center justify-center">
            {/* Self Video Preview */}
            <div className="text-center text-white">
              {isVideoOn ? (
                <div>
                  <Video className="h-24 w-24 mx-auto mb-4 opacity-80" />
                  <div className="text-lg font-medium mb-2">
                    Você está pronto!
                  </div>
                  <div className="text-sm opacity-75">
                    Sua câmera e microfone estão funcionando
                  </div>
                </div>
              ) : (
                <div>
                  <VideoOff className="h-24 w-24 mx-auto mb-4 opacity-80" />
                  <div className="text-lg font-medium mb-2">
                    Câmera desligada
                  </div>
                  <div className="text-sm opacity-75">
                    Clique no botão para ligar sua câmera
                  </div>
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
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Doctor Status */}
            <div className="absolute top-4 left-4 bg-gray-800/90 text-white px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Dr. chegará em breve</span>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="w-80 bg-white border-l flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span className="font-medium">Informações da Consulta</span>
              </div>
            </div>

            <div className="flex-1 p-4 space-y-4">
              {/* Appointment Details */}
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Médico:</span>
                      <div className="text-sm text-muted-foreground">
                        {appointment.professionalName}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Horário:</span>
                      <div className="text-sm text-muted-foreground">
                        {appointment.time}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Consulta:</span>
                      <div className="text-sm text-muted-foreground">
                        {appointment.description}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Connection Test */}
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="font-medium">Teste de Conectividade</div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Câmera:</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600">OK</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Microfone:</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600">OK</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Internet:</span>
                        <div className="flex items-center space-x-1">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              connectionStatus === "good"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            }`}
                          ></div>
                          <span
                            className={`text-sm ${
                              connectionStatus === "good"
                                ? "text-green-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {connectionStatus === "good" ? "Boa" : "Moderada"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="font-medium">Dicas para a consulta:</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Mantenha-se em local bem iluminado</li>
                      <li>• Evite ruídos de fundo</li>
                      <li>• Tenha seus documentos em mãos</li>
                      <li>• Teste áudio e vídeo antes</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t space-y-2">
              <Button
                className="w-full"
                onClick={onStartCall}
                style={{ backgroundColor: "#819A91" }}
                disabled={connectionStatus === "testing"}
              >
                <Phone className="mr-2 h-4 w-4" />
                {waitTime > 0 ? "Entrar Quando Pronto" : "Entrar na Consulta"}
              </Button>

              <Button variant="outline" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat com Suporte
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>Consulta ID: {appointment.id}</div>
            <div>💡 Esta é uma sala de espera virtual segura</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
