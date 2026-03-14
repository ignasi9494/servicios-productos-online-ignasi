import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, LayoutDashboard, MessageSquare, FileText, CreditCard, Settings, LogOut, Loader2, FolderOpen, GitBranch, Monitor, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const sidebarLinks = [
  { label: 'Resumen', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Mensajes', href: '/dashboard/mensajes', icon: MessageSquare },
  { label: 'Propuestas', href: '/dashboard/propuestas', icon: FileText },
  { label: 'Iteraciones', href: '/dashboard/iteraciones', icon: GitBranch },
  { label: 'Documentos', href: '/dashboard/documentos', icon: FolderOpen },
  { label: 'Vista previa', href: '/dashboard/preview', icon: Monitor },
  { label: 'Entrega', href: '/dashboard/entrega', icon: Package },
  { label: 'Pagos', href: '/dashboard/pagos', icon: CreditCard },
  { label: 'Ajustes', href: '/dashboard/ajustes', icon: Settings },
];

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleSignOut() {
    setLoggingOut(true);
    await signOut();
    navigate('/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-zinc-800 bg-zinc-950">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <Terminal className="w-5 h-5 text-emerald-500" />
            Think Better
          </Link>
        </div>

        {profile && (
          <div className="px-4 py-3 border-b border-zinc-800">
            <p className="text-sm font-medium text-white truncate">{profile.full_name}</p>
            {profile.company && (
              <p className="text-xs text-zinc-500 truncate">{profile.company}</p>
            )}
          </div>
        )}

        <nav className="flex-1 py-4 px-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
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
        <div className="p-3 border-t border-zinc-800">
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

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="md:hidden h-16 flex items-center justify-between px-6 border-b border-zinc-800">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <Terminal className="w-5 h-5 text-emerald-500" />
            Think Better
          </Link>
          {profile && (
            <p className="text-xs text-zinc-400 truncate max-w-[120px]">{profile.full_name}</p>
          )}
        </header>

        {/* Mobile nav */}
        <nav className="md:hidden flex overflow-x-auto border-b border-zinc-800 px-4 gap-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-2 px-3 py-3 text-xs whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                <link.icon className="w-3.5 h-3.5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
