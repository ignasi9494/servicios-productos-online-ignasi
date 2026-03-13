import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Terminal, LayoutDashboard, Users, FileText, MessageSquare,
  CreditCard, BarChart2, Settings, LogOut, Loader2, Shield,
  ChevronLeft, Menu, X,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const sidebarLinks = [
  { label: 'Vista general', href: '/admin', icon: LayoutDashboard },
  { label: 'Proyectos', href: '/admin/proyectos', icon: FileText },
  { label: 'Clientes', href: '/admin/clientes', icon: Users },
  { label: 'Chat', href: '/admin/mensajes', icon: MessageSquare },
  { label: 'Pagos', href: '/admin/pagos', icon: CreditCard },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
  { label: 'Configuración', href: '/admin/configuracion', icon: Settings },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleSignOut() {
    setLoggingOut(true);
    await signOut();
    navigate('/login', { replace: true });
  }

  // Admin-only guard (double check in addition to route guard)
  if (profile && profile.role !== 'admin') {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-center px-4">
        <div>
          <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Acceso restringido</h1>
          <p className="text-zinc-400 text-sm mb-6">Esta área es solo para administradores de Think Better.</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Ir a mi panel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30 flex">
      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40 flex flex-col w-64 border-r border-zinc-800 bg-zinc-950
          transform transition-transform duration-200
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="h-16 flex items-center px-5 border-b border-zinc-800 gap-3">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg flex-1">
            <Terminal className="w-5 h-5 text-emerald-500" />
            Think Better
          </Link>
          <button
            className="md:hidden text-zinc-500 hover:text-zinc-300"
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin badge */}
        <div className="px-4 py-3 border-b border-zinc-800 flex items-center gap-2">
          <Shield className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Panel Admin</p>
            {profile && (
              <p className="text-xs text-zinc-500 truncate">{profile.full_name}</p>
            )}
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.href ||
              (link.href !== '/admin' && location.pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 font-medium'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-zinc-800 space-y-1">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-500 w-full hover:text-zinc-300 hover:bg-zinc-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Panel de cliente
          </Link>
          <button
            onClick={handleSignOut}
            disabled={loggingOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-500 w-full hover:text-zinc-300 hover:bg-zinc-900 transition-colors disabled:cursor-not-allowed"
          >
            {loggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Mobile header */}
        <header className="md:hidden h-16 flex items-center justify-between px-5 border-b border-zinc-800 sticky top-0 bg-zinc-950 z-20">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-white">Panel Admin</span>
          </div>
          <div className="w-9" />
        </header>

        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
