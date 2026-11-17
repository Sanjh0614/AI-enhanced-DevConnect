import SmoothScroll from "./components/smoothscroll";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "./lib/supabase";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/Dashboard";

interface ProtectedRouteProps {
  session: Session | null;
  loading: boolean;
  children: ReactNode;
}

function ProtectedRoute({
  session,
  loading,
  children,
}: ProtectedRouteProps) {
  if (loading) {
    return <p>Checking your session...</p>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Restore the existing session after a page refresh.
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (mounted) {
          setSession(data.session);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setSession(null);
          setLoading(false);
        }
      });

    // Listen for login, logout and session changes.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <SmoothScroll />
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute session={session} loading={loading}>
              <Dashboard userEmail={session?.user.email ?? ""} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
