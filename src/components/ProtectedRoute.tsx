import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Admins who land on /dashboard (e.g. via direct URL) get redirected to /admin.
  // We only redirect once the profile is loaded so we don't flash a redirect on null.
  if (profile && profile.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
