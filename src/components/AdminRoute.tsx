import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export function AdminRoute({ children }: { children: React.ReactNode }) {
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

  if (profile && profile.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // If profile is null but user exists, we may still be loading the profile.
  // Allow through — AdminLayout will handle authorization UI as a fallback.
  return <>{children}</>;
}
