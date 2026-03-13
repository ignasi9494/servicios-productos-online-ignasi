import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
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
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
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
          </Route>
        </Routes>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
