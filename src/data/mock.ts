import type { Patient, Professional, Admin, Appointment, MedicalRecord, Notification, Report } from '@/types';

// Usuários mockados
export const patients: Patient[] = [
  {
    id: '1',
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    role: 'patient',
    phone: '(11) 99999-1111',
    cpf: '123.456.789-01',
    dateOfBirth: '1985-03-15',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    emergencyContact: '(11) 99999-2222',
    allergies: ['Penicilina', 'Dipirona'],
    medicalHistory: []
  },
  {
    id: '2',
    name: 'João Santos',
    email: 'joao.santos@email.com',
    role: 'patient',
    phone: '(11) 99999-3333',
    cpf: '987.654.321-09',
    dateOfBirth: '1990-07-22',
    address: 'Av. Principal, 456 - São Paulo, SP',
    emergencyContact: '(11) 99999-4444',
    allergies: [],
    medicalHistory: []
  },
  {
    id: '3',
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    role: 'patient',
    phone: '(11) 99999-5555',
    cpf: '456.789.123-45',
    dateOfBirth: '1978-12-08',
    address: 'Rua Nova, 789 - São Paulo, SP',
    emergencyContact: '(11) 99999-6666',
    allergies: ['Lactose'],
    medicalHistory: []
  }
];

export const professionals: Professional[] = [
  {
    id: 'prof1',
    name: 'Dr. Carlos Mendes',
    email: 'carlos.mendes@vidaplus.com',
    role: 'professional',
    phone: '(11) 99999-7777',
    cpf: '111.222.333-44',
    crm: 'CRM-SP 123456',
    specialty: 'Cardiologia',
    schedule: [
      { id: 's1', dayOfWeek: 1, startTime: '08:00', endTime: '12:00', isAvailable: true },
      { id: 's2', dayOfWeek: 1, startTime: '14:00', endTime: '18:00', isAvailable: true },
      { id: 's3', dayOfWeek: 3, startTime: '08:00', endTime: '12:00', isAvailable: true },
      { id: 's4', dayOfWeek: 5, startTime: '14:00', endTime: '18:00', isAvailable: true }
    ]
  },
  {
    id: 'prof2',
    name: 'Dra. Fernanda Lima',
    email: 'fernanda.lima@vidaplus.com',
    role: 'professional',
    phone: '(11) 99999-8888',
    cpf: '555.666.777-88',
    crm: 'CRM-SP 789012',
    specialty: 'Pediatria',
    schedule: [
      { id: 's5', dayOfWeek: 2, startTime: '08:00', endTime: '12:00', isAvailable: true },
      { id: 's6', dayOfWeek: 2, startTime: '14:00', endTime: '18:00', isAvailable: true },
      { id: 's7', dayOfWeek: 4, startTime: '08:00', endTime: '12:00', isAvailable: true }
    ]
  },
  {
    id: 'prof3',
    name: 'Dr. Roberto Oliveira',
    email: 'roberto.oliveira@vidaplus.com',
    role: 'professional',
    phone: '(11) 99999-9999',
    cpf: '999.888.777-66',
    crm: 'CRM-SP 345678',
    specialty: 'Clínica Geral',
    schedule: [
      { id: 's8', dayOfWeek: 1, startTime: '08:00', endTime: '12:00', isAvailable: true },
      { id: 's9', dayOfWeek: 3, startTime: '14:00', endTime: '18:00', isAvailable: true },
      { id: 's10', dayOfWeek: 5, startTime: '08:00', endTime: '17:00', isAvailable: true }
    ]
  }
];

export const admins: Admin[] = [
  {
    id: 'admin1',
    name: 'Sistema Administrador',
    email: 'admin@vidaplus.com',
    role: 'admin',
    phone: '(11) 99999-0000',
    cpf: '000.000.000-00',
    permissions: ['manage_users', 'view_reports', 'manage_appointments', 'system_config']
  }
];

export const appointments: Appointment[] = [
  {
    id: 'apt1',
    patientId: '1',
    professionalId: 'prof1',
    date: '2024-12-20',
    time: '09:00',
    type: 'consultation',
    status: 'scheduled',
    description: 'Consulta de rotina - Cardiologia',
    location: 'Consultório 1A'
  },
  {
    id: 'apt2',
    patientId: '2',
    professionalId: 'prof2',
    date: '2024-12-21',
    time: '14:30',
    type: 'teleconsultation',
    status: 'scheduled',
    description: 'Teleconsulta - Pediatria',
    videoCallLink: 'https://meet.vidaplus.com/apt2'
  },
  {
    id: 'apt3',
    patientId: '3',
    professionalId: 'prof3',
    date: '2024-12-19',
    time: '10:00',
    type: 'consultation',
    status: 'completed',
    description: 'Consulta de retorno - Clínica Geral',
    location: 'Consultório 2B'
  },
  {
    id: 'apt4',
    patientId: '1',
    professionalId: 'prof1',
    date: '2024-12-22',
    time: '15:00',
    type: 'exam',
    status: 'scheduled',
    description: 'Eletrocardiograma',
    location: 'Sala de Exames 1'
  }
];

export const medicalRecords: MedicalRecord[] = [
  {
    id: 'rec1',
    patientId: '1',
    professionalId: 'prof1',
    date: '2024-12-15',
    type: 'consultation',
    description: 'Consulta de rotina',
    diagnosis: 'Hipertensão arterial leve',
    prescription: [
      {
        id: 'pres1',
        medication: 'Losartana',
        dosage: '50mg',
        frequency: '1x ao dia',
        duration: '30 dias',
        instructions: 'Tomar pela manhã, em jejum'
      }
    ],
    notes: 'Paciente apresenta pressão arterial elevada. Orientado sobre dieta e exercícios.'
  },
  {
    id: 'rec2',
    patientId: '2',
    professionalId: 'prof2',
    date: '2024-12-10',
    type: 'consultation',
    description: 'Consulta pediátrica',
    diagnosis: 'Desenvolvimento normal para a idade',
    prescription: [],
    notes: 'Criança saudável, vacinação em dia. Retorno em 6 meses.'
  }
];

export const notifications: Notification[] = [
  // Notificações para pacientes
  {
    id: 'not1',
    userId: '1',
    title: 'Consulta Agendada',
    message: 'Sua consulta com Dr. Carlos Mendes foi agendada para 20/12/2024 às 09:00',
    type: 'info',
    read: false,
    createdAt: '2024-12-18T10:00:00Z'
  },
  {
    id: 'not2',
    userId: '1',
    title: 'Lembrete de Medicação',
    message: 'Não esqueça de tomar sua medicação Losartana 50mg',
    type: 'warning',
    read: false,
    createdAt: '2024-12-18T08:00:00Z'
  },
  {
    id: 'not3',
    userId: '1',
    title: 'Exame Agendado',
    message: 'Seu eletrocardiograma foi agendado para 22/12/2024 às 15:00',
    type: 'success',
    read: true,
    createdAt: '2024-12-17T14:20:00Z'
  },
  {
    id: 'not4',
    userId: '2',
    title: 'Teleconsulta Confirmada',
    message: 'Sua teleconsulta com Dra. Fernanda Lima foi confirmada para amanhã às 14:30',
    type: 'info',
    read: false,
    createdAt: '2024-12-18T11:30:00Z'
  },
  {
    id: 'not5',
    userId: '2',
    title: 'Resultado do Exame',
    message: 'O resultado do seu exame de sangue está disponível',
    type: 'success',
    read: false,
    createdAt: '2024-12-18T09:15:00Z'
  },
  {
    id: 'not6',
    userId: '3',
    title: 'Consulta Cancelada',
    message: 'Sua consulta de hoje foi cancelada. Entre em contato para reagendar',
    type: 'error',
    read: true,
    createdAt: '2024-12-18T07:00:00Z'
  },
  
  // Notificações para profissionais
  {
    id: 'not7',
    userId: 'prof1',
    title: 'Nova Consulta Agendada',
    message: 'Nova consulta agendada com Maria Silva para 20/12/2024 às 09:00',
    type: 'info',
    read: false,
    createdAt: '2024-12-18T12:30:00Z'
  },
  {
    id: 'not8',
    userId: 'prof1',
    title: 'Consulta Cancelada',
    message: 'A consulta com João Santos foi cancelada pelo paciente',
    type: 'warning',
    read: false,
    createdAt: '2024-12-18T10:45:00Z'
  },
  {
    id: 'not9',
    userId: 'prof1',
    title: 'Lembrete de Agenda',
    message: 'Você tem 3 consultas agendadas para hoje',
    type: 'info',
    read: true,
    createdAt: '2024-12-18T08:00:00Z'
  },
  {
    id: 'not10',
    userId: 'prof2',
    title: 'Teleconsulta em Breve',
    message: 'Sua teleconsulta com João Santos começa em 15 minutos',
    type: 'warning',
    read: false,
    createdAt: '2024-12-18T14:15:00Z'
  },
  {
    id: 'not11',
    userId: 'prof2',
    title: 'Atualização do Sistema',
    message: 'O sistema será atualizado hoje às 02:00',
    type: 'info',
    read: true,
    createdAt: '2024-12-17T18:00:00Z'
  },
  
  // Notificações para admin
  {
    id: 'not12',
    userId: 'admin1',
    title: 'Relatório Mensal',
    message: 'Relatório mensal de dezembro está pronto para análise',
    type: 'success',
    read: false,
    createdAt: '2024-12-18T09:00:00Z'
  },
  {
    id: 'not13',
    userId: 'admin1',
    title: 'Novo Usuário Cadastrado',
    message: '5 novos pacientes se cadastraram hoje',
    type: 'info',
    read: false,
    createdAt: '2024-12-18T16:20:00Z'
  },
  {
    id: 'not14',
    userId: 'admin1',
    title: 'Backup Concluído',
    message: 'Backup automático do sistema foi concluído com sucesso',
    type: 'success',
    read: true,
    createdAt: '2024-12-18T03:00:00Z'
  }
];

export const reports: Report[] = [
  {
    id: 'rep1',
    title: 'Relatório de Consultas - Dezembro 2024',
    type: 'appointments',
    data: {
      totalAppointments: 156,
      completedAppointments: 142,
      cancelledAppointments: 8,
      scheduledAppointments: 6,
      teleconsultations: 45,
      mostActiveSpecialty: 'Clínica Geral'
    },
    generatedAt: '2024-12-18T09:00:00Z',
    generatedBy: 'admin1'
  },
  {
    id: 'rep2',
    title: 'Relatório de Pacientes - Dezembro 2024',
    type: 'patients',
    data: {
      totalPatients: 1250,
      newPatients: 45,
      activePatients: 890,
      averageAge: 42,
      genderDistribution: { male: 45, female: 55 }
    },
    generatedAt: '2024-12-18T09:00:00Z',
    generatedBy: 'admin1'
  }
];

// Função para simular autenticação
export const authenticateUser = (email: string, password: string) => {
  // Simulação simples - em produção seria validado no backend
  const allUsers = [...patients, ...professionals, ...admins];
  const user = allUsers.find(u => u.email === email);
  
  if (user && password === '123456') { // Senha padrão para demo
    return user;
  }
  return null;
}; 