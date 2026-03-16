import { lazy, Suspense, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet, useLocation, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ToastProvider } from './contexts/ToastContext.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { AdminRoute } from './components/AdminRoute.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { initAnalytics } from './lib/analytics.ts';
import './index.css';

// Initialise PostHog as early as possible (no-op if VITE_POSTHOG_KEY is unset)
initAnalytics();

// Eagerly load the landing page (first paint)
import App from './App.tsx';

// Lazy load everything else — each route becomes its own chunk
const Cuestionario = lazy(() => import('./pages/Cuestionario.tsx').then(m => ({ default: m.Cuestionario })));
const Login = lazy(() => import('./pages/Login.tsx').then(m => ({ default: m.Login })));
const Registro = lazy(() => import('./pages/Registro.tsx').then(m => ({ default: m.Registro })));
const LegalLayout = lazy(() => import('./pages/LegalLayout.tsx').then(m => ({ default: m.LegalLayout })));
const Privacidad = lazy(() => import('./pages/Privacidad.tsx').then(m => ({ default: m.Privacidad })));
const AvisoLegal = lazy(() => import('./pages/AvisoLegal.tsx').then(m => ({ default: m.AvisoLegal })));
const Cookies = lazy(() => import('./pages/Cookies.tsx').then(m => ({ default: m.Cookies })));
const DashboardLayout = lazy(() => import('./pages/DashboardLayout.tsx').then(m => ({ default: m.DashboardLayout })));
const Resumen = lazy(() => import('./pages/dashboard/Resumen.tsx').then(m => ({ default: m.Resumen })));
const Mensajes = lazy(() => import('./pages/dashboard/Mensajes.tsx').then(m => ({ default: m.Mensajes })));
const Propuestas = lazy(() => import('./pages/dashboard/Propuestas.tsx').then(m => ({ default: m.Propuestas })));
const Pagos = lazy(() => import('./pages/dashboard/Pagos.tsx').then(m => ({ default: m.Pagos })));
const Ajustes = lazy(() => import('./pages/dashboard/Ajustes.tsx').then(m => ({ default: m.Ajustes })));
const Documentos = lazy(() => import('./pages/dashboard/Documentos.tsx').then(m => ({ default: m.Documentos })));
const Iteraciones = lazy(() => import('./pages/dashboard/Iteraciones.tsx').then(m => ({ default: m.Iteraciones })));
const Preview = lazy(() => import('./pages/dashboard/Preview.tsx').then(m => ({ default: m.Preview })));
const Entrega = lazy(() => import('./pages/dashboard/Entrega.tsx').then(m => ({ default: m.Entrega })));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout.tsx').then(m => ({ default: m.AdminLayout })));
const AdminHome = lazy(() => import('./pages/admin/AdminHome.tsx').then(m => ({ default: m.AdminHome })));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects.tsx').then(m => ({ default: m.AdminProjects })));
const AdminClients = lazy(() => import('./pages/admin/AdminClients.tsx').then(m => ({ default: m.AdminClients })));
const AdminPlaceholder = lazy(() => import('./pages/admin/AdminPlaceholder.tsx').then(m => ({ default: m.AdminPlaceholder })));
const AdminProjectDetail = lazy(() => import('./pages/admin/AdminProjectDetail.tsx').then(m => ({ default: m.AdminProjectDetail })));
const AdminMensajes = lazy(() => import('./pages/admin/AdminMensajes.tsx').then(m => ({ default: m.AdminMensajes })));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics.tsx').then(m => ({ default: m.AdminAnalytics })));
const AdminPagos = lazy(() => import('./pages/admin/AdminPagos.tsx').then(m => ({ default: m.AdminPagos })));
const AdminConfiguracion = lazy(() => import('./pages/admin/AdminConfiguracion.tsx').then(m => ({ default: m.AdminConfiguracion })));
const ResetPassword = lazy(() => import('./pages/ResetPassword.tsx').then(m => ({ default: m.ResetPassword })));
const NotFound = lazy(() => import('./pages/NotFound.tsx').then(m => ({ default: m.NotFound })));
const Blog = lazy(() => import('./pages/Blog.tsx').then(m => ({ default: m.Blog })));
const CuantoCuestaApp = lazy(() => import('./pages/blog/CuantoCuestaApp.tsx').then(m => ({ default: m.CuantoCuestaApp })));
const AgenciaVsFreelancer = lazy(() => import('./pages/blog/AgenciaVsFreelancer.tsx').then(m => ({ default: m.AgenciaVsFreelancer })));
const LanzarSaasBarcelona = lazy(() => import('./pages/blog/LanzarSaasBarcelona.tsx').then(m => ({ default: m.LanzarSaasBarcelona })));
const QueEsUnMvp = lazy(() => import('./pages/blog/QueEsUnMvp.tsx').then(m => ({ default: m.QueEsUnMvp })));
const AutomatizacionIaEmpresas = lazy(() => import('./pages/blog/AutomatizacionIaEmpresas.tsx').then(m => ({ default: m.AutomatizacionIaEmpresas })));
const PagosOnlineEspana = lazy(() => import('./pages/blog/PagosOnlineEspana.tsx').then(m => ({ default: m.PagosOnlineEspana })));
const SeoTecnicoSaas = lazy(() => import('./pages/blog/SeoTecnicoSaas.tsx').then(m => ({ default: m.SeoTecnicoSaas })));
const SupabaseVsFirebase = lazy(() => import('./pages/blog/SupabaseVsFirebase.tsx').then(m => ({ default: m.SupabaseVsFirebase })));

// Blog router — maps slug to the correct article component
function BlogRouter() {
  const { slug } = useParams<{ slug: string }>();
  if (slug === 'cuanto-cuesta-desarrollar-una-app-en-espana-2026') {
    return <Suspense fallback={<PageLoader />}><CuantoCuestaApp /></Suspense>;
  }
  if (slug === 'agencia-vs-freelancer-vs-nocode-2026') {
    return <Suspense fallback={<PageLoader />}><AgenciaVsFreelancer /></Suspense>;
  }
  if (slug === 'como-lanzar-saas-barcelona-30-dias') {
    return <Suspense fallback={<PageLoader />}><LanzarSaasBarcelona /></Suspense>;
  }
  if (slug === 'que-es-un-mvp-startup') {
    return <Suspense fallback={<PageLoader />}><QueEsUnMvp /></Suspense>;
  }
  if (slug === 'automatizacion-ia-empresas-espana') {
    return <Suspense fallback={<PageLoader />}><AutomatizacionIaEmpresas /></Suspense>;
  }
  if (slug === 'pagos-online-espana-stripe-paypal-redsys-2026') {
    return <Suspense fallback={<PageLoader />}><PagosOnlineEspana /></Suspense>;
  }
  if (slug === 'seo-tecnico-saas-espana-2026') {
    return <Suspense fallback={<PageLoader />}><SeoTecnicoSaas /></Suspense>;
  }
  if (slug === 'supabase-vs-firebase-startups-2026') {
    return <Suspense fallback={<PageLoader />}><SupabaseVsFirebase /></Suspense>;
  }
  return <Navigate to="/blog" replace />;
}

// Route-level page transition layout — wraps public routes with fade+slide
function TransitionLayout() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

// Route loading fallback — minimal, matches dark theme
function PageLoader() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="flex items-center gap-3 text-zinc-500">
        <div className="w-5 h-5 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin" />
        <span className="text-sm">Cargando...</span>
      </div>
    </div>
  );
}

// Avoid duplicate createRoot during Vite HMR — persist the root via import.meta.hot.data
const container = document.getElementById('root')!;
const root: ReturnType<typeof createRoot> = import.meta.hot?.data?.root ?? createRoot(container);
if (import.meta.hot) import.meta.hot.data.root = root;
root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public routes with page transitions */}
                <Route element={<TransitionLayout />}>
                  <Route path="/" element={<App />} />
                  <Route path="/cuestionario" element={<Cuestionario />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/registro" element={<Registro />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogRouter />} />
                </Route>
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
                    <AdminRoute>
                      <AdminLayout />
                    </AdminRoute>
                  }
                >
                  <Route index element={<AdminHome />} />
                  <Route path="proyectos" element={<AdminProjects />} />
                  <Route path="proyectos/:id" element={<AdminProjectDetail />} />
                  <Route path="clientes" element={<AdminClients />} />
                  <Route path="mensajes" element={<AdminMensajes />} />
                  <Route path="pagos" element={<AdminPagos />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="configuracion" element={<AdminConfiguracion />} />
                </Route>

                {/* 404 catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
