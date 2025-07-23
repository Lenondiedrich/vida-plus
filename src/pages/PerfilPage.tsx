import React, { useState } from 'react';
import { User, Edit, Save, X, Camera, Phone, Mail, MapPin, Calendar, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { patients, professionals, admins } from '@/data/mock';
import type { Patient, Professional, Admin } from '@/types';

type EditFormData = {
  name?: string;
  email?: string;
  phone?: string;
  cpf?: string;
  dateOfBirth?: string;
  address?: string;
  emergencyContact?: string;
  allergies?: string[];
  crm?: string;
  specialty?: string;
  permissions?: string[];
  [key: string]: string | string[] | undefined;
};

export default function PerfilPage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<EditFormData>({});

  if (!user) return null;

  // Buscar dados completos do usuário
  const getUserData = () => {
    switch (user.role) {
      case 'patient':
        return patients.find(p => p.id === user.id) as Patient;
      case 'professional':
        return professionals.find(p => p.id === user.id) as Professional;
      case 'admin':
        return admins.find(a => a.id === user.id) as Admin;
      default:
        return user;
    }
  };

  const userData = getUserData();

  const handleEdit = () => {
    setEditForm({ ...userData });
    setIsEditing(true);
  };

  const handleSave = () => {
    // Aqui implementaria a lógica de salvar no backend
    console.log('Salvando dados:', editForm);
    setIsEditing(false);
    // Simular sucesso
    alert('Perfil atualizado com sucesso!');
  };

  const handleCancel = () => {
    setEditForm({});
    setIsEditing(false);
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'professional':
        return 'Profissional de Saúde';
      case 'patient':
        return 'Paciente';
      default:
        return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'professional':
        return 'bg-blue-100 text-blue-800';
      case 'patient':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e dados da conta
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {!isEditing ? (
            <Button onClick={handleEdit} className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Editar Perfil
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
                <X className="h-4 w-4" />
                Cancelar
              </Button>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Salvar
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações Básicas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-6">
            {/* Avatar */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl">
                  {userData.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Camera className="h-3 w-3" />
                  Alterar Foto
                </Button>
              )}
            </div>

            {/* Dados */}
            <div className="flex-1 grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editForm.email || ''}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{userData.email}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={editForm.phone || ''}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{userData.phone || 'Não informado'}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Tipo de Conta</Label>
                <Badge className={getRoleColor(userData.role)}>
                  {getRoleLabel(userData.role)}
                </Badge>
              </div>

              {userData.cpf && (
                <div className="space-y-2">
                  <Label>CPF</Label>
                  <p className="text-sm">{userData.cpf}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações Específicas por Tipo de Usuário */}
      {userData.role === 'patient' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Informações do Paciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Data de Nascimento</Label>
                {isEditing ? (
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={editForm.dateOfBirth || ''}
                    onChange={(e) => setEditForm({ ...editForm, dateOfBirth: e.target.value })}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">
                      {new Date((userData as Patient).dateOfBirth).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Contato de Emergência</Label>
                {isEditing ? (
                  <Input
                    id="emergencyContact"
                    value={editForm.emergencyContact || ''}
                    onChange={(e) => setEditForm({ ...editForm, emergencyContact: e.target.value })}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{(userData as Patient).emergencyContact}</p>
                  </div>
                )}
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address">Endereço</Label>
                {isEditing ? (
                  <Textarea
                    id="address"
                    value={editForm.address || ''}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    className="resize-none"
                    rows={2}
                  />
                ) : (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm">{(userData as Patient).address}</p>
                  </div>
                )}
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label>Alergias</Label>
                <div className="flex flex-wrap gap-2">
                  {(userData as Patient).allergies.length > 0 ? (
                    (userData as Patient).allergies.map((allergy, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {allergy}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhuma alergia registrada</p>
                  )}
                </div>
                {isEditing && (
                  <Input
                    placeholder="Adicionar alergia..."
                    className="mt-2"
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {userData.role === 'professional' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Informações Profissionais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="crm">CRM</Label>
                {isEditing ? (
                  <Input
                    id="crm"
                    value={editForm.crm || ''}
                    onChange={(e) => setEditForm({ ...editForm, crm: e.target.value })}
                  />
                ) : (
                  <p className="text-sm font-medium">{(userData as Professional).crm}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">Especialidade</Label>
                {isEditing ? (
                  <Input
                    id="specialty"
                    value={editForm.specialty || ''}
                    onChange={(e) => setEditForm({ ...editForm, specialty: e.target.value })}
                  />
                ) : (
                  <p className="text-sm">{(userData as Professional).specialty}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {userData.role === 'admin' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Permissões de Administrador
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Permissões do Sistema</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(userData as Admin).permissions.map((permission, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Configurações de Segurança */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Segurança da Conta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Senha</h4>
                <p className="text-sm text-muted-foreground">
                  Última alteração há 30 dias
                </p>
              </div>
              <Button variant="outline" size="sm">
                Alterar Senha
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Autenticação em Dois Fatores</h4>
                <p className="text-sm text-muted-foreground">
                  Adicione uma camada extra de segurança
                </p>
              </div>
              <Button variant="outline" size="sm">
                Configurar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 