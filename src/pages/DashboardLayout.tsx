import { Link, Outlet, useLocation } from 'react-router-dom';
import { Terminal, LayoutDashboard, MessageSquare, FileText, CreditCard, Settings, LogOut } from 'lucide-react';

const sidebarLinks = [
  { label: 'Resumen', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Mensajes', href: '/dashboard/mensajes', icon: MessageSquare },
  { label: 'Propuestas', href: '/dashboard/propuestas', icon: FileText },
  { label: 'Pagos', href: '/dashboard/pagos', icon: CreditCard },
  { label: 'Ajustes', href: '/dashboard/ajustes', icon: Settings },
];

export function DashboardLayout() {
  const location = useLocation();

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
            disabled
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-500 w-full hover:text-zinc-300 hover:bg-zinc-900 transition-colors disabled:cursor-not-allowed"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="md:hidden h-16 flex items-center justify-between px-6 border-b border-zinc-800">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <Terminal className="w-5 h-5 text-emerald-500" />
            Think Better
          </Link>
          <p className="text-xs text-zinc-500">Dashboard</p>
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
          <Outlet />
        </main>
      </div>
    </div>
  );
}
