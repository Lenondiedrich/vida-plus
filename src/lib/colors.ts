// Paleta de cores Vida Plus
export const colors = {
  // Cores principais da paleta
  primary: '#819A91',      // Verde escuro acinzentado
  secondary: '#A7C1A8',    // Verde médio acinzentado  
  tertiary: '#D1D8BE',     // Verde claro bege
  background: '#EEEFE0',   // Bege claro

  // Variações para diferentes contextos
  success: '#A7C1A8',      // Verde médio para sucesso
  info: '#819A91',         // Verde escuro para informação
  warning: '#D1D8BE',      // Verde claro para avisos
  
  // Estados de cores
  hover: {
    primary: '#6d8378',     // Primary mais escuro
    secondary: '#92ad93',   // Secondary mais escuro
  },

  // Texto
  text: {
    primary: '#819A91',     // Texto principal
    secondary: '#6d8378',   // Texto secundário
    muted: '#a0a0a0',      // Texto esmaecido
  },

  // Bordas
  border: {
    primary: '#819A91',
    secondary: '#A7C1A8', 
    light: '#D1D8BE',
  }
};

// Função helper para aplicar estilos inline
export const getColorStyle = (color: keyof typeof colors) => ({
  color: colors[color]
});

export const getBackgroundStyle = (color: keyof typeof colors) => ({
  backgroundColor: colors[color]
});

export const getBorderStyle = (color: keyof typeof colors.border, width = '1px') => ({
  border: `${width} solid ${colors.border[color]}`
});

// Estilos para badges de status
export const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case 'scheduled':
      return { backgroundColor: colors.primary, color: 'white' };
    case 'completed':
      return { backgroundColor: colors.secondary, color: 'white' };
    case 'in-progress':
      return { backgroundColor: colors.tertiary, color: colors.primary };
    case 'cancelled':
      return { backgroundColor: '#fee2e2', color: '#dc2626' }; // Mantém vermelho para cancelado
    default:
      return { backgroundColor: '#f3f4f6', color: '#6b7280' };
  }
}; 