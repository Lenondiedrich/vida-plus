import React, { useState } from 'react';
import { Settings, Bell, Shield, Palette, Monitor, Moon, Sun, Save, Globe, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';

export default function ConfiguracoesPage() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    // Notificações
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    systemUpdates: true,
    
    // Aparência
    theme: 'light', // light, dark, system
    language: 'pt-BR',
    
    // Privacidade
    profileVisibility: 'private',
    dataSharing: false,
    analyticsOptOut: false,
    
    // Sistema
    autoSave: true,
    compactMode: false,
    animationsEnabled: true,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  // Componente Switch simples
  const Switch = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );

  // Componente Separator simples
  const Separator = () => <div className="border-t border-gray-200 my-4" />;

  const handleSave = () => {
    // Aqui implementaria a lógica de salvar no backend
    console.log('Salvando configurações:', settings);
    setHasChanges(false);
    alert('Configurações salvas com sucesso!');
  };

  const resetToDefaults = () => {
    const defaultSettings = {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      appointmentReminders: true,
      systemUpdates: true,
      theme: 'light',
      language: 'pt-BR',
      profileVisibility: 'private',
      dataSharing: false,
      analyticsOptOut: false,
      autoSave: true,
      compactMode: false,
      animationsEnabled: true,
    };
    setSettings(defaultSettings);
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-muted-foreground">
            Personalize sua experiência e gerencie suas preferências
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={resetToDefaults}>
            Restaurar Padrões
          </Button>
          {hasChanges && (
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Salvar Alterações
            </Button>
          )}
        </div>
      </div>

      {/* Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificações por Email</Label>
              <p className="text-sm text-muted-foreground">
                Receba atualizações importantes por email
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificações Push</Label>
              <p className="text-sm text-muted-foreground">
                Receba notificações no navegador ou app
              </p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificações por SMS</Label>
              <p className="text-sm text-muted-foreground">
                Receba lembretes importantes por mensagem de texto
              </p>
            </div>
            <Switch
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => updateSetting('smsNotifications', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Lembretes de Consulta</Label>
              <p className="text-sm text-muted-foreground">
                Seja lembrado sobre consultas agendadas
              </p>
            </div>
            <Switch
              checked={settings.appointmentReminders}
              onCheckedChange={(checked) => updateSetting('appointmentReminders', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Atualizações do Sistema</Label>
              <p className="text-sm text-muted-foreground">
                Receba notificações sobre novos recursos e melhorias
              </p>
            </div>
            <Switch
              checked={settings.systemUpdates}
              onCheckedChange={(checked) => updateSetting('systemUpdates', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Aparência */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Aparência
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Tema</Label>
              <p className="text-sm text-muted-foreground">
                Escolha entre tema claro, escuro ou automático
              </p>
            </div>
            <Select 
              value={settings.theme} 
              onValueChange={(value) => updateSetting('theme', value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    Claro
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    Escuro
                  </div>
                </SelectItem>
                <SelectItem value="system">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    Sistema
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Idioma</Label>
              <p className="text-sm text-muted-foreground">
                Selecione o idioma da interface
              </p>
            </div>
            <Select 
              value={settings.language} 
              onValueChange={(value) => updateSetting('language', value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Português (BR)
                  </div>
                </SelectItem>
                <SelectItem value="en-US">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    English (US)
                  </div>
                </SelectItem>
                <SelectItem value="es-ES">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Español
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Modo Compacto</Label>
              <p className="text-sm text-muted-foreground">
                Interface mais densa com menos espaçamento
              </p>
            </div>
            <Switch
              checked={settings.compactMode}
              onCheckedChange={(checked) => updateSetting('compactMode', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Animações</Label>
              <p className="text-sm text-muted-foreground">
                Ativar animações e transições suaves
              </p>
            </div>
            <Switch
              checked={settings.animationsEnabled}
              onCheckedChange={(checked) => updateSetting('animationsEnabled', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacidade e Segurança */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacidade e Segurança
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Visibilidade do Perfil</Label>
              <p className="text-sm text-muted-foreground">
                Controle quem pode ver suas informações
              </p>
            </div>
            <Select 
              value={settings.profileVisibility} 
              onValueChange={(value) => updateSetting('profileVisibility', value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Público</SelectItem>
                <SelectItem value="private">Privado</SelectItem>
                <SelectItem value="contacts">Apenas Contatos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Compartilhamento de Dados</Label>
              <p className="text-sm text-muted-foreground">
                Permitir compartilhamento anônimo para melhorias
              </p>
            </div>
            <Switch
              checked={settings.dataSharing}
              onCheckedChange={(checked) => updateSetting('dataSharing', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Análise de Uso</Label>
              <p className="text-sm text-muted-foreground">
                Não participar da coleta de dados analíticos
              </p>
            </div>
            <Switch
              checked={settings.analyticsOptOut}
              onCheckedChange={(checked) => updateSetting('analyticsOptOut', checked)}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <Label>Ações de Segurança</Label>
            <div className="grid gap-4 md:grid-cols-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Alterar Senha
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Configurar 2FA
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Sessões Ativas
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Baixar Dados
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Sistema
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Salvamento Automático</Label>
              <p className="text-sm text-muted-foreground">
                Salvar automaticamente formulários e rascunhos
              </p>
            </div>
            <Switch
              checked={settings.autoSave}
              onCheckedChange={(checked) => updateSetting('autoSave', checked)}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <Label>Informações do Sistema</Label>
            <div className="grid gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Versão:</span>
                <span>Vida+ v2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Última Atualização:</span>
                <span>15 de Dezembro, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo de Conta:</span>
                <span className="capitalize">{user?.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Servidor:</span>
                <span>Brasil - São Paulo</span>
              </div>
            </div>
          </div>

          {user?.role === 'admin' && (
            <>
              <Separator />
              <div className="space-y-4">
                <Label>Configurações de Administrador</Label>
                <div className="grid gap-2">
                  <Button variant="outline" size="sm">
                    Logs do Sistema
                  </Button>
                  <Button variant="outline" size="sm">
                    Backup de Dados
                  </Button>
                  <Button variant="outline" size="sm">
                    Configurações Globais
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Ações Perigosas */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <Shield className="h-5 w-5" />
            Zona de Perigo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-red-800">Excluir Conta</Label>
            <p className="text-sm text-muted-foreground">
              Esta ação é irreversível. Todos os seus dados serão permanentemente removidos.
            </p>
            <Button variant="destructive" size="sm">
              Excluir Minha Conta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 