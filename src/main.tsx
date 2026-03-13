import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ToastProvider } from './contexts/ToastContext.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { LegalLayout } from './pages/LegalLayout.tsx';
import { Privacidad } from './pages/Privacidad.tsx';
import { AvisoLegal } from './pages/AvisoLegal.tsx';
import { Cookies } from './pages/Cookies.tsx';
import { Cuestionario } from './pages/Cuestionario.tsx';
import { Login } from './pages/Login.tsx';
import { Registro } from './pages/Registro.tsx';
import { DashboardLayout } from './pages/DashboardLayout.tsx';
import { Resumen } from './pages/dashboard/Resumen.tsx';
import { Mensajes } from './pages/dashboard/Mensajes.tsx';
import { Propuestas } from './pages/dashboard/Propuestas.tsx';
import { Pagos } from './pages/dashboard/Pagos.tsx';
import { Ajustes } from './pages/dashboard/Ajustes.tsx';
import { Documentos } from './pages/dashboard/Documentos.tsx';
import { Iteraciones } from './pages/dashboard/Iteraciones.tsx';
import { Preview } from './pages/dashboard/Preview.tsx';
import { Entrega } from './pages/dashboard/Entrega.tsx';
import { AdminLayout } from './pages/admin/AdminLayout.tsx';
import { AdminHome } from './pages/admin/AdminHome.tsx';
import { AdminProjects } from './pages/admin/AdminProjects.tsx';
import { AdminClients } from './pages/admin/AdminClients.tsx';
import { AdminPlaceholder } from './pages/admin/AdminPlaceholder.tsx';
import { AdminProjectDetail } from './pages/admin/AdminProjectDetail.tsx';
import { NotFound } from './pages/NotFound.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/cuestionario" element={<Cuestionario />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route element={<LegalLayout />}>
                <Route path="/privacidad" element={<Privacidad />} />
                <Route path="/legal" element={<AvisoLegal />} />
                <Route path="/cookies" element={<Cookies />} />
              </Route>

              {/* Client dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Resumen />} />
                <Route path="mensajes" element={<Mensajes />} />
                <Route path="propuestas" element={<Propuestas />} />
                <Route path="pagos" element={<Pagos />} />
                <Route path="ajustes" element={<Ajustes />} />
                <Route path="documentos" element={<Documentos />} />
                <Route path="iteraciones" element={<Iteraciones />} />
                <Route path="preview" element={<Preview />} />
                <Route path="entrega" element={<Entrega />} />
              </Route>

              {/* Admin panel */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminHome />} />
                <Route path="proyectos" element={<AdminProjects />} />
                <Route path="proyectos/:id" element={<AdminProjectDetail />} />
                <Route path="clientes" element={<AdminClients />} />
                <Route path="mensajes" element={<AdminPlaceholder title="Mensajes" description="Bandeja de mensajes de clientes. Próximamente." />} />
                <Route path="pagos" element={<AdminPlaceholder title="Pagos" description="Historial de pagos y facturas. Próximamente." />} />
                <Route path="analytics" element={<AdminPlaceholder title="Analytics" description="Métricas del cuestionario, conversión y rendimiento. Próximamente." />} />
                <Route path="configuracion" element={<AdminPlaceholder title="Configuración" description="Ajustes del sistema y del panel admin. Próximamente." />} />
              </Route>

              {/* 404 catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
