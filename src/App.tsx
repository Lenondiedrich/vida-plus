import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import LoginPage from "@/pages/LoginPage";
import PatientDashboard from "@/pages/patient/Dashboard";
import ProfessionalDashboard from "@/pages/professional/Dashboard";
import AdminDashboard from "@/pages/admin/Dashboard";
import AgendaPage from "@/pages/AgendaPage";
import ProntuarioPage from "@/pages/ProntuarioPage";
import PerfilPage from "@/pages/PerfilPage";
import ConfiguracoesPage from "@/pages/ConfiguracoesPage";
import TelemedicinePage from "@/pages/TelemedicinePage";
import Layout from "@/components/Layout";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function DashboardRouter() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case "patient":
      return <PatientDashboard />;
    case "professional":
      return <ProfessionalDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<DashboardRouter />} />
                      <Route path="/dashboard" element={<DashboardRouter />} />
                      <Route path="/agenda" element={<AgendaPage />} />
                      <Route
                        path="/telemedicina"
                        element={<TelemedicinePage />}
                      />
                      <Route path="/prontuario" element={<ProntuarioPage />} />
                      <Route path="/perfil" element={<PerfilPage />} />
                      <Route
                        path="/configuracoes"
                        element={<ConfiguracoesPage />}
                      />
                      <Route
                        path="*"
                        element={<Navigate to="/dashboard" replace />}
                      />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
