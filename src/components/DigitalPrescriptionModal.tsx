import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Pill,
  Download,
  Share2,
  Truck,
  CheckCircle,
  MapPin,
  Plus,
  X,
} from "lucide-react";

interface Medication {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  genericAvailable: boolean;
  estimatedPrice: number;
}

interface DigitalPrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "create";
  prescription?: {
    id: string;
    patientName: string;
    professionalName: string;
    medications: Medication[];
    createdAt: string;
    validUntil: string;
    digitalSignature: string;
    status: "active" | "used" | "expired" | "cancelled";
    pharmacyDelivery?: {
      pharmacyName: string;
      estimatedDeliveryTime: string;
      deliveryFee: number;
      status: "pending" | "confirmed" | "preparing" | "shipped" | "delivered";
      trackingCode?: string;
    };
  };
  onSave?: (medications: Medication[], notes: string) => void;
}

export default function DigitalPrescriptionModal({
  isOpen,
  onClose,
  mode,
  prescription,
  onSave,
}: DigitalPrescriptionModalProps) {
  const [medications, setMedications] = useState<Medication[]>(
    prescription?.medications || []
  );
  const [notes, setNotes] = useState("");
  const [newMedication, setNewMedication] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  });

  const addMedication = () => {
    if (newMedication.medication && newMedication.dosage) {
      const medication: Medication = {
        id: `med_${Date.now()}`,
        ...newMedication,
        genericAvailable: true,
        estimatedPrice: Math.random() * 50 + 10, // Preço simulado
      };

      setMedications([...medications, medication]);
      setNewMedication({
        medication: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      });
    }
  };

  const removeMedication = (id: string) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(medications, notes);
    }
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "used":
        return "bg-blue-100 text-blue-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "preparing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalPrice = medications.reduce(
    (sum, med) => sum + med.estimatedPrice,
    0
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Pill className="h-5 w-5" />
              <span>
                {mode === "create"
                  ? "Criar Receita Digital"
                  : "Receita Digital"}
              </span>
            </div>
            {prescription && (
              <Badge className={getStatusColor(prescription.status)}>
                {prescription.status === "active"
                  ? "Ativa"
                  : prescription.status === "used"
                  ? "Utilizada"
                  : prescription.status === "expired"
                  ? "Expirada"
                  : "Cancelada"}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {mode === "view" && prescription && (
            <>
              {/* Header Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Informações da Receita
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="font-medium">Paciente</Label>
                      <div className="text-sm text-muted-foreground">
                        {prescription.patientName}
                      </div>
                    </div>
                    <div>
                      <Label className="font-medium">Médico</Label>
                      <div className="text-sm text-muted-foreground">
                        {prescription.professionalName}
                      </div>
                    </div>
                    <div>
                      <Label className="font-medium">Data de Emissão</Label>
                      <div className="text-sm text-muted-foreground">
                        {new Date(prescription.createdAt).toLocaleDateString(
                          "pt-BR"
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="font-medium">Válida até</Label>
                      <div className="text-sm text-muted-foreground">
                        {new Date(prescription.validUntil).toLocaleDateString(
                          "pt-BR"
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="font-medium">Assinatura Digital</Label>
                    <div className="text-xs text-muted-foreground font-mono bg-gray-50 p-2 rounded">
                      {prescription.digitalSignature}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Status */}
              {prescription.pharmacyDelivery && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Truck className="h-5 w-5" />
                      <span>Status da Entrega</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span className="font-medium">
                            {prescription.pharmacyDelivery.pharmacyName}
                          </span>
                        </div>
                        <Badge
                          className={getDeliveryStatusColor(
                            prescription.pharmacyDelivery.status
                          )}
                        >
                          {prescription.pharmacyDelivery.status === "confirmed"
                            ? "Confirmado"
                            : prescription.pharmacyDelivery.status ===
                              "preparing"
                            ? "Preparando"
                            : prescription.pharmacyDelivery.status === "shipped"
                            ? "Enviado"
                            : prescription.pharmacyDelivery.status ===
                              "delivered"
                            ? "Entregue"
                            : "Pendente"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">
                            Previsão de entrega:
                          </span>
                          <div className="text-muted-foreground">
                            {new Date(
                              prescription.pharmacyDelivery.estimatedDeliveryTime
                            ).toLocaleDateString("pt-BR")}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">Taxa de entrega:</span>
                          <div className="text-muted-foreground">
                            R${" "}
                            {prescription.pharmacyDelivery.deliveryFee.toFixed(
                              2
                            )}
                          </div>
                        </div>
                      </div>

                      {prescription.pharmacyDelivery.trackingCode && (
                        <div>
                          <span className="font-medium">
                            Código de rastreamento:
                          </span>
                          <div className="font-mono text-sm bg-gray-50 p-2 rounded">
                            {prescription.pharmacyDelivery.trackingCode}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* Medications List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {mode === "create" ? "Medicamentos Prescritos" : "Medicamentos"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {medications.map((medication) => (
                <div
                  key={medication.id}
                  className="border-l-4 border-blue-200 pl-4 py-3 bg-gray-50 rounded-r"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-lg">
                          {medication.medication}
                        </span>
                        {medication.genericAvailable && (
                          <Badge variant="outline" className="text-xs">
                            Genérico disponível
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Dosagem:</span>{" "}
                          {medication.dosage}
                        </div>
                        <div>
                          <span className="font-medium">Frequência:</span>{" "}
                          {medication.frequency}
                        </div>
                        <div>
                          <span className="font-medium">Duração:</span>{" "}
                          {medication.duration}
                        </div>
                        <div>
                          <span className="font-medium">Preço estimado:</span>
                          <span className="text-green-600 font-medium">
                            {" "}
                            R$ {medication.estimatedPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {medication.instructions && (
                        <div>
                          <span className="font-medium">Instruções:</span>
                          <div className="text-muted-foreground">
                            {medication.instructions}
                          </div>
                        </div>
                      )}
                    </div>

                    {mode === "create" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMedication(medication.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {mode === "create" && (
                <Card className="border-dashed">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Medicamento *</Label>
                          <Input
                            value={newMedication.medication}
                            onChange={(e) =>
                              setNewMedication({
                                ...newMedication,
                                medication: e.target.value,
                              })
                            }
                            placeholder="Ex: Paracetamol 500mg"
                          />
                        </div>
                        <div>
                          <Label>Dosagem *</Label>
                          <Input
                            value={newMedication.dosage}
                            onChange={(e) =>
                              setNewMedication({
                                ...newMedication,
                                dosage: e.target.value,
                              })
                            }
                            placeholder="Ex: 500mg"
                          />
                        </div>
                        <div>
                          <Label>Frequência</Label>
                          <Input
                            value={newMedication.frequency}
                            onChange={(e) =>
                              setNewMedication({
                                ...newMedication,
                                frequency: e.target.value,
                              })
                            }
                            placeholder="Ex: 8/8 horas"
                          />
                        </div>
                        <div>
                          <Label>Duração</Label>
                          <Input
                            value={newMedication.duration}
                            onChange={(e) =>
                              setNewMedication({
                                ...newMedication,
                                duration: e.target.value,
                              })
                            }
                            placeholder="Ex: 7 dias"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Instruções especiais</Label>
                        <Textarea
                          value={newMedication.instructions}
                          onChange={(e) =>
                            setNewMedication({
                              ...newMedication,
                              instructions: e.target.value,
                            })
                          }
                          placeholder="Ex: Tomar após as refeições"
                          rows={2}
                        />
                      </div>

                      <Button onClick={addMedication} className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Adicionar Medicamento
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {medications.length > 0 && (
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="font-medium">Total estimado:</span>
                  <span className="text-lg font-bold text-green-600">
                    R$ {totalPrice.toFixed(2)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {mode === "create" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Observações Adicionais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Observações gerais sobre o tratamento..."
                  rows={4}
                />
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            {mode === "view" && prescription && (
              <>
                <Button className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Baixar PDF
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartilhar
                </Button>
                {prescription.status === "active" && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    style={{ backgroundColor: "#819A91", color: "white" }}
                  >
                    <Truck className="mr-2 h-4 w-4" />
                    Solicitar Entrega
                  </Button>
                )}
              </>
            )}

            {mode === "create" && (
              <>
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1"
                  style={{ backgroundColor: "#819A91" }}
                  disabled={medications.length === 0}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Emitir Receita
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
