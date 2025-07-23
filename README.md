# Vida+ - Sistema de Gestão de Saúde

Um sistema completo de gestão de saúde desenvolvido com React, TypeScript, Tailwind CSS e shadcn/ui, oferecendo funcionalidades para pacientes, profissionais de saúde e administradores.

## 🏥 Funcionalidades

### Para Pacientes
- **Dashboard Personalizado**: Visão geral das consultas, histórico médico e prescrições
- **Agendamento de Consultas**: Sistema para agendar consultas e exames
- **Teleconsultas**: Interface de video-chamada simulada para consultas remotas
- **Histórico Médico**: Acesso completo ao prontuário e registros médicos
- **Prescrições Digitais**: Visualização de medicamentos prescritos
- **Notificações**: Lembretes de consultas e medicamentos

### Para Profissionais de Saúde
- **Agenda Médica**: Gestão completa da agenda diária e futura
- **Prontuários Eletrônicos**: Criação e atualização de registros médicos
- **Receitas Digitais**: Emissão de prescrições eletrônicas
- **Gestão de Pacientes**: Lista e acompanhamento de pacientes
- **Teleconsultas**: Atendimento remoto via video-chamada

### Para Administradores
- **Dashboard Administrativo**: Visão geral do sistema com estatísticas
- **Gestão de Usuários**: Cadastro e gerenciamento de pacientes e profissionais
- **Relatórios**: Geração de relatórios de consultas, pacientes e atividades
- **Controle de Consultas**: Monitoramento de todas as consultas do sistema

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca para criação de interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework de CSS utilitário
- **shadcn/ui** - Componentes de interface modernos
- **React Router DOM** - Roteamento de páginas
- **Lucide React** - Ícones SVG
- **Vite** - Build tool e servidor de desenvolvimento

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd vida-plus
```

2. **Instale as dependências**
```bash
npm install
```

3. **Instale os componentes do shadcn/ui**
```bash
npx shadcn@latest add button card input label select table badge avatar dropdown-menu dialog alert tabs form
```

4. **Execute o projeto**
```bash
npm run dev
```

5. **Acesse a aplicação**
Abra [http://localhost:5173](http://localhost:5173) no seu navegador

## 👥 Usuários de Demonstração

### Paciente
- **Email**: maria.silva@email.com
- **Senha**: 123456
- **Nome**: Maria Silva

### Profissional de Saúde
- **Email**: carlos.mendes@vidaplus.com
- **Senha**: 123456
- **Nome**: Dr. Carlos Mendes
- **Especialidade**: Cardiologia

### Administrador
- **Email**: admin@vidaplus.com
- **Senha**: 123456
- **Nome**: Sistema Administrador

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes do shadcn/ui
│   ├── Layout.tsx      # Layout principal
│   └── TelemedicineModal.tsx # Modal de teleconsulta
├── contexts/           # Contextos React
│   └── AuthContext.tsx # Contexto de autenticação
├── data/              # Dados mockados
│   └── mock.ts        # Dados de demonstração
├── hooks/             # Hooks customizados
│   └── useAuth.ts     # Hook de autenticação
├── lib/               # Utilitários
│   └── utils.ts       # Funções auxiliares
├── pages/             # Páginas da aplicação
│   ├── admin/         # Páginas do administrador
│   ├── patient/       # Páginas do paciente
│   ├── professional/  # Páginas do profissional
│   └── LoginPage.tsx  # Página de login
├── types/             # Definições de tipos TypeScript
│   └── index.ts       # Tipos da aplicação
└── App.tsx            # Componente principal
```

## 🎨 Design System

O projeto utiliza um design system consistente baseado em uma paleta natural e acolhedora:

### Paleta de Cores Principal
- **#819A91** - Verde escuro acinzentado (cor primária)
- **#A7C1A8** - Verde médio acinzentado (cor secundária)  
- **#D1D8BE** - Verde claro bege (elementos suaves)
- **#EEEFE0** - Bege claro (background principal)

### Aplicação das Cores
- **Elementos principais**: #819A91 para botões, ícones e texto de destaque
- **Elementos secundários**: #A7C1A8 para hover states e accents
- **Backgrounds suaves**: #D1D8BE para cards e elementos muted
- **Background geral**: #EEEFE0 para criar uma atmosfera calma e acolhedora

### Outros Elementos
- **Tipografia**: Sistema de fontes do Tailwind CSS
- **Espaçamento**: Grid system responsivo
- **Componentes**: shadcn/ui para consistência visual
- **Bordas coloridas**: Cards com bordas laterais coloridas para categorização visual

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Layout adaptado para telas médias
- **Mobile**: Interface otimizada para dispositivos móveis

## ♿ Acessibilidade

O sistema implementa padrões de acessibilidade:
- **Navegação por teclado**: Todos os elementos são acessíveis via teclado
- **Contraste**: Cores com contraste adequado (WCAG AA)
- **Semântica**: HTML semântico e landmarks apropriados
- **Screen readers**: Compatibilidade com leitores de tela

## 🔐 Autenticação

Sistema de autenticação simulado com três tipos de usuário:
- Pacientes: Acesso às próprias informações e agendamentos
- Profissionais: Gestão de consultas e prontuários
- Administradores: Controle total do sistema

## 💾 Dados Mockados

A aplicação utiliza dados mockados que incluem:
- 3 pacientes de exemplo
- 3 profissionais de saúde
- 1 administrador
- Consultas e exames agendados
- Histórico médico e prescrições
- Relatórios administrativos

## 🎯 Funcionalidades Especiais

### Teleconsultas
- Interface de video-chamada simulada
- Chat em tempo real
- Controles de áudio e vídeo
- Timer de duração da consulta

### Sistema de Notificações
- Alertas de consultas próximas
- Lembretes de medicamentos
- Notificações do sistema

### Relatórios Administrativos
- Estatísticas de consultas
- Dados de pacientes e profissionais
- Gráficos e métricas do sistema

## 🚀 Build para Produção

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta `dist/`.

## 📄 Licença

Este projeto é um protótipo educacional desenvolvido para demonstração de conceitos de desenvolvimento frontend.

## 🤝 Contribuição

Este é um projeto de demonstração. Para sugestões e melhorias, abra uma issue ou pull request.

---

**Vida+** - Cuidando da saúde com tecnologia 💙
