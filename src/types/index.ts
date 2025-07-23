export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'professional' | 'admin';
  avatar?: string;
  phone?: string;
  cpf?: string;
  crm?: string; // Para profissionais
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  allergies: string[];
  medicalHistory: MedicalRecord[];
}

export interface Professional extends User {
  role: 'professional';
  crm: string;
  specialty: string;
  schedule: ScheduleSlot[];
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  professionalId: string;
  date: string;
  type: 'consultation' | 'exam' | 'prescription';
  description: string;
  diagnosis?: string;
  prescription?: Prescription[];
  examResults?: ExamResult[];
  notes: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  professionalId: string;
  date: string;
  time: string;
  type: 'consultation' | 'exam' | 'teleconsultation';
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  description: string;
  location?: string;
  videoCallLink?: string;
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
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}

export interface Report {
  id: string;
  title: string;
  type: 'appointments' | 'patients' | 'professionals' | 'revenue';
  data: Record<string, unknown>;
  generatedAt: string;
  generatedBy: string;
} 