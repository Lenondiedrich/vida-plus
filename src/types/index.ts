export interface User {
  id: string;
  name: string;
  email: string;
  role: "patient" | "professional" | "admin";
  avatar?: string;
  phone?: string;
  cpf?: string;
  crm?: string; // Para profissionais
}

export interface Patient extends User {
  role: "patient";
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  allergies: string[];
  medicalHistory: MedicalRecord[];
}

export interface Professional extends User {
  role: "professional";
  crm: string;
  specialty: string;
  schedule: ScheduleSlot[];
  telemedicineEnabled: boolean;
  telemedicineRating?: number;
  consultationPrice?: number;
}

export interface Admin extends User {
  role: "admin";
  permissions: string[];
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  professionalId: string;
  date: string;
  type: "consultation" | "exam" | "prescription" | "teleconsultation";
  description: string;
  diagnosis?: string;
  prescription?: Prescription[];
  examResults?: ExamResult[];
  notes: string;
  telemedicineSession?: TelemedicineSession;
}

export interface Appointment {
  id: string;
  patientId: string;
  professionalId: string;
  date: string;
  time: string;
  type: "consultation" | "exam" | "teleconsultation";
  status:
    | "scheduled"
    | "completed"
    | "cancelled"
    | "in-progress"
    | "waiting"
    | "connecting";
  description: string;
  location?: string;
  videoCallLink?: string;
  telemedicineSession?: TelemedicineSession;
  price?: number;
}

export interface TelemedicineSession {
  id: string;
  appointmentId: string;
  roomId: string;
  startTime?: string;
  endTime?: string;
  duration?: number; // em minutos
  connectionQuality: "excellent" | "good" | "fair" | "poor";
  participants: TelemedicineParticipant[];
  chatMessages: ChatMessage[];
  recordings?: SessionRecording[];
  technicalIssues?: TechnicalIssue[];
  sessionNotes?: string;
  prescriptionIssued?: boolean;
  followUpRequired?: boolean;
}

export interface TelemedicineParticipant {
  userId: string;
  role: "patient" | "professional";
  joinedAt?: string;
  leftAt?: string;
  connectionStatus: "connected" | "disconnected" | "reconnecting";
  videoEnabled: boolean;
  audioEnabled: boolean;
  deviceInfo: {
    camera: boolean;
    microphone: boolean;
    browser: string;
    os: string;
  };
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: "text" | "file" | "prescription" | "system";
  fileUrl?: string;
  fileName?: string;
}

export interface SessionRecording {
  id: string;
  fileName: string;
  duration: number;
  size: number; // em MB
  uploadedAt: string;
  accessLevel: "patient_professional" | "professional_only" | "admin_only";
}

export interface TechnicalIssue {
  id: string;
  type: "connection" | "audio" | "video" | "screen_share";
  description: string;
  timestamp: string;
  resolved: boolean;
  resolution?: string;
}

export interface WaitingRoom {
  id: string;
  appointmentId: string;
  patientId: string;
  joinedAt: string;
  estimatedWaitTime: number; // em minutos
  status: "waiting" | "called" | "in_session";
  professionalNotified: boolean;
}

export interface DigitalPrescription {
  id: string;
  sessionId: string;
  patientId: string;
  professionalId: string;
  medications: PrescriptionMedication[];
  createdAt: string;
  validUntil: string;
  digitalSignature: string;
  status: "active" | "used" | "expired" | "cancelled";
  pharmacyDelivery?: PharmacyDelivery;
}

export interface PrescriptionMedication {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  genericAvailable: boolean;
  estimatedPrice: number;
}

export interface PharmacyDelivery {
  pharmacyId: string;
  pharmacyName: string;
  estimatedDeliveryTime: string;
  deliveryFee: number;
  status: "pending" | "confirmed" | "preparing" | "shipped" | "delivered";
  trackingCode?: string;
}

export interface TelemedicineAvailability {
  professionalId: string;
  date: string;
  timeSlots: TimeSlot[];
  emergencyAvailable: boolean;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
  price: number;
  type: "regular" | "follow_up" | "emergency";
}

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface ExamResult {
  id: string;
  examType: string;
  result: string;
  date: string;
  attachments?: string[];
}

export interface ScheduleSlot {
  id: string;
  dayOfWeek: number; // 0-6 (domingo a sábado)
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  read: boolean;
  createdAt: string;
}

export interface Report {
  id: string;
  title: string;
  type:
    | "appointments"
    | "patients"
    | "professionals"
    | "revenue"
    | "telemedicine";
  data: Record<string, unknown>;
  generatedAt: string;
  generatedBy: string;
}
