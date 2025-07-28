import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  LogOut,
  User,
  Calendar,
  FileText,
  Settings,
  Menu,
  X,
  Video,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationDropdown from "@/components/NotificationDropdown";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Fechar menu mobile ao mudar de rota
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  if (!user) return null;

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "professional":
        return "bg-blue-100 text-blue-800";
      case "patient":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador";
      case "professional":
        return "Profissional";
      case "patient":
        return "Paciente";
      default:
        return role;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#EEEFE0" }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold" style={{ color: "#819A91" }}>
                  Vida+
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/dashboard">
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-2 ${
                    location.pathname === "/dashboard" ||
                    location.pathname === "/"
                      ? "bg-gray-100"
                      : ""
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>

              <Link to="/agenda">
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-2 ${
                    location.pathname === "/agenda" ? "bg-gray-100" : ""
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Agenda</span>
                </Button>
              </Link>

              <Link to="/telemedicina">
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-2 ${
                    location.pathname === "/telemedicina" ? "bg-gray-100" : ""
                  }`}
                >
                  <Video className="h-4 w-4" />
                  <span>Telemedicina</span>
                </Button>
              </Link>

              <Link
                to="/telemedicina"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block"
              >
                <div
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                    location.pathname === "/telemedicina"
                      ? "bg-gray-100"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <Video className="h-4 w-4" />
                  <span>Telemedicina</span>
                </div>
              </Link>

              {(user.role === "patient" ||
                user.role === "professional" ||
                user.role === "admin") && (
                <Link to="/prontuario">
                  <Button
                    variant="ghost"
                    className={`flex items-center space-x-2 ${
                      location.pathname === "/prontuario" ? "bg-gray-100" : ""
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Prontuário</span>
                  </Button>
                </Link>
              )}

              {user.role === "professional" && (
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Pacientes</span>
                </Button>
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </div>

              {/* Notifications */}
              <NotificationDropdown />

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-3"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <Badge className={`text-xs ${getRoleColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </Badge>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <Link to="/perfil">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/configuracoes">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configurações</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-sm">
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block"
            >
              <div
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                  location.pathname === "/dashboard" ||
                  location.pathname === "/"
                    ? "bg-gray-100"
                    : "hover:bg-gray-50"
                }`}
              >
                <Settings className="h-4 w-4" />
                <span>Dashboard</span>
              </div>
            </Link>

            <Link
              to="/agenda"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block"
            >
              <div
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                  location.pathname === "/agenda"
                    ? "bg-gray-100"
                    : "hover:bg-gray-50"
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>Agenda</span>
              </div>
            </Link>

            {(user.role === "patient" ||
              user.role === "professional" ||
              user.role === "admin") && (
              <Link
                to="/prontuario"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block"
              >
                <div
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                    location.pathname === "/prontuario"
                      ? "bg-gray-100"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>Prontuário</span>
                </div>
              </Link>
            )}

            {user.role === "professional" && (
              <div className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm hover:bg-gray-50">
                <User className="h-4 w-4" />
                <span>Pacientes</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
