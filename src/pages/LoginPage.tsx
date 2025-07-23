import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Heart } from 'lucide-react';

export default function LoginPage() {
  const { user, login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Se já estiver logado, redireciona para o dashboard
  if (user && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError('Email ou senha incorretos');
    }
  };

  const demoUsers = [
    { email: 'maria.silva@email.com', role: 'Paciente', name: 'Maria Silva' },
    { email: 'carlos.mendes@vidaplus.com', role: 'Médico', name: 'Dr. Carlos Mendes' },
    { email: 'admin@vidaplus.com', role: 'Administrador', name: 'Sistema Admin' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ 
      background: `linear-gradient(135deg, #EEEFE0 0%, #D1D8BE 100%)` 
    }}>
      <div className="w-full max-w-md space-y-8">
        {/* Logo e Título */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Heart className="h-10 w-10 fill-current" style={{ color: '#819A91' }} />
            <h1 className="text-4xl font-bold" style={{ color: '#819A91' }}>Vida+</h1>
          </div>
          <p className="text-gray-600">Sistema de Gestão de Saúde</p>
        </div>

        {/* Formulário de Login */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Acesso ao Sistema</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Usuários de Demonstração */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Usuários de Demonstração</CardTitle>
            <CardDescription>
              Use estes usuários para testar o sistema (senha: 123456)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {demoUsers.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => setEmail(user.email)}
                >
                  <div>
                    <div className="font-medium text-sm">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                  <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                    {user.role}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Vida+ - Sistema de Gestão de Saúde
        </div>
      </div>
    </div>
  );
} 