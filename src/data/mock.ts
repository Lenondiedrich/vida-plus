import type {
  Patient,
  Professional,
  Admin,
  Appointment,
  MedicalRecord,
  Notification,
  Report,
  TelemedicineSession,
  WaitingRoom,
  DigitalPrescription,
  TelemedicineAvailability,
} from "@/types";

// Usuários mockados
export const patients: Patient[] = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria.silva@email.com",
    role: "patient",
    phone: "(11) 99999-1111",
    cpf: "123.456.789-01",
    dateOfBirth: "1985-03-15",
    address: "Rua das Flores, 123 - São Paulo, SP",
    emergencyContact: "(11) 99999-2222",
    allergies: ["Penicilina", "Dipirona"],
    medicalHistory: [],
  },
  {
    id: "2",
    name: "João Santos",
    email: "joao.santos@email.com",
    role: "patient",
    phone: "(11) 99999-3333",
    cpf: "987.654.321-09",
    dateOfBirth: "1990-07-22",
    address: "Av. Principal, 456 - São Paulo, SP",
    emergencyContact: "(11) 99999-4444",
    allergies: [],
    medicalHistory: [],
  },
  {
    id: "3",
    name: "Ana Costa",
    email: "ana.costa@email.com",
    role: "patient",
    phone: "(11) 99999-5555",
    cpf: "456.789.123-45",
    dateOfBirth: "1978-12-08",
    address: "Rua Nova, 789 - São Paulo, SP",
    emergencyContact: "(11) 99999-6666",
    allergies: ["Lactose"],
    medicalHistory: [],
  },
  {
    id: "4",
    name: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    role: "patient",
    phone: "(11) 99999-7777",
    cpf: "321.654.987-12",
    dateOfBirth: "1975-05-20",
    address: "Rua Central, 321 - São Paulo, SP",
    emergencyContact: "(11) 99999-8888",
    allergies: [],
    medicalHistory: [],
  },
];

export const professionals: Professional[] = [
  {
    id: "prof1",
    name: "Dr. Carlos Mendes",
    email: "carlos.mendes@vidaplus.com",
    role: "professional",
    phone: "(11) 99999-7777",
    cpf: "111.222.333-44",
    crm: "CRM-SP 123456",
    specialty: "Cardiologia",
    telemedicineEnabled: true,
    telemedicineRating: 4.8,
    consultationPrice: 250.0,
    schedule: [
      {
        id: "s1",
        dayOfWeek: 1,
        startTime: "08:00",
        endTime: "12:00",
        isAvailable: true,
      },
      {
        id: "s2",
        dayOfWeek: 1,
        startTime: "14:00",
        endTime: "18:00",
        isAvailable: true,
      },
      {
        id: "s3",
        dayOfWeek: 3,
        startTime: "08:00",
        endTime: "12:00",
        isAvailable: true,
      },
      {
        id: "s4",
        dayOfWeek: 5,
        startTime: "14:00",
        endTime: "18:00",
        isAvailable: true,
      },
    ],
  },
  {
    id: "prof2",
    name: "Dra. Fernanda Lima",
    email: "fernanda.lima@vidaplus.com",
    role: "professional",
    phone: "(11) 99999-8888",
    cpf: "555.666.777-88",
    crm: "CRM-SP 789012",
    specialty: "Pediatria",
    telemedicineEnabled: true,
    telemedicineRating: 4.9,
    consultationPrice: 200.0,
    schedule: [
      {
        id: "s5",
        dayOfWeek: 2,
        startTime: "08:00",
        endTime: "12:00",
        isAvailable: true,
      },
      {
        id: "s6",
        dayOfWeek: 2,
        startTime: "14:00",
        endTime: "18:00",
        isAvailable: true,
      },
      {
        id: "s7",
        dayOfWeek: 4,
        startTime: "08:00",
        endTime: "12:00",
        isAvailable: true,
      },
    ],
  },
  {
    id: "prof3",
    name: "Dr. Roberto Oliveira",
    email: "roberto.oliveira@vidaplus.com",
    role: "professional",
    phone: "(11) 99999-9999",
    cpf: "999.888.777-66",
    crm: "CRM-SP 345678",
    specialty: "Clínica Geral",
    telemedicineEnabled: true,
    telemedicineRating: 4.7,
    consultationPrice: 180.0,
    schedule: [
      {
        id: "s8",
        dayOfWeek: 1,
        startTime: "08:00",
        endTime: "12:00",
        isAvailable: true,
      },
      {
        id: "s9",
        dayOfWeek: 3,
        startTime: "14:00",
        endTime: "18:00",
        isAvailable: true,
      },
      {
        id: "s10",
        dayOfWeek: 5,
        startTime: "08:00",
        endTime: "17:00",
        isAvailable: true,
      },
    ],
  },
  {
    id: "prof4",
    name: "Dra. Juliana Mendes",
    email: "juliana.mendes@vidaplus.com",
    role: "professional",
    phone: "(11) 99999-0000",
    cpf: "111.333.555-77",
    crm: "CRM-SP 456789",
    specialty: "Dermatologia",
    telemedicineEnabled: true,
    telemedicineRating: 4.6,
    consultationPrice: 220.0,
    schedule: [
      {
        id: "s11",
        dayOfWeek: 2,
        startTime: "09:00",
        endTime: "13:00",
        isAvailable: true,
      },
      {
        id: "s12",
        dayOfWeek: 4,
        startTime: "14:00",
        endTime: "18:00",
        isAvailable: true,
      },
    ],
  },
];

export const admins: Admin[] = [
  {
    id: "admin1",
    name: "Sistema Administrador",
    email: "admin@vidaplus.com",
    role: "admin",
    phone: "(11) 99999-0000",
    cpf: "000.000.000-00",
    permissions: [
      "manage_users",
      "view_reports",
      "manage_appointments",
      "system_config",
    ],
  },
];

export const appointments: Appointment[] = [
  {
    id: "apt1",
    patientId: "1",
    professionalId: "prof1",
    date: "2024-12-20",
    time: "09:00",
    type: "consultation",
    status: "scheduled",
    description: "Consulta de rotina - Cardiologia",
    location: "Consultório 1A",
    price: 250.0,
  },
  {
    id: "apt2",
    patientId: "2",
    professionalId: "prof2",
    date: "2024-12-21",
    time: "14:30",
    type: "teleconsultation",
    status: "scheduled",
    description: "Teleconsulta - Pediatria",
    videoCallLink: "https://meet.vidaplus.com/apt2",
    price: 200.0,
  },
  {
    id: "apt3",
    patientId: "3",
    professionalId: "prof3",
    date: "2024-12-19",
    time: "10:00",
    type: "consultation",
    status: "completed",
    description: "Consulta de retorno - Clínica Geral",
    location: "Consultório 2B",
    price: 180.0,
  },
  {
    id: "apt4",
    patientId: "1",
    professionalId: "prof1",
    date: "2024-12-22",
    time: "15:00",
    type: "exam",
    status: "scheduled",
    description: "Eletrocardiograma",
    location: "Sala de Exames 1",
    price: 120.0,
  },
  {
    id: "apt5",
    patientId: "4",
    professionalId: "prof4",
    date: "2024-12-23",
    time: "10:30",
    type: "teleconsultation",
    status: "scheduled",
    description: "Consulta dermatológica online",
    videoCallLink: "https://meet.vidaplus.com/apt5",
    price: 220.0,
  },
  {
    id: "apt6",
    patientId: "2",
    professionalId: "prof3",
    date: "2024-12-24",
    time: "16:00",
    type: "teleconsultation",
    status: "waiting",
    description: "Teleconsulta de urgência",
    videoCallLink: "https://meet.vidaplus.com/apt6",
    price: 180.0,
  },
  // ===== CONSULTAS MOCKADAS EM TEMPO REAL PARA DEMONSTRAÇÃO =====
  {
    id: "apt_live_demo",
    patientId: "1",
    professionalId: "prof2",
    date: new Date().toISOString().split("T")[0], // Data de hoje
    time: new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }), // Hora atual
    type: "teleconsultation",
    status: "in-progress",
    description: "DEMO: Teleconsulta em Andamento",
    videoCallLink: "https://meet.vidaplus.com/apt_live_demo",
    price: 200.0,
  },
  {
    id: "apt_waiting_demo",
    patientId: "3",
    professionalId: "prof1",
    date: new Date().toISOString().split("T")[0], // Data de hoje
    time: new Date(Date.now() + 5 * 60000).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }), // 5 min no futuro
    type: "teleconsultation",
    status: "waiting",
    description: "DEMO: Paciente na Sala de Espera",
    videoCallLink: "https://meet.vidaplus.com/apt_waiting_demo",
    price: 250.0,
  },
  {
    id: "apt_scheduled_demo",
    patientId: "4",
    professionalId: "prof3",
    date: new Date().toISOString().split("T")[0], // Data de hoje
    time: new Date(Date.now() + 30 * 60000).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }), // 30 min no futuro
    type: "teleconsultation",
    status: "scheduled",
    description: "DEMO: Próxima Teleconsulta",
    videoCallLink: "https://meet.vidaplus.com/apt_scheduled_demo",
    price: 180.0,
  },
];

// Sessões de telemedicina mockadas
export const telemedicineSessions: TelemedicineSession[] = [
  {
    id: "session1",
    appointmentId: "apt2",
    roomId: "room_apt2_12345",
    startTime: "2024-12-21T14:30:00Z",
    endTime: "2024-12-21T15:15:00Z",
    duration: 45,
    connectionQuality: "excellent",
    participants: [
      {
        userId: "2",
        role: "patient",
        joinedAt: "2024-12-21T14:30:00Z",
        connectionStatus: "connected",
        videoEnabled: true,
        audioEnabled: true,
        deviceInfo: {
          camera: true,
          microphone: true,
          browser: "Chrome",
          os: "Windows",
        },
      },
      {
        userId: "prof2",
        role: "professional",
        joinedAt: "2024-12-21T14:28:00Z",
        connectionStatus: "connected",
        videoEnabled: true,
        audioEnabled: true,
        deviceInfo: {
          camera: true,
          microphone: true,
          browser: "Firefox",
          os: "MacOS",
        },
      },
    ],
    chatMessages: [
      {
        id: "msg1",
        senderId: "prof2",
        senderName: "Dra. Fernanda Lima",
        message: "Boa tarde! Como está se sentindo hoje?",
        timestamp: "2024-12-21T14:30:30Z",
        type: "text",
      },
      {
        id: "msg2",
        senderId: "2",
        senderName: "João Santos",
        message: "Boa tarde, doutora! Estou bem, obrigado.",
        timestamp: "2024-12-21T14:31:00Z",
        type: "text",
      },
      {
        id: "msg3",
        senderId: "prof2",
        senderName: "Dra. Fernanda Lima",
        message: "Vou enviar a prescrição por aqui.",
        timestamp: "2024-12-21T15:10:00Z",
        type: "prescription",
      },
    ],
    sessionNotes:
      "Paciente apresenta melhora significativa. Orientações sobre alimentação e exercícios foram passadas.",
    prescriptionIssued: true,
    followUpRequired: false,
  },
  {
    id: "session2",
    appointmentId: "apt5",
    roomId: "room_apt5_67890",
    connectionQuality: "good",
    participants: [
      {
        userId: "4",
        role: "patient",
        connectionStatus: "connected",
        videoEnabled: true,
        audioEnabled: true,
        deviceInfo: {
          camera: true,
          microphone: true,
          browser: "Safari",
          os: "iOS",
        },
      },
      {
        userId: "prof4",
        role: "professional",
        connectionStatus: "connected",
        videoEnabled: true,
        audioEnabled: true,
        deviceInfo: {
          camera: true,
          microphone: true,
          browser: "Chrome",
          os: "Windows",
        },
      },
    ],
    chatMessages: [
      {
        id: "msg4",
        senderId: "prof4",
        senderName: "Dra. Juliana Mendes",
        message: "Olá! Vou precisar que me mostre a região afetada.",
        timestamp: "2024-12-23T10:30:00Z",
        type: "text",
      },
      {
        id: "msg5",
        senderId: "4",
        senderName: "Pedro Oliveira",
        message: "Claro, doutora. Posso mostrar pela câmera.",
        timestamp: "2024-12-23T10:31:00Z",
        type: "text",
      },
    ],
    sessionNotes: "",
    prescriptionIssued: false,
    followUpRequired: true,
  },
  // ===== SESSÕES DEMO EM TEMPO REAL =====
  {
    id: "session_live_demo",
    appointmentId: "apt_live_demo",
    roomId: "room_live_demo_12345",
    startTime: new Date(Date.now() - 10 * 60000).toISOString(), // Começou há 10 minutos
    duration: 10, // 10 minutos de duração até agora
    connectionQuality: "excellent",
    participants: [
      {
        userId: "1",
        role: "patient",
        joinedAt: new Date(Date.now() - 10 * 60000).toISOString(),
        connectionStatus: "connected",
        videoEnabled: true,
        audioEnabled: true,
        deviceInfo: {
          camera: true,
          microphone: true,
          browser: "Chrome",
          os: "Windows",
        },
      },
      {
        userId: "prof2",
        role: "professional",
        joinedAt: new Date(Date.now() - 8 * 60000).toISOString(),
        connectionStatus: "connected",
        videoEnabled: true,
        audioEnabled: true,
        deviceInfo: {
          camera: true,
          microphone: true,
          browser: "Firefox",
          os: "MacOS",
        },
      },
    ],
    chatMessages: [
      {
        id: "demo_msg1",
        senderId: "prof2",
        senderName: "Dra. Fernanda Lima",
        message: "Boa tarde Maria! Como você está se sentindo hoje?",
        timestamp: new Date(Date.now() - 9 * 60000).toISOString(),
        type: "text",
      },
      {
        id: "demo_msg2",
        senderId: "1",
        senderName: "Maria Silva",
        message: "Boa tarde, doutora! Estou me sentindo melhor, obrigada.",
        timestamp: new Date(Date.now() - 8 * 60000).toISOString(),
        type: "text",
      },
      {
        id: "demo_msg3",
        senderId: "prof2",
        senderName: "Dra. Fernanda Lima",
        message:
          "Que bom! Vamos verificar como está sua pressão. Você tem o aparelho aí?",
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
        type: "text",
      },
      {
        id: "demo_msg4",
        senderId: "1",
        senderName: "Maria Silva",
        message: "Sim, acabei de medir. Está 120/80.",
        timestamp: new Date(Date.now() - 3 * 60000).toISOString(),
        type: "text",
      },
      {
        id: "demo_msg5",
        senderId: "prof2",
        senderName: "Dra. Fernanda Lima",
        message: "Excelente! Vou prescrever a continuação do tratamento.",
        timestamp: new Date(Date.now() - 1 * 60000).toISOString(),
        type: "prescription",
      },
    ],
    sessionNotes:
      "Paciente respondendo bem ao tratamento. Pressão arterial controlada.",
    prescriptionIssued: true,
    followUpRequired: true,
  },
];

// Salas de espera virtuais
export const waitingRooms: WaitingRoom[] = [
  {
    id: "waiting1",
    appointmentId: "apt6",
    patientId: "2",
    joinedAt: "2024-12-24T15:45:00Z",
    estimatedWaitTime: 15,
    status: "waiting",
    professionalNotified: true,
  },
  // ===== SALA DE ESPERA DEMO =====
  {
    id: "waiting_demo",
    appointmentId: "apt_waiting_demo",
    patientId: "3",
    joinedAt: new Date(Date.now() - 2 * 60000).toISOString(), // Entrou há 2 minutos
    estimatedWaitTime: 3, // 3 minutos de espera
    status: "waiting",
    professionalNotified: true,
  },
];

// Prescrições digitais
export const digitalPrescriptions: DigitalPrescription[] = [
  {
    id: "prescription1",
    sessionId: "session1",
    patientId: "2",
    professionalId: "prof2",
    medications: [
      {
        id: "med1",
        medication: "Paracetamol 500mg",
        dosage: "500mg",
        frequency: "8/8 horas",
        duration: "5 dias",
        instructions: "Tomar com água, preferencialmente após as refeições",
        genericAvailable: true,
        estimatedPrice: 12.5,
      },
      {
        id: "med2",
        medication: "Vitamina D3 2000UI",
        dosage: "2000UI",
        frequency: "1 vez ao dia",
        duration: "30 dias",
        instructions: "Tomar pela manhã",
        genericAvailable: false,
        estimatedPrice: 35.0,
      },
    ],
    createdAt: "2024-12-21T15:10:00Z",
    validUntil: "2025-01-21T15:10:00Z",
    digitalSignature: "DR_FERNANDA_LIMA_CRM789012_20241221151000",
    status: "active",
    pharmacyDelivery: {
      pharmacyId: "pharmacy1",
      pharmacyName: "Farmácia Vida+",
      estimatedDeliveryTime: "2024-12-22T18:00:00Z",
      deliveryFee: 8.5,
      status: "confirmed",
      trackingCode: "VP123456789",
    },
  },
];

// Disponibilidade para telemedicina
export const telemedicineAvailability: TelemedicineAvailability[] = [
  {
    professionalId: "prof1",
    date: "2024-12-25",
    timeSlots: [
      {
        id: "slot1",
        startTime: "09:00",
        endTime: "09:30",
        available: true,
        price: 250.0,
        type: "regular",
      },
      {
        id: "slot2",
        startTime: "10:00",
        endTime: "10:30",
        available: true,
        price: 250.0,
        type: "regular",
      },
      {
        id: "slot3",
        startTime: "14:00",
        endTime: "14:30",
        available: false,
        price: 250.0,
        type: "regular",
      },
    ],
    emergencyAvailable: true,
  },
  {
    professionalId: "prof2",
    date: "2024-12-25",
    timeSlots: [
      {
        id: "slot4",
        startTime: "08:30",
        endTime: "09:00",
        available: true,
        price: 200.0,
        type: "follow_up",
      },
      {
        id: "slot5",
        startTime: "16:00",
        endTime: "16:30",
        available: true,
        price: 200.0,
        type: "regular",
      },
    ],
    emergencyAvailable: false,
  },
];

export const medicalRecords: MedicalRecord[] = [
  {
    id: "rec1",
    patientId: "1",
    professionalId: "prof1",
    date: "2024-12-15",
    type: "consultation",
    description: "Consulta de rotina",
    diagnosis: "Hipertensão arterial leve",
    prescription: [
      {
        id: "pres1",
        medication: "Losartana",
        dosage: "50mg",
        frequency: "1x ao dia",
        duration: "30 dias",
        instructions: "Tomar pela manhã, em jejum",
      },
    ],
    notes:
      "Paciente apresenta pressão arterial elevada. Orientado sobre dieta e exercícios.",
  },
  {
    id: "rec2",
    patientId: "2",
    professionalId: "prof2",
    date: "2024-12-21",
    type: "teleconsultation",
    description: "Teleconsulta pediátrica",
    diagnosis: "Desenvolvimento normal para a idade",
    prescription: [
      {
        id: "pres2",
        medication: "Paracetamol",
        dosage: "500mg",
        frequency: "8/8 horas se necessário",
        duration: "5 dias",
        instructions: "Apenas em caso de febre",
      },
    ],
    notes: "Criança saudável, vacinação em dia. Retorno em 6 meses.",
    telemedicineSession: telemedicineSessions[0],
  },
];

export const notifications: Notification[] = [
  // Notificações para pacientes
  {
    id: "not1",
    userId: "1",
    title: "Consulta Agendada",
    message:
      "Sua consulta com Dr. Carlos Mendes foi agendada para 20/12/2024 às 09:00",
    type: "info",
    read: false,
    createdAt: "2024-12-18T10:00:00Z",
  },
  {
    id: "not2",
    userId: "1",
    title: "Lembrete de Medicação",
    message: "Não esqueça de tomar sua medicação Losartana 50mg",
    type: "warning",
    read: false,
    createdAt: "2024-12-18T08:00:00Z",
  },
  {
    id: "not3",
    userId: "1",
    title: "Exame Agendado",
    message: "Seu eletrocardiograma foi agendado para 22/12/2024 às 15:00",
    type: "success",
    read: true,
    createdAt: "2024-12-17T14:20:00Z",
  },
  {
    id: "not4",
    userId: "2",
    title: "Teleconsulta Confirmada",
    message:
      "Sua teleconsulta com Dra. Fernanda Lima foi confirmada para amanhã às 14:30",
    type: "info",
    read: false,
    createdAt: "2024-12-18T11:30:00Z",
  },
  {
    id: "not5",
    userId: "2",
    title: "Receita Digital Disponível",
    message:
      "Sua receita digital está disponível. Clique para acessar e escolher farmácia para entrega.",
    type: "success",
    read: false,
    createdAt: "2024-12-21T15:15:00Z",
  },
  {
    id: "not6",
    userId: "3",
    title: "Consulta Cancelada",
    message:
      "Sua consulta de hoje foi cancelada. Entre em contato para reagendar",
    type: "error",
    read: true,
    createdAt: "2024-12-18T07:00:00Z",
  },
  {
    id: "not7",
    userId: "4",
    title: "Teleconsulta em 30 minutos",
    message:
      "Sua teleconsulta com Dra. Juliana Mendes começa em 30 minutos. Prepare-se!",
    type: "warning",
    read: false,
    createdAt: "2024-12-23T10:00:00Z",
  },

  // Notificações para profissionais
  {
    id: "not8",
    userId: "prof1",
    title: "Nova Consulta Agendada",
    message: "Nova consulta agendada com Maria Silva para 20/12/2024 às 09:00",
    type: "info",
    read: false,
    createdAt: "2024-12-18T12:30:00Z",
  },
  {
    id: "not9",
    userId: "prof2",
    title: "Teleconsulta Finalizada",
    message:
      "Teleconsulta com João Santos foi finalizada com sucesso. Receita enviada.",
    type: "success",
    read: false,
    createdAt: "2024-12-21T15:15:00Z",
  },
  {
    id: "not10",
    userId: "prof2",
    title: "Paciente na Sala de Espera",
    message: "João Santos está aguardando na sala de espera virtual",
    type: "warning",
    read: false,
    createdAt: "2024-12-24T15:45:00Z",
  },
  {
    id: "not11",
    userId: "prof4",
    title: "Teleconsulta em Breve",
    message: "Sua teleconsulta com Pedro Oliveira começa em 15 minutos",
    type: "warning",
    read: false,
    createdAt: "2024-12-23T10:15:00Z",
  },

  // Notificações para admin
  {
    id: "not12",
    userId: "admin1",
    title: "Relatório de Telemedicina",
    message:
      "Relatório mensal de telemedicina gerado. 87% de satisfação dos pacientes.",
    type: "success",
    read: false,
    createdAt: "2024-12-18T09:00:00Z",
  },
  {
    id: "not13",
    userId: "admin1",
    title: "Aumento no Uso de Telemedicina",
    message: "Crescimento de 35% no uso de teleconsultas neste mês",
    type: "info",
    read: false,
    createdAt: "2024-12-18T16:20:00Z",
  },
];

export const reports: Report[] = [
  {
    id: "rep1",
    title: "Relatório de Consultas - Dezembro 2024",
    type: "appointments",
    data: {
      totalAppointments: 156,
      completedAppointments: 142,
      cancelledAppointments: 8,
      scheduledAppointments: 6,
      teleconsultations: 45,
      mostActiveSpecialty: "Clínica Geral",
    },
    generatedAt: "2024-12-18T09:00:00Z",
    generatedBy: "admin1",
  },
  {
    id: "rep2",
    title: "Relatório de Pacientes - Dezembro 2024",
    type: "patients",
    data: {
      totalPatients: 1250,
      newPatients: 45,
      activePatients: 890,
      averageAge: 42,
      genderDistribution: { male: 45, female: 55 },
    },
    generatedAt: "2024-12-18T09:00:00Z",
    generatedBy: "admin1",
  },
  {
    id: "rep3",
    title: "Relatório de Telemedicina - Dezembro 2024",
    type: "telemedicine",
    data: {
      totalSessions: 67,
      completedSessions: 58,
      averageSessionDuration: 38, // minutos
      averageRating: 4.7,
      topSpecialties: ["Clínica Geral", "Pediatria", "Cardiologia"],
      technicalIssues: 3,
      prescriptionsIssued: 42,
      followUpRate: 15, // porcentagem
      connectionQuality: {
        excellent: 45,
        good: 18,
        fair: 3,
        poor: 1,
      },
      deviceUsage: {
        mobile: 40,
        desktop: 60,
      },
      revenueGenerated: 12650.0,
    },
    generatedAt: "2024-12-18T09:00:00Z",
    generatedBy: "admin1",
  },
];

// Função para simular autenticação
export const authenticateUser = (email: string, password: string) => {
  // Simulação simples - em produção seria validado no backend
  const allUsers = [...patients, ...professionals, ...admins];
  const user = allUsers.find((u) => u.email === email);

  if (user && password === "123456") {
    // Senha padrão para demo
    return user;
  }
  return null;
};
