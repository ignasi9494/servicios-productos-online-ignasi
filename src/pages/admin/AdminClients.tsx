import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Users, RefreshCw, Search, Mail, Building2, Phone,
  Calendar,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { usePageTitle } from '../../hooks/usePageTitle';

interface Client {
  id: string;
  full_name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  sector: string | null;
  created_at: string;
  project_count: number;
}

export function AdminClients() {
  usePageTitle('Clientes | Admin | Think Better');
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    setLoading(true);

    const { data: profilesData } = await supabase
      .from('profiles')
      .select('id, full_name, company, phone, sector, created_at, role')
      .eq('role', 'client')
      .order('created_at', { ascending: false });

    const { data: projectsData } = await supabase
      .from('projects')
      .select('client_id');

    // Count projects per client
    const projectCount: Record<string, number> = {};
    (projectsData ?? []).forEach((p) => {
      projectCount[p.client_id] = (projectCount[p.client_id] ?? 0) + 1;
    });

    // Get emails from auth.users — not directly available. Use profile id as identifier
    const enriched: Client[] = (profilesData ?? []).map((p) => ({
      id: p.id,
      full_name: p.full_name ?? 'Sin nombre',
      company: p.company ?? null,
      email: null, // email is in auth.users, not directly accessible without admin SDK
      phone: p.phone ?? null,
      sector: p.sector ?? null,
      created_at: p.created_at,
      project_count: projectCount[p.id] ?? 0,
    }));

    setClients(enriched);
    setLoading(false);
  }

  const filtered = clients.filter((c) =>
    !search ||
    c.full_name.toLowerCase().includes(search.toLowerCase()) ||
    c.company?.toLowerCase().includes(search.toLowerCase()) ||
    c.sector?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Clientes</h1>
          <p className="text-zinc-400 text-sm mt-0.5">{clients.length} clientes registrados</p>
        </div>
        <button
          onClick={loadClients}
          disabled={loading}
          className="p-2 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar por nombre, empresa o sector..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
        />
      </div>

      {loading ? (
        <div className="py-16 text-center">
          <RefreshCw className="w-8 h-8 text-zinc-600 animate-spin mx-auto mb-3" />
          <p className="text-zinc-500 text-sm">Cargando clientes...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center">
          <Users className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-400">
            {search ? 'No se encontraron clientes con esa búsqueda' : 'No hay clientes registrados aún'}
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((client, i) => {
            const date = new Date(client.created_at).toLocaleDateString('es-ES', {
              day: 'numeric', month: 'short', year: 'numeric',
            });
            const initials = client.full_name
              .split(' ')
              .slice(0, 2)
              .map((n) => n[0])
              .join('')
              .toUpperCase();

            return (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-emerald-400">{initials}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{client.full_name}</p>
                    {client.company && (
                      <p className="text-xs text-zinc-500 truncate">{client.company}</p>
                    )}
                  </div>
                  <div className="ml-auto shrink-0">
                    <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-400">
                      {client.project_count} proyecto{client.project_count !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {client.phone && (
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <Phone className="w-3.5 h-3.5 text-zinc-600" />
                      {client.phone}
                    </div>
                  )}
                  {client.sector && (
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <Building2 className="w-3.5 h-3.5 text-zinc-600" />
                      {client.sector}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                    Registrado el {date}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800 flex gap-2">
                  <a
                    href={`mailto:${client.email ?? ''}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    Email
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
